import Head from "next/head";
import {
    useStoryblokState,
    getStoryblokApi,
    StoryblokComponent,
} from "@storyblok/react";

import { client } from "../lib/apolloClient";
import Layout from "../components/Layout";

import { GET_SITE_LOGO, GET_OPTIONS, PRODUCT_QUERY } from '../lib/graphql';
import Products from "../components/products";


// @ts-ignore
export default function Page({ story, products }) {
    // console.log("page", story.content);
    story = useStoryblokState(story);
    return (
        <>
            <Head>
                <title>
                    {story.content.metatags
                        ? story.content?.metatags?.title
                        : story?.name}
                </title>
            </Head>
            <StoryblokComponent blok={story.content} all={story} />
            <div className="max-w-6xl mx-auto">
                <Products products={products} />
            </div>
        </>
    );
}
// @ts-ignore
export async function getStaticProps({ params }) {
    // console.log("params:", params);
    const productsResponse = await client.query({ query: PRODUCT_QUERY })
    // const siteLogo = siteLogoResponse?.data?.getHeader?.siteLogoUrl;
    // const topInformationBar = topInformationBarResponse?.data?.options?.topInformationBar?.informationBar;
    const products = { edges: productsResponse?.data?.products?.edges || [] };
    let slug = params.slug ? params.slug.join("/") : "home";
    let sbParams = {
        version: "draft", // or 'published'
        resolve_links: "url",
    };
    const storyblokApi = getStoryblokApi();
    // @ts-ignore
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    let { data: config } = await storyblokApi.get("cdn/stories/config");
    const pageCategory = data.story.content.category;
    let filteredProducts = [];
    if (pageCategory) {
        // Filter products based on the page's assigned category
        filteredProducts = products.edges.filter(
            (product: { node: { productCategories: { edges: any[]; }; }; }) =>
                product.node.productCategories.edges.some(
                    (categoryEdge) => categoryEdge.node.slug === pageCategory
                )
        );
    }
    return {
        props: {
            products: { edges: filteredProducts },
            story: data ? data.story : false,
            key: data ? data.story.id : false,
            config: config ? config.story : false,
        },
        revalidate: 3600,
    };
}
export async function getStaticPaths() {
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get("cdn/links/");
    // @ts-ignore
    let paths = [];
    Object.keys(data.links).forEach((linkKey) => {
        if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
            return;
        }
        const slug = data.links[linkKey].slug;
        let splittedSlug = slug.split("/");
        paths.push({ params: { slug: splittedSlug } });
    });
    return {
        // @ts-ignore
        paths: paths,
        fallback: false,
    };
}
