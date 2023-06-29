import { getStoryblokApi, storyblokEditable } from "@storyblok/react";

import { useState, useEffect, Fragment, useCallback } from "react";
import ArticlesBlock from "./ArticleBlock";

interface Article {
    content: {
        component: string;
        slug: string;
    };
    uuid: string;
    full_slug: string;
    slug: string
}

interface Blok {
    tag?: string;
    title: string;
}

const News = ({ blok }: { blok: Blok }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // New state to manage "Load more" visibility
    const pageSize = 9;

    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false); // New state

    const getArticles = useCallback(async () => {
        try {
            const storyblokApi = getStoryblokApi();
            const { data } = await storyblokApi.get(`cdn/stories`, {
                version: "draft",
                starts_with: 'news/',
                is_startpage: 0,
                per_page: pageSize,
                page: currentPage
            });

            const updatedArticles = data.stories.map((article: Article) => {
                article.content.slug = article.slug;
                return article;
            });
            setArticles(prevArticles => [...prevArticles, ...updatedArticles]);

            if (data.stories.length < pageSize) {
                setHasMore(false); // If we received fewer articles than `pageSize`, there are no more articles
            }
            setIsInitialLoadComplete(true);
        } catch (err) {
            console.error("Failed to fetch articles: ", err);
            setArticles([]);
            setHasMore(false); // In case of error, also hide the "Load more" button
            setIsInitialLoadComplete(true);
        }
    }, [currentPage]);

    useEffect(() => {
        getArticles();
    }, [getArticles]);

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    }

    return (
        <ArticlesBlock
            // @ts-ignore
            blok={blok}
            articles={articles}
            loadMore={loadMore}
            hasMore={hasMore}
            isInitialLoadComplete={isInitialLoadComplete}
        />
    );
};
export default News;