import Head from 'next/head';
import { useMutation } from "@apollo/client";

import styles from '../styles/Home.module.css';
import Layout from "../components/Layout";
import { client } from '../lib/apolloClient';

import Products from '../components/products';
import { GET_SITE_LOGO, PRODUCT_QUERY, GET_OPTIONS,LOG_OUT } from '../lib/graphql';
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
  topInformationBar?: string
};
export default function Home({ products, siteLogo, topInformationBar }: HomeProps) {
  // console.log("products",products);
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
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Salvia Extract
        </h1>
        <Products products={products} />
      </main>
    </Layout>
  )
}


export async function getStaticProps() {
  // Execute both queries concurrently using Promise.all
  const [productsResponse, siteLogoResponse, topInformationBarResponse] = await Promise.all([
    client.query({ query: PRODUCT_QUERY }),
    client.query({ query: GET_SITE_LOGO }),
    client.query({ query: GET_OPTIONS }),
  ]);

  const products = { edges: productsResponse?.data?.products?.edges || [] };
  const siteLogo = siteLogoResponse?.data?.getHeader?.siteLogoUrl;
  const topInformationBar = topInformationBarResponse?.data?.options?.topInformationBar?.informationBar;

  return {
    props: {
      products,
      siteLogo,
      topInformationBar
    },
    revalidate: 1,
  };
}
