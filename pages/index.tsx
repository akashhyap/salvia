import Head from 'next/head';
import { useMutation } from "@apollo/client";

import Layout from "../components/Layout";
import { client } from '../lib/apolloClient';
import Image from "next/image";
import Link from "next/link";
import Products from '../components/products';
import { GET_SITE_LOGO, PRODUCT_QUERY, GET_OPTIONS, LOG_OUT, GET_HOME_PAGE } from '../lib/graphql';
import { useEffect } from 'react';

import { GET_USER } from '../hooks/useAuth';

type Product = {
  id: string;
  slug: string;
  name: string;
  type: string;
  databaseId: number;
  shortDescription: string;
  image: {
    id: string;
    sourceUrl: string;
    altText: string;
  };
  onSale: boolean;
  stockStatus: string;
  price: string;
  regularPrice: string;
  salePrice: string;
};

type HomeProps = {
  products: {
    edges: {
      node: Product;
    }[];
  };
  siteLogo: string;
  topInformationBar?: string;
  heroGallery?: { sourceUrl: string }[];
  image?: {
    id: string;
    altText: string;
    sourceUrl: string;
  };
};
export default function Home({ products, siteLogo, topInformationBar, heroGallery }: HomeProps) {
  console.log("heroGallery", heroGallery);
  const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [
      { query: GET_USER }
    ],
    awaitRefetchQueries: true,
  });
  const loggedOut = Boolean(data?.logout?.status);

  useEffect(() => {
    const logOutAndResetStore = async () => {
      try {
        await logOut();
        await client.resetStore();
      } catch (error) {
        console.error("Error logging out and resetting store:", error);
      }
    };

    logOutAndResetStore();
  }, [logOut]);

  return (
    <Layout siteLogo={siteLogo} topInformationBar={topInformationBar}>
      <header className="relative overflow-hidden">
        {/* Hero section */}
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Salvia Extract™: Selling Quality Salvia divinorum since 2004
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                SalviaExtract strives to always offer accurate and objective information about Salvia divinorum, Kratom, CBD, and other EthnoBotanical products.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="relative h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <Image
                            src={heroGallery?.[0]?.sourceUrl ?? ""}
                            alt="Image product"
                            layout="fill"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg relative">
                          <Image
                            src={heroGallery?.[1]?.sourceUrl ?? ""}
                            alt="Image product"
                            layout="fill"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg relative">
                          <Image
                            src={heroGallery?.[2]?.sourceUrl ?? ""}
                            alt="Image product"
                            layout="fill"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg relative">
                          <Image
                            src={heroGallery?.[3]?.sourceUrl ?? ""}
                            alt="Image product"
                            layout="fill"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg relative">
                          <Image
                            src={heroGallery?.[4]?.sourceUrl ?? ""}
                            alt="Image product"
                            layout="fill"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg relative">
                          <Image
                            src={heroGallery?.[5]?.sourceUrl ?? ""}
                            alt="Image product"
                            layout="fill"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg relative">
                          <Image
                            src={heroGallery?.[6]?.sourceUrl ?? ""}
                            alt="Image product"
                            layout="fill"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-rose-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 mr-4"
                >
                  What is Salvia?
                </a>
                <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                 How to use Salvia?
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-6xl mx-auto'>
        <Products products={products} />
      </div>

    </Layout>
  )
}


export async function getStaticProps() {
  // Execute both queries concurrently using Promise.all
  const [productsResponse, siteLogoResponse, topInformationBarResponse, heroResponse] = await Promise.all([
    client.query({ query: PRODUCT_QUERY }),
    client.query({ query: GET_SITE_LOGO }),
    client.query({ query: GET_OPTIONS }),
    client.query({ query: GET_HOME_PAGE }),
  ]);

  const products = { edges: productsResponse?.data?.products?.edges || [] };
  const siteLogo = siteLogoResponse?.data?.getHeader?.siteLogoUrl;
  const topInformationBar = topInformationBarResponse?.data?.options?.topInformationBar?.informationBar;
  const heroGallery = heroResponse?.data?.page?.heroGallery?.heroGallery || [];

  return {
    props: {
      products,
      siteLogo,
      topInformationBar,
      heroGallery
    },
    revalidate: 1,
  };
}
