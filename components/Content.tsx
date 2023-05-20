import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const Content = ({ blok }) => {
  console.log("Inner page:", blok);
  // @ts-ignore
  let paddingSetting = (val) => {
    switch (blok.padding) {
      case "p-0":
        return "p-0";
        break;
      case "py-10":
        return "py-10";
        break;

    }
  };

  return (
    <div className={`${blok.containerLayout ? "max-w-6xl m-auto" : "w-full"} ${paddingSetting(blok.padding)} [&>h2]:text-3xl [&>h2]:mb-4 [&>h2]:mt-4 [&>h3]:text-2xl [&>h3]:mb-4 [&>h3]:mt-4 [&>p]:pb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-4 [&>ul]:leading-relaxed`}>
      {blok.title ? (<h1 className="text-3xl pb-5">{blok.title}</h1>) : (
        ""
      )}
      {render(blok.text)}
    </div>
  );
};

export default Content;
