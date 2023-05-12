import { useState } from "react";
import { gql } from "@apollo/client";
import DOMPurify from "isomorphic-dompurify";
import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";

import { GET_SITE_LOGO, GET_ALL_PAGES, GET_OPTIONS, PRODUCT_QUERY } from '../lib/graphql';
import Products from "../components/products";


interface PageSlug {
    slug: string
}
interface Params {
    uri: string;
    databaseId: string;
}
interface PageData {
    id: string;
    title: string;
    content: string;
}
interface PagesData {
    pages: {
        edges: PageSlug[];
    };
}
interface PageProps {
    page: PageData;
    siteLogo: string;
    topInformationBar?: string
    products: {
        edges: {
            node: Product;
        }[];
    };
}
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


function InnerPage({ page, siteLogo, topInformationBar, products }: PageProps) {
    // console.log(page);
    return (
        <Layout siteLogo={siteLogo} topInformationBar={topInformationBar}>
            <div className="max-w-6xl mx-auto">
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(page.content),
                    }}
                    className="content"
                />
                <Products products={products} />
            </div>
        </Layout>
    );
}

export async function getStaticProps({ params }: { params: Params }) {
    const [pageResponse, siteLogoResponse, topInformationBarResponse, productsResponse] = await Promise.all([
        client.query({ query: GET_ALL_PAGES }),
        client.query({ query: GET_SITE_LOGO }),
        client.query({ query: GET_OPTIONS }),
        client.query({ query: PRODUCT_QUERY }),
    ])
    const allPages = pageResponse?.data?.pages?.nodes;
    const page = allPages.find((p: any) => p.slug === params.uri);
    const siteLogo = siteLogoResponse?.data?.getHeader?.siteLogoUrl;
    const topInformationBar = topInformationBarResponse?.data?.options?.topInformationBar?.informationBar;
    const products = { edges: productsResponse?.data?.products?.edges || [] };

    const pageProductCategory = page?.productCategory?.productCategory || null;

    let filteredProducts = [];

    if (pageProductCategory) {
        // Filter products based on the page's assigned category
        filteredProducts = products.edges.filter(
            (product: { node: { productCategories: { edges: any[]; }; }; }) =>
                product.node.productCategories.edges.some(
                    (categoryEdge) => categoryEdge.node.slug === pageProductCategory
                )
        );
    }

    return {
        props: {
            page,
            siteLogo,
            topInformationBar,
            products: { edges: filteredProducts },
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const { data } = await client.query<{
        pages: {
            nodes: PageSlug[];
        };
    }>({
        query: gql`
        query {
          pages {
            nodes {
              slug
            }
          }
        }
      `,
    });

    const paths = data.pages.nodes.map((node) => ({
        params: { uri: node.slug },
    }));

    return {
        paths,
        fallback: "blocking",
    };
}

export default InnerPage;
