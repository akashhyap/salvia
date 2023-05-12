import ArticleTeaser from "./ArticleTeaser";
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";

import { useState, useEffect } from "react";

// @ts-ignore
const AllArticles = ({ blok }) => {
    const [articles, setArticles] = useState([]);
    const currentTag = blok.tag || '';

    useEffect(() => {
        const getArticles = async () => {
            const storyblokApi = getStoryblokApi();
            const { data } = await storyblokApi.get(`cdn/stories`, {
                version: "draft", // or 'published'
                starts_with: 'blog/',
                // @ts-ignore
                is_startpage: false
            });
            // @ts-ignore
            const filteredArticles = data.stories.filter((article) => {
                const articleTag = article.content.tag || '';
                return currentTag === '' || currentTag === articleTag;
            });
            // @ts-ignore
            setArticles((prev) => filteredArticles.map((article) => {
                article.content.slug = article.slug;
                return article;
            }));
        };
        getArticles();
    }, [currentTag]);
    return (
        <>
            <p className="text-3xl">{blok.title}</p>
            <div
                className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3 lg:px-24 md:px-16"
                {...storyblokEditable(blok)}
            >
                {articles[0] && articles.map((article) => (
                    // @ts-ignore
                    <ArticleTeaser article={article.content} key={article.uuid} />
                ))}
            </div>
        </>
    );
};
export default AllArticles;