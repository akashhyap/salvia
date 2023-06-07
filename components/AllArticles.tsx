import ArticleTeaser from "./ArticleTeaser";
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";

import { useState, useEffect } from "react";

// @ts-ignore
const AllArticles = ({ blok }) => {
    console.log("blok",blok);
    
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
                // console.log("article",article.content);
                
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
        <div className="max-w-7xl mx-auto py-14 px-6 xl:px-0">
            <p className="text-4xl font-bold tracking-tight text-gray-900 mb-7">{blok.title}</p>
            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-3">
                {articles[0] && articles.map((article) => (
                    // @ts-ignore
                    <ArticleTeaser article={article.content} key={article.uuid} slug={article.full_slug} />
                ))}
            </div>
        </div>
    );
};
export default AllArticles;