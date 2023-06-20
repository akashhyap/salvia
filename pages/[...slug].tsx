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

import { ArticleJsonLd, WebPageJsonLd } from 'next-seo';
import Seo from "../components/Seo";

import DisqusComments from "../components/DisqusComments";

// @ts-ignore
export default function Page({ story, products }) {
    // console.log("inner products", products);
    // console.log("inner story", story);

    story = useStoryblokState(story);

    const [filters, setFilters] = useState({ category: "", stockStatus: "", priceOrder: "" });
    const [filteredProducts, setFilteredProducts] = useState(() => products?.edges || []);

    useEffect(() => {
        let filtered = [...(products?.edges || [])];
        if (filters.category) {
            // @ts-ignore
            filtered = filtered.filter(product => product.node.productCategories.edges.some(categoryEdge => categoryEdge.node.slug === filters.category));
        }
        // Update the state
        setFilteredProducts(filtered);
    }, [filters, products]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prevFilters => ({ ...prevFilters, category: event.target.value }));
    };

    return (
        <>
            <Seo seo={story?.content.metatags} uri={story?.full_slug} />

            {story?.content.component === "Article" ? (
                <ArticleJsonLd
                    type="BlogPosting"
                    url={story?.full_slug}
                    title="Blog headline"
                    images={[
                        'https://example.com/photos/1x1/photo.jpg',
                        'https://example.com/photos/4x3/photo.jpg',
                        'https://example.com/photos/16x9/photo.jpg',
                    ]}
                    datePublished={story?.first_published_at}
                    dateModified={story?.published_at}
                    authorName="Salvia Extract"
                    description={story?.content?.metatags?.description}
                />
            ) : (
                <WebPageJsonLd
                    description={story?.content?.metatags?.description}
                    id=""
                    lastReviewed={story?.published_at}
                    reviewedBy={{
                        type: 'Person',
                        name: '',
                    }}
                />
            )}

            {story ? <StoryblokComponent blok={story.content} all={story} /> : <div className="max-w-2xl p-5">Loading...</div>}

            {
                story?.slug === 'shop' ?
                    <div className="max-w-7xl mx-auto">
                        {/* Filter UI */}
                        <div className="flex justify-end px-6 xl:px-0 pt-10 mt-10 border-t">
                            <label>
                                Select Category:
                                <select value={filters.category} onChange={handleCategoryChange} className="border border-slate-800 rounded-sm ml-2">
                                    <option value="">All</option>
                                    <option value="salvia">Salvia</option>
                                    <option value="kratom">Kratom</option>
                                    <option value="buy-salvia-extract">Buy Salvia Extract</option>
                                    <option value="black-friday-opms-kratom-deals">Black Friday OPMS Kratom Deals</option>
                                    <option value="black-friday-rh-kratom-deals">Black Friday RH Kratom Deals</option>
                                    <option value="party-pack">Party Pack</option>
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

            {story?.full_slug.includes('blog/') ? (
                <div className="max-w-7xl mx-auto">
                    {/* @ts-ignore */}
                    <DisqusComments story={story} />
                </div>
            ) : null}
        </>
    );
}

// @ts-ignore
export async function getServerSideProps({ params }) {
    const productsResponse = await client.query({ query: PRODUCT_QUERY })
    const products = { edges: productsResponse?.data?.products?.edges || [] };

    const slug = params.slug ? params.slug : ['home'];
    let sbParams = {
        version: "draft", // or 'published'
        resolve_links: "url",
    };
    const storyblokApi = getStoryblokApi();
    // @ts-ignore
    let { data } = await storyblokApi.get(`cdn/stories/${slug.join('/')}`, sbParams);
    let { data: config } = await storyblokApi.get("cdn/stories/config");
    const pageCategory = data.story.content.category;
    // console.log("pageCategory", pageCategory);

    let filteredProducts = [];

    // If the page is 'shop', return all products
    if (slug.join('/') === 'shop') {
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
    };
}
