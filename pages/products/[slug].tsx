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

import QuantitySelector from "../../components/QuantitySelector";

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
  productBrand: any;
  productDescription: any;
  sku: any
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
  console.log("product single:", product);
  const [selectedVariationId, setSelectedVariationId] = useState<number | "">("");
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [isSelected, setIsSelected] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

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
      const cartItem = await addToCart(productId, selectedVariation, quantity); // Pass selectedVariation here
      // console.log("item from addToCart:", cartItem);
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

        {/* Right column */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          <div className="flex items-center my-3">
            {product?.productBrand.brand && <span className="bg-gray-200 text-gray-900 text-xs py-1.5 px-3 rounded-full">{product?.productBrand.brand}</span>}
            
              {product?.stockStatus === "IN_STOCK" ? (
                <span className="bg-gray-200 text-gray-900 text-xs py-1.5 px-3 ml-4 rounded-full">
                  In stock
                </span>
              ) : (
                <span className="bg-gray-200 text-gray-900 text-xs py-1.5 px-3 ml-4 rounded-full">
                  Out of stock
                </span>
              )}
          </div>
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
          {product.__typename === "VariableProduct" ? (
            <>
              <div className="variation-select">
                <label htmlFor="variation" className={`${!isSelected ? 'text-red-800' : ''}`}>Size:</label>
                <select
                  id="variation"
                  value={selectedVariationId}
                  onChange={handleVariationChange}
                  className={`rounded-full border border-gray-900 py-1 px-2 ml-2 ${isSelected ? '' : 'border-red-800'}`}
                >
                  <option value="">Select</option>
                  {product?.variations?.nodes.map((variation) => (
                    <option
                      key={variation.databaseId}
                      value={variation.databaseId}
                    >
                      {variation.name.split("-")[1]}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null}

          <div className="flex items-center mt-5">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <button
              className={`relative flex items-center justify-center rounded-full border border-transparent bg-gray-900 px-8 py-3 text-sm uppercase font-medium text-white ${product.__typename === "VariableProduct" && !selectedVariationId ? "opacity-50 cursor-help" : "hover:text-gray-900 hover:bg-gray-200"
                }`}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-10 mb-5">
            <p className="font-bold">SKU:</p>
            {/* @ts-ignore */}
            {product.__typename === "SimpleProduct" ? product.sku : selectedVariation ? selectedVariation?.sku : product.sku}
          </div>
          {product.shortDescription && <p className="font-bold">Short Description:</p>}
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.shortDescription),
            }}
            className="product-description [&>p]:py-3 [&>p]:leading-8 [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 xl:px-0 mt-16 md:mb-20 lg:mb-28">
        {product.description === null ? (
          <>
            <select id="tab-select" className="sm:hidden py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" aria-label="Tabs">
              <option value="#hs-tab-to-select-1">Description</option>
              <option value="#hs-tab-to-select-2">FAQ</option>
              <option value="#hs-tab-to-select-3">Shipping</option>
            </select>

            <div className="hidden sm:block border-b border-gray-200">
              <nav className="flex space-x-2" aria-label="Tabs" role="tablist" data-hs-tab-select="#tab-select">
                <button type="button" className="hs-tab-active:bg-gray-900 hs-tab-active:border-b-transparent hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-200 text-sm font-medium text-center border text-gray-900 rounded-t-lg hover:bg-gray-900 hover:text-white active" id="hs-tab-to-select-item-1" data-hs-tab="#hs-tab-to-select-1" aria-controls="hs-tab-to-select-1" role="tab">
                  Description
                </button>
                <button type="button" className="hs-tab-active:bg-gray-900 hs-tab-active:border-b-transparent hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-200 text-sm font-medium text-center border text-gray-900 rounded-t-lg hover:bg-gray-900 hover:text-white" id="hs-tab-to-select-item-2" data-hs-tab="#hs-tab-to-select-2" aria-controls="hs-tab-to-select-2" role="tab">
                  FAQ
                </button>
                <button type="button" className="hs-tab-active:bg-gray-900 hs-tab-active:border-b-transparent hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-200 text-sm font-medium text-center border text-gray-900 rounded-t-lg hover:bg-gray-900 hover:text-white" id="hs-tab-to-select-item-3" data-hs-tab="#hs-tab-to-select-3" aria-controls="hs-tab-to-select-3" role="tab">
                  Shipping
                </button>
              </nav>
            </div>

            <div className="py-5">
              <div id="hs-tab-to-select-1" role="tabpanel" aria-labelledby="hs-tab-to-select-item-1">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.productDescription.descriptionContent),
                  }}
                  className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                />
              </div>
              <div id="hs-tab-to-select-2" className="hidden" role="tabpanel" aria-labelledby="hs-tab-to-select-item-2">
                {/* @ts-ignore */}
                {product.productDescription.faqContent.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200">
                    <button
                      className="flex justify-between items-center w-full py-3"
                      onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                    >
                      <p className="font-semibold">{faq.question}</p>
                      <span>{openAccordion === index ? '-' : '+'}</span>
                    </button>
                    {openAccordion === index && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(faq.answer),
                        }}
                        className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div id="hs-tab-to-select-3" className="hidden" role="tabpanel" aria-labelledby="hs-tab-to-select-item-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.productDescription.shippingContent),
                  }}
                  className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
              className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
            />
          </div>
        )}
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
