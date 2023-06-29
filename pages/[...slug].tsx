import Head from "next/head";
import { useRouter } from "next/router";
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
import { ParsedUrlQuery } from "querystring";
import SkeletonArticle from "../components/SkeletonArticle";
import { useCallback } from 'react';


interface Params extends ParsedUrlQuery {
    slug: string[];
}
interface Product {
    node: {
        productCategories: {
            edges: any[];
        };
    };
}

type Path = {
  params: {
    slug: string[];
  };
};

// @ts-ignore
export default function Page({ story, products }) {
    // console.log("inner products", products);
    // console.log("inner story", story);

    story = useStoryblokState(story);

    const [filters, setFilters] = useState({ category: "", stockStatus: "", priceOrder: "" });
    const [filteredProducts, setFilteredProducts] = useState(() => products?.edges || []);

    useEffect(() => {
        let filtered: typeof products.edges = [];
        if (filters.category) {
            // @ts-ignore
            filtered = products?.edges.filter(product => product.node.productCategories.edges.some(categoryEdge => categoryEdge.node.slug === filters.category));
        } else {
            filtered = products?.edges || [];
        }
        // Update the state
        setFilteredProducts(filtered);
    }, [filters, products]);

    const handleCategoryChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setFilters(prevFilters => ({ ...prevFilters, category: event.target.value }));
        },
        []
    );

    const router = useRouter();

    if (router.isFallback) {
        return <SkeletonArticle />;
    }

    return (
        <>
            <Seo seo={story?.content.metatags} uri={story?.full_slug} />

            {story?.content.component === "Article" ? (
                <ArticleJsonLd
                    type="BlogPosting"
                    url={story?.full_slug}
                    title={story?.name}
                    images={[
                        story.content.image.filename,
                    ]}
                    datePublished={story?.first_published_at}
                    dateModified={story?.published_at}
                    authorName="Salvia Extract"
                    description={story?.content?.metatags?.description}
                />
            ) : (
                <WebPageJsonLd
                    description={story?.content?.metatags?.description}
                    id={story?.content._uid}
                    lastReviewed={story?.published_at}
                    reviewedBy={{
                        type: 'Person',
                        name: 'Marc',
                    }}
                />
            )}

            <StoryblokComponent blok={story.content} all={story} />

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

export async function getStaticProps({ params }: { params: Params }) {
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

    let products = { edges: [] };
    let filteredProducts: Product[] = [];

    // Only fetch products if the page is 'shop' or if the pageCategory exists
    if (slug.join('/') === 'shop' || pageCategory) {
        const productsResponse = await client.query({ query: PRODUCT_QUERY })
        products = { edges: productsResponse?.data?.products?.edges || [] };

        // If the page is 'shop', assign all products to filteredProducts
        if (slug.join('/') === 'shop') {
            filteredProducts = products.edges;
        }
        // If the page has a category, filter the products to match the category
        else if (pageCategory) {
            filteredProducts = products.edges.filter(
                (product: { node: { productCategories: { edges: any[]; }; }; }) =>
                    product.node.productCategories.edges.some(
                        (categoryEdge) => categoryEdge.node.slug === pageCategory
                    )
            );
        }
    }

    return {
        props: {
            products: { edges: filteredProducts },
            story: data ? data.story : false,
            key: data ? data.story.id : false,
            config: config ? config.story : false,
        },
        revalidate: 300, // ISR every 5 minutes
    };
}

export async function getStaticPaths() {
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get("cdn/links/" ,{
        version: 'draft'
    });

    
    let paths: Path[] = [];

    Object.keys(data.links).forEach((linkKey) => {
        // If the link is not the 'home' page, generate a path for it
        if (data.links[linkKey].slug !== "home") {
            const slug = data.links[linkKey].slug;
            let splittedSlug = slug.split("/");
            paths.push({ params: { slug: splittedSlug } });
        }
    });
    

    return {
        paths: paths,
        fallback: 'blocking', 
    };
}