import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import { useEffect } from 'react';
import { useMutation } from "@apollo/client";

import { client } from '../lib/apolloClient';
import Products from '../components/products';
import { PRODUCT_QUERY, LOG_OUT } from '../lib/graphql';

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


// @ts-ignore

export default function Home({ story, products }: HomeProps) {
  story = useStoryblokState(story, { customParent: "http://localhost:3010/" });

  // const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
  //   refetchQueries: [
  //     { query: GET_USER }
  //   ],
  //   awaitRefetchQueries: true,
  // });
  // const loggedOut = Boolean(data?.logout?.status);

  // useEffect(() => {
  //   const logOutAndResetStore = async () => {
  //     try {
  //       await logOut();
  //       await client.resetStore();
  //     } catch (error) {
  //       console.error("Error logging out and resetting store:", error);
  //     }
  //   };

  //   logOutAndResetStore();
  // }, [logOut]);

  return (
    <>
      <StoryblokComponent blok={story.content} />
      <div className='max-w-6xl mx-auto'>
        <Products products={products} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  // Execute both queries concurrently using Promise.all
  const productsResponse = await client.query({ query: PRODUCT_QUERY })
  const products = { edges: productsResponse?.data?.products?.edges || [] };
  
  let slug = "home";

  let sbParams: {
    version: "draft" | "published";
    resolve_links: "url" | "story";
  } = {
    version: "draft",
    resolve_links: "url",
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  let { data: config } = await storyblokApi.get("cdn/stories/config");

  return {
    props: {
      products,
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false,
    },
    revalidate: 60,
  };
}