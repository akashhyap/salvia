import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from "../components/Layout";
import { client } from '../lib/apolloClient';

import Products from '../components/products';
import { GET_SITE_LOGO, PRODUCT_QUERY, GET_OPTIONS } from '../lib/graphql';

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
export default function Shop({ products, siteLogo, topInformationBar }: HomeProps) {

  return (
    <>
     <main className={styles.main}>
        <h1 className={styles.title}>
          Shop
        </h1>
        <Products products={products} />
      </main>
    </>
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
