import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import DOMPurify from "isomorphic-dompurify";
import {
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import { client } from "../../lib/apolloClient";
import Layout from "../../components/Layout";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useCart } from "../../components/cart/CartContext";
import Image from "next/image";
import { GET_SINGLE_PRODUCT } from '../../lib/graphql';

import QuantitySelector from "../../components/QuantitySelector";
import { sanitize } from "../../lib/sanitize";

import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Head from "next/head";

import Seo from "../../components/Seo";

import { ProductJsonLd } from 'next-seo';
import ProductFullDescription from "../../components/ProductFullDescription";

interface ProductPath {
  slug: string;
}
interface Params {
  slug: string;
}
export interface Product {
  databaseId: any;
  slug: any;
  name: string;
  regularPrice: string;
  stockStatus: string;
  shortDescription: string;
  description: string;
  __typename: string;
  image?: {
    id: string;
    uri: string;
    title: string;
    srcSet: string;
    sourceUrl: string;
  };
  variations?: {
    nodes: Variation[];
  };
  productBrand?: any;
  productDescription: any;
  sku: any;
  seo: any;
  uri: any;
  currency: any
}
export interface Variation {
  id: string;
  databaseId: number; // Add this property
  variationId: number;
  name: string;
  description: string;
  type: string;
  onSale: boolean;
  price: number;
  regularPrice: number;
  salePrice: number;
}
interface ProductProps {
  product: Product;
  reviews: any;
  aggregateRating?: any
}

