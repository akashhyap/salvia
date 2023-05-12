import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

// @ts-ignore
const Page = ({ blok }) => {
    // console.log("page", blok);
    return (
        <main {...storyblokEditable(blok)} className="relative w-full">
            {/* @ts-ignore */}
            {blok.body.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </main>
    );
}

export default Page;
