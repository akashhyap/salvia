import { useState } from "react";
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
import { GET_SITE_LOGO, GET_SINGLE_PRODUCT, GET_OPTIONS } from '../../lib/graphql';

interface ProductPath {
  slug: string;
}
interface Params {
  slug: string;
}
export interface Product {
  databaseId: any;
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
  siteLogo: string;
  topInformationBar?: string
}

export default function Product({ product }: ProductProps) {
  // console.log("product single:", product);
  const [selectedVariationId, setSelectedVariationId] = useState<number | "">("");
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [isSelected, setIsSelected] = useState(true); // Add this state

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
    try {
      const productId = selectedVariation ? selectedVariation.databaseId : product.databaseId;
      // console.log("productId", productId);
      if (!productId) {
        console.error('Product ID is null or undefined');
        return;
      }
      const cartItem = await addToCart(productId, selectedVariation); // Pass selectedVariation here
      console.log("item from addToCart:", cartItem);
      // Use the addItem function from CartContext
      addItem(cartItem);
      // setCartCount((prevCount: number) => prevCount + cartItem.quantity);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-10 mt-10  px-6 xl:px-0">
        <div className="relative">
          <figure className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[450px]">
            <Image
              src={product?.image?.sourceUrl ?? ""}
              alt="Image product"
              layout="fill"
              className="object-contain object-center"
            />
          </figure>
        </div>
        <div>
          <h1 className="text-4xl mb-5">{product.name}</h1>
          <div className="flex justify-between">
            {selectedVariation ? (
              <p className="price mb-5 text-xl">
                {selectedVariation.regularPrice}
              </p>
            ) : (
              <p className="product-price mb-5 text-xl">
                {product.regularPrice}
              </p>
            )}

            <p>
              {product?.stockStatus === "IN_STOCK" ? (
                <span className="bg-green-400 text-sm px-2 py-1 rounded-md">
                  In stock
                </span>
              ) : (
                <span className="bg-red-400 text-sm px-2 py-1 rounded-md">
                  Out of stock
                </span>
              )}
            </p>
          </div>

          {product.__typename === "VariableProduct" ? (
            <>
              <div className="variation-select">
                <label htmlFor="variation" className={`${!isSelected ? 'text-red-800' : ''}`}>Size:</label>
                <select
                  id="variation"
                  value={selectedVariationId}
                  onChange={handleVariationChange}
                  className={`border rounded-sm p-1 ml-2 ${isSelected ? '' : 'border-red-800'}`}
                >
                  <option value="">Select</option>

                  {product?.variations?.nodes.map((variation) => (
                    <option
                      key={variation.databaseId}
                      value={variation.databaseId}
                    >
                      {variation.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null}

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.shortDescription),
            }}
            className="product-description my-5 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
          />

          <div className="mt-5">
            <button
              className={`relative flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-2 text-sm font-medium text-white ${product.__typename === "VariableProduct" && !selectedVariationId ? "opacity-50 cursor-help" : "hover:text-gray-900 hover:bg-gray-200"
                }`}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
      <div className="flex max-w-7xl mx-auto px-6 xl:px-0 ">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description),
          }}
          className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
        />
      </div>
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