export default function Product({ product, reviews, aggregateRating, }: ProductProps) {
  // console.log("product aggregateRating:", aggregateRating);
  const [loading, setLoading] = useState(false);

  const [selectedVariationId, setSelectedVariationId] = useState<number | "">("");
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [isSelected, setIsSelected] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const handleVariationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSelected(true);
    const selectedId = parseInt(event.target.value);
    if (isNaN(selectedId)) {
      setSelectedVariationId("");
      setSelectedVariation(null);
    } else {
      setSelectedVariationId(selectedId);
      const variation = product?.variations?.nodes.find((varItem) => {
        return varItem.databaseId === selectedId;
      });

      setSelectedVariation(variation || null);
      // console.log("Selected Variation:", variation);
    }
  };
  const addToCart = useAddToCart();
  const { addItem } = useCart();

  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (product.__typename === "VariableProduct" && !selectedVariationId) {
      setIsSelected(false); // If no option is selected when the button is clicked, update isSelected to false
      return;
    }
    setLoading(true);
    try {
      const productId = selectedVariation ? selectedVariation.databaseId : product.databaseId;
      // console.log("productId", productId);
      if (!productId) {
        console.error('Product ID is null or undefined');
        return;
      }
      const cartItem = await addToCart(productId, selectedVariation, quantity); // Pass selectedVariation here
      // Use the addItem function from CartContext
      addItem(cartItem);
      setLoading(false)
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      setLoading(false)
    }
  };
  

  return (
    <>
      <Seo seo={product?.seo} uri={product?.uri} />
      <ProductJsonLd
        productName={product.name}
        images={[product.image?.sourceUrl || ""]}
        description={product.description}
        brand={product?.productBrand?.brand}
        offers={[
          {
            price: selectedVariation ? selectedVariation?.price?.toString() : product.regularPrice,
            priceCurrency: product.currency,
            availability: product.stockStatus === "IN_STOCK" ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${product.uri}`,
            seller: {
              name: "Salvia Extract",
            },
          },
        ]}
        // Optional product properties
        sku={product.sku}
      />
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-10 mt-10 px-6 xl:px-0">
        <div className="relative">
          <figure className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-full">
            <Image
              src={product?.image?.sourceUrl ?? ""}
              alt="Image product"
              layout="fill"
              className="object-contain object-center"
              priority
            />
          </figure>
        </div>

        {/* Right column */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          {/* Brand and Stock information */}
          <div className="flex items-center my-3">
            {product?.productBrand?.brand && <span className={`bg-gray-200 text-gray-900 text-xs py-1.5 px-3 ${product?.productBrand?.brand ? 'mr-2' : 'mr-0'} rounded-full`}>{product?.productBrand?.brand}</span>}
            {product?.stockStatus === "IN_STOCK" ? (
              <span className="bg-gray-200 text-gray-900 text-xs py-1.5 px-3 rounded-full">
                In stock
              </span>
            ) : (
              <span className="bg-gray-200 text-gray-900 text-xs py-1.5 px-3 rounded-full">
                Out of stock
              </span>
            )}
          </div>
          {/* Price */}
          <div className="mt-5">
            {selectedVariation ? (
              <p className="price mb-5 text-2xl font-bold tracking-tight text-gray-900">
                {selectedVariation.regularPrice}
              </p>
            ) : (
              <p className="product-price mb-5 text-2xl font-bold tracking-tight text-gray-900">
                {product.regularPrice}
              </p>
            )}
          </div>


          <div className="flex flex-wrap items-center mt-5">
            {/* select variation */}
            {product.__typename === "VariableProduct" ? (
              <div className="basis-full sm:basis-0 mb-5 sm:mb-0">
                <div className="variation-select mr-4 ">
                  <label htmlFor="variation" className={`sr-only ${!isSelected ? 'text-red-800' : ''}`}>Size:</label>
                  <select
                    id="variation"
                    aria-label="variation"
                    value={selectedVariationId}
                    onChange={handleVariationChange}
                    className={`rounded-full border border-gray-900 py-1 px-3 h-[44px] w-28 text-sm ${isSelected ? '' : 'border-red-800'}`}
                  >
                    <option value="">Select Size</option>
                    {product?.variations?.nodes.map((variation) => (
                      <option
                        key={variation.databaseId}
                        value={variation.databaseId}
                      >
                        {variation.name.split("-")[1]}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="select-icon w-4 h-4" />
                </div>
              </div>
            ) : null}

            {/* Add to Cart */}
            <button
              className={`relative flex items-center justify-center rounded-full border border-gray-900 hover:border-transparent bg-gray-900 px-8 py-3 text-sm uppercase font-medium text-white ${product.__typename === "VariableProduct" && !selectedVariationId ? "opacity-50 cursor-help" : "hover:text-gray-900 hover:bg-gray-200"
                }`}
              onClick={handleAddToCart}
            >
               {loading ? 'Loading...' : 'Add to Cart'} 
            </button>
            {/* Quantity selector */}
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>

          {product.__typename === "VariableProduct" && selectedVariation?.description ? (
            <div className="mt-6 text-slate-800">
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedVariation?.description),
                }}
                className="bg-gray-200 text-gray-900 text-sm font-bold py-1.5 px-3 rounded-full"
              />
            </div>
          ) : null}

          <div className="mt-8 mb-5">
            {
              // Show the SKU section only when 'product.sku' or 'selectedVariation?.sku' is available
              // @ts-ignore
              (product.sku || selectedVariation?.sku) && (
                <div className="mt-8 mb-5">
                  <p className="font-bold">SKU:</p>
                  {/* @ts-ignore */}
                  {product.__typename === "SimpleProduct" ? product.sku : selectedVariation ? selectedVariation?.sku : product.sku}
                </div>
              )
            }
          </div>
          {/* {product.shortDescription && <p className="font-bold">Short Description:</p>}
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.shortDescription),
            }}
            className="product-description [&>p]:py-3 [&>p]:leading-8 [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
          /> */}
        </div>
      </div>

      {/* Full description */}
      <ProductFullDescription product={product} />
    </>
  );
}


export async function getStaticProps({ params }: { params: Params }) {
  const productResponse = await client.query({ query: GET_SINGLE_PRODUCT, variables: { id: params.slug } })
  const product = productResponse?.data?.product;

  const storyblokApi = getStoryblokApi();
  // @ts-ignore
  let { data: config } = await storyblokApi.get("cdn/stories/config");

  return {
    props: {
      product,
      config: config ? config.story : false,
    },
    revalidate: 3600,
  };
}


export async function getStaticPaths() {
  const GET_PRODUCTS_SLUGS = gql`
    query Products {
      products {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_PRODUCTS_SLUGS,
  });

  const paths = data.products.nodes.map((product: ProductPath) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
