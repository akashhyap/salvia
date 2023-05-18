import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const Content = ({ blok }) => {
  // console.log("Inner page:", blok);
  return (
    <div className={`${blok.containerLayout ? "max-w-6xl m-auto" : "w-full"} py-10 [&>h2]:text-3xl [&>h2]:mb-4 [&>h2]:mt-4 [&>h3]:text-2xl [&>h3]:mb-4 [&>h3]:mt-4 [&>p]:pb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-4 [&>ul]:leading-relaxed`}>
      <h1 className="text-3xl">{blok.title}</h1>
      {render(blok.text)}
    </div>
  );
};

export default Content;
