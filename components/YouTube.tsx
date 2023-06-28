import React, { useEffect, useRef } from 'react';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const YouTube = ({ blok }) => {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const videoId = blok?.youtube;
    // console.log("YouTube:", blok);
    // @ts-ignore
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && iframeRef.current) {
                    iframeRef.current.src = `https://www.youtube.com/embed/${videoId}`;
                    if (observer) observer.disconnect();
                }
            });
        });

        if (iframeRef.current) observer.observe(iframeRef.current);

        return () => {
            if (observer) observer.disconnect();
        };
    }, [videoId]);

    return (
        <div>
            <iframe
                ref={iframeRef}
                width="100%"
                height="480"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default YouTube;
