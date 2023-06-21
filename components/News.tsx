import ArticleTeaser from "./ArticleTeaser";
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";

import { useState, useEffect, Fragment, useCallback } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
        <div className="max-w-7xl mx-auto py-14 px-6 xl:px-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-7">{blok.title}</h1>
            <TransitionGroup className="grid w-full grid-cols-1 gap-12 lg:grid-cols-3">
                {articles.map((article) => (
                    <CSSTransition key={article.uuid} timeout={500} classNames="article">
                        <Fragment>
                            {article.content.component !== 'page' && <ArticleTeaser article={article.content} slug={article.full_slug} />}
                        </Fragment>
                    </CSSTransition>
                ))}
            </TransitionGroup>

            {isInitialLoadComplete && hasMore && <div className="mt-14 text-center">
                <button onClick={loadMore} className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Load more</button>
            </div>}
        </div>
    );
};
export default News;