import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const WooProduct = ({ blok }) => {
    // console.log("WooProduct:", blok);
    const videoId = blok.youtube
    return (
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 mb-10">
            {/* @ts-ignore */}
            {blok.body.map((nestedBlok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </div>
    );
};

export default WooProduct;