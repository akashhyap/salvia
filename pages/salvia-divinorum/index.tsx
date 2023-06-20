import ArticleTeaser from "../../components/ArticleTeaser";
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";

import { useState, useEffect, Fragment } from "react";

// @ts-ignore
const SalviaDivinorum = ({ articles }) => {
    // console.log("Salvia Divinorum articles", articles);

    return (
        <div className="max-w-7xl mx-auto py-14 px-6 xl:px-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-7">Salvia Divinorum</h1>
            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-3">
                {/* @ts-ignore */}
                {articles ? articles.map((article) => (
                    <Fragment key={article.uuid}>
                        {article.content.component !== 'page' && <ArticleTeaser article={article.content} slug={article.full_slug} />}
                    </Fragment>
                )) : (
                    <p>No articles found.</p>
                )}

            </div>
        </div>
    );
};
export default SalviaDivinorum;

// @ts-ignore
export async function getStaticProps({ params }) {
    try {
        const storyblokApi = getStoryblokApi();
        
        let { data } = await storyblokApi.get(`cdn/stories`, {
            version: "draft", // or 'published'
            starts_with: `salvia-divinorum/`,
        });

        let { data: config } = await storyblokApi.get("cdn/stories/config");

        return {
            props: {
                articles: data.stories,
                config: config ? config.story : false,
            },
            revalidate: 1, // Optional: Revalidate the data at most once per second
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to display some error to the user or just return empty props
        return {
            props: {},
            revalidate: 1,
        };
    }
}
