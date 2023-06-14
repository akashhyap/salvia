import Image from 'next/image';

import { gql, useQuery } from "@apollo/client";
import atob from "atob";

import AuthContent from "../components/AuthContent";
import { useEffect, useState } from "react";
import { client } from "../lib/apolloClient";
import { GET_CUSTOMER_ORDERS } from '../lib/graphql';

import {
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import Link from 'next/link';
interface Params {
  uri: string;
  databaseId: string;
}
interface PageProps {
  siteLogo: string;
  topInformationBar?: string
}


export default function MembersContent() {
  const [customerId, setCustomerId] = useState<any | null>(null);
  const decodeCustomerId = (encodedCustomerId: string | null) => {
    if (!encodedCustomerId) {
      return null;
    }
    try {
      const decodedCustomerId = atob(encodedCustomerId);
      return parseInt(decodedCustomerId.replace("customer:", ""), 10);
    } catch (error) {
      console.error("Failed to decode customerId:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchCustomerData = async () => {
      const { data } = await client.query({ query: GET_CUSTOMER_ORDERS });
      console.log("data", data);
      const decodedCustomerId = decodeCustomerId(data?.customer?.id);
      // Set the decoded customerId to the state
      setCustomerId(decodedCustomerId);
    };
    fetchCustomerData();
  }, []);
  // const customerId = 15;
  const { loading, error, data } = useQuery(GET_CUSTOMER_ORDERS, {
    variables: { customerId },
    skip: !customerId,
  });

  // console.log("customerId", customerId);


  return (
    <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-12 lg:px-0'>
      <AuthContent>
        <h1 className="text-3xl mb-10">Welcome back {data?.customer.firstName.toUpperCase()}!</h1>
        {(data?.customer.orders.nodes.length > 0) ? data?.customer.orders.nodes.map((order: any) => {
          // console.log("order", order);
          // Filtering unique prducts
          const uniqueProducts = order.lineItems.nodes.reduce((acc: any, item: any) => {
            let idToCheck = item?.product?.node?.id;
            let variation;
            // Check if the product is a VariableProduct and it has variations
            if (item.product?.node?.__typename === 'VariableProduct' && item.product?.node?.variations?.nodes.length > 0) {
              // Find the variation associated with this line item
              // @ts-ignore
              variation = item.product?.node?.variations?.nodes.find(variant => variant.databaseId === item.variation?.node?.databaseId);
              // console.log("variation", variation);
              if (variation) {
                idToCheck = variation.databaseId;
                // Log the variation attributes

              }
            }

            const existingProductIndex = acc.findIndex((product: any) => product?.node?.id === idToCheck);

            if (existingProductIndex !== -1) {
              acc[existingProductIndex].quantity += 1;
            } else {
              acc.push({ ...item, quantity: 1, variation });
            }

            return acc;
          }, []);

          return (
            <div key={order.id} className="mb-6 p-6 border rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>

              {/* @ts-ignore */}
              {uniqueProducts.map((item: any, index) => {
                
                let attributeLabel = "";
                if (item.variation && item.variation.attributes && item.variation.attributes.nodes.length > 0) {
                  attributeLabel = item.variation.attributes.nodes[0].label;
                }
                let variationName = item.variation ? item.variation.name : "";
                let variationValue = variationName.split(" - ")[1] || "";
                // Extract the featured image URL
                let featuredImageUrl = item.product?.node?.featuredImage?.node?.sourceUrl;

                return (
                  <div key={`${item.variation ? item.variation.databaseId : item.product?.node?.databaseId}-${index}`} className="flex flex-row justify-between border-b border-gray-200 py-5" data-item={item.variation ? item.variation.databaseId : item.product?.node?.databaseId}>
                    <div className="w-1/2 flex items-center">
                      {/* Display the featured image if it exists */}
                      <figure className='relative bg-blue-300 p-1 flex items-center justify-center rounded-md h-[60px] w-[60px]'>
                        {featuredImageUrl &&

                          <Image
                            src={featuredImageUrl}
                            alt={item.product?.node.name}
                            width={60}
                            height={60}
                            className='cursor-pointer'
                          />

                        }

                      </figure>
                      <div className='pl-3'>
                        <p className="font-semibold text-md pb-2">{item.product?.node?.name}</p>
                        {attributeLabel ? (<p className="text-gray-500">{attributeLabel}: {variationValue} | Quantity: {item.quantity}</p>) : (
                          <p className="text-gray-500">Quantity: {item.quantity}</p>
                        )}
                      </div>
                    </div>

                    <div className="w-1/4 text-right">
                      <p className="font-semibold">{item.variation ? item.variation.price : item.product?.node?.price}</p>
                      <p>
                        <Link href={`products/${item.product?.node?.slug}`} passHref legacyBehavior>
                          <span className='text-xs cursor-pointer bg-blue-300 p-1 px-2 rounded-md'>View Product</span>
                        </Link>
                      </p>
                      {/* <p className="font-semibold">${item.quantity * (item.variation ? parseFloat(item.variation.price.replace("$", "")) : parseFloat(item.product.node.price.replace("$", "")))}</p> */}
                    </div>
                  </div>
                )
              })}
              <div className='flex'>
                <div className="w-1/2 flex items-center">
                  <p className="text-lg font-bold">Status: <span className='text-sm text-green-600 font-semibold'>{order.status}</span></p>
                </div>
                <div className="w-1/2 text-right">
                  <p className="text-lg font-bold my-4">Total: {order.total}</p>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Billing Address</h2>
                <p className="font-semibold">{order.billing.firstName} {order.billing.lastName}</p>
                <p>{order.billing.address1}</p>
                <p>{order.billing.address2}</p>
              </div>
            </div>
          );

        }) : (
          <div className="mt-5 text-center bg-slate-100 p-5 rounded-r-md">
            <h2 className="text-3xl mb-4">No orders found.</h2>
            <Link href="/">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">Continue Shopping</a>
            </Link>
          </div>
        )}
      </AuthContent>
    </div>
  );
}

export async function getStaticProps({ params }: { params: Params }) {
  const storyblokApi = getStoryblokApi();
  // @ts-ignore
  let { data: config } = await storyblokApi.get("cdn/stories/config");
  return {
    props: {
      config: config ? config.story : false,
    },
    revalidate: 60,
  };
}
