import React from 'react';
import CartItems from '../components/cart/CartItems';
import { client } from '../lib/apolloClient';

import Layout from '../components/Layout';
import { GET_SITE_LOGO, GET_OPTIONS } from '../lib/graphql'

interface SettingProps {
  siteLogo: string;
  topInformationBar?: string
}

const CartPage = ({ siteLogo, topInformationBar }: SettingProps) => {
  return (
    <Layout siteLogo={siteLogo} topInformationBar={topInformationBar}>
      <h1>Cart</h1>
      <CartItems />
    </Layout>
  );
};

export default CartPage;

export async function getStaticProps() {
  const [siteLogoResponse, topInformationBarResponse] = await Promise.all([
    client.query({ query: GET_SITE_LOGO }),
    client.query({ query: GET_OPTIONS }),
  ]);

  const siteLogo = siteLogoResponse?.data?.getHeader?.siteLogoUrl;
  const topInformationBar = topInformationBarResponse?.data?.options?.topInformationBar?.informationBar;

  return {
    props: {
      siteLogo,
      topInformationBar,
    },
  };
}