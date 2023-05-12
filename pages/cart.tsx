import {
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import React from 'react';
import CartItems from '../components/cart/CartItems';
interface SettingProps {
  siteLogo: string;
  topInformationBar?: string
}

// @ts-ignore
const CartPage = ({ story }) => {
  return (
    <>
      <CartItems />
    </>
  );
};

export default CartPage;

// @ts-ignore
export async function getStaticProps({params}) {
  // @ts-ignore
  let slug = params?.slug ? params?.slug.join("/") : "home";
  let sbParams = {
    version: "draft", // or 'published'
    resolve_links: "url",
  };
  const storyblokApi = getStoryblokApi();
  // @ts-ignore
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  let { data: config } = await storyblokApi.get("cdn/stories/config");

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false,
    },
  };
}