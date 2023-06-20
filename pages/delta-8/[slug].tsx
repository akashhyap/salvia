import { useRouter } from 'next/router';
import { StoryblokComponent, getStoryblokApi } from '@storyblok/react';
import { ParsedUrlQuery } from 'querystring';
import { ArticleJsonLd, WebPageJsonLd } from 'next-seo';
import Seo from '../../components/Seo';
import SkeletonArticle from '../../components/SkeletonArticle';

interface Params extends ParsedUrlQuery {
    slug: string[];
}

// @ts-ignore
const DeltaPage = ({ story }) => {
    // console.log("delta article detail", story);

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
        </>
    );
};

export async function getStaticProps({ params }: { params: Params }) {
    try {
        const storyblokApi = getStoryblokApi();
    
        let { data } = await storyblokApi.get(`cdn/stories/delta-8/${params.slug}`, {
            version: "draft",
        });

        let { data: config } = await storyblokApi.get("cdn/stories/config");

        return {
            props: {
                story: data ? data.story : false,
                config: config ? config.story : false,
            },
            revalidate: 1,
        };
    } catch (error) {
        console.error("Error fetching article data:", error);
        // Return empty props on error
        return {
            props: {},
            revalidate: 1,
        };
    }
}

export async function getStaticPaths() {
    try {
        const storyblokApi = getStoryblokApi();
        let { data } = await storyblokApi.get("cdn/links/", {
            version: 'draft'
        });

        let paths: { params: { slug: string[] } }[] = [];

        Object.keys(data.links).forEach((linkKey) => {
            const slug = data.links[linkKey].slug;
            // Exclude the base paths
            if (slug === "home" || slug === 'cbd' || slug === 'media' || slug === 'news' || slug === 'salvia-trip-report' || slug === 'kratom-wiki' || slug === 'salvia-divinorum' || slug === 'delta-8' || slug === 'salvia') {
                return;
            }
            
            if (slug.startsWith('delta-8/')) {
                paths.push({ params: { slug: slug.replace('delta-8/', '') } });
            }
        });
        
        return {
            paths: paths,
            fallback: true,
        };
    } catch (error) {
        console.error("Error generating paths:", error);
        // Return empty paths on error
        return {
            paths: [],
            fallback: true,
        };
    }
}

export default DeltaPage;
