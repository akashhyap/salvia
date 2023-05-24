import Head from "next/head";
import {
    useStoryblokState,
    getStoryblokApi,
    StoryblokComponent,
} from "@storyblok/react";

import { client } from "../lib/apolloClient";

import { PRODUCT_QUERY } from '../lib/graphql';
import Products from "../components/products";
import { useEffect, useState } from "react";


// @ts-ignore
export default function Page({ story, products }) {
    // console.log("inner page", story);
    story = useStoryblokState(story);

    const [filters, setFilters] = useState({ category: "", stockStatus: "", priceOrder: "" });
    const [filteredProducts, setFilteredProducts] = useState(products.edges);

    useEffect(() => {
        let filtered = [...products.edges]; // Use the original products array
        if (filters.category) {
            // @ts-ignore
            filtered = filtered.filter(product => product.node.productCategories.edges.some(categoryEdge => categoryEdge.node.name === filters.category));
        }
        // Update the state
        setFilteredProducts(filtered);
    }, [filters, products]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prevFilters => ({ ...prevFilters, category: event.target.value }));
    };

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
            <StoryblokComponent blok={story.content} all={story} />
            {
                story.slug === 'shop' ?
                    <div className="max-w-7xl mx-auto">
                        {/* Filter UI */}
                        <div className="flex justify-end px-6 xl:px-0 pt-10 mt-10 border-t">
                            <label>
                                Select Category:
                                <select value={filters.category} onChange={handleCategoryChange} className="border border-slate-800 rounded-sm ml-2">
                                    <option value="">All</option>
                                    <option value="salvia">Salvia</option>
                                    <option value="kratom">Kratom</option>
                                </select>
                            </label>
                        </div>
                        <Products products={{ edges: filteredProducts }} />
                    </div>
                    :
                    <div className="max-w-7xl mx-auto">
                        <Products products={products} />
                    </div>
            }
        </>
    );
}
// @ts-ignore
export async function getStaticProps({ params }) {
    const productsResponse = await client.query({ query: PRODUCT_QUERY })
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

    // If the page is 'shop', return all products
    if (slug === 'shop') {
        filteredProducts = products.edges;
    }
    // If the page has a category, return products that match the category
    else if (pageCategory) {
        filteredProducts = products.edges.filter(
            (product: { node: { productCategories: { edges: any[]; }; }; }) =>
                product.node.productCategories.edges.some(
                    (categoryEdge) => categoryEdge.node.slug === pageCategory
                )
        );
    }
    // If the page is not 'shop' and there's no category, return an empty array
    else {
        filteredProducts = [];
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
