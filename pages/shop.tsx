import {
    useStoryblokState,
    getStoryblokApi,
    StoryblokComponent,
} from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

import { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";

import { client } from '../lib/apolloClient';
import Products from '../components/products';
import { PRODUCT_QUERY, LOG_OUT } from '../lib/graphql';

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
    topInformationBar?: string;
    heroGallery?: { sourceUrl: string }[];
    image?: {
        id: string;
        altText: string;
        sourceUrl: string;
    };
};


// @ts-ignore
export default function Shop({ story, products }: HomeProps) {
    story = useStoryblokState(story, { customParent: "http://localhost:3010/" });

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
            <div className='max-w-6xl mx-auto'>
                <StoryblokComponent blok={story.content} />
                {/* Filter UI */}
                <div className="flex justify-end pt-10 border-t-2">
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
        </>
    )
}

export async function getStaticProps() {
    const productsResponse = await client.query({ query: PRODUCT_QUERY })
    const products = { edges: productsResponse?.data?.products?.edges || [] };
    let slug = "shop";
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