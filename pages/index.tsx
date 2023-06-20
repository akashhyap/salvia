import Head from "next/head";

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
import Link from "next/link";

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
  // console.log("home",story);

  story = useStoryblokState(story, { customParent: "http://localhost:3010/" });

  // @ts-ignore
  story.content.body = story.content.body.map(blok => ({
    ...blok,
    products,
  }));

  return (
    <>
      <Head>
        <title>
          {story.content.metatags
            ? story.content?.metatags?.title
            : story?.name}
        </title>
        <meta
          name="description"
          content={story.content.metatags
            ? story.content?.metatags?.description
            : story?.name}
        />
        <meta
          property="og:title"
          content={story.content.metatags
            ? story.content?.metatags?.og_title
            : story?.name}
        />
        <meta
          property="og:description"
          content={story.content.metatags
            ? story.content?.metatags?.og_description
            : story?.name}
        />
      
      </Head>
      <StoryblokComponent blok={story.content} />
    </>
  )
}

export async function getStaticProps() {
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