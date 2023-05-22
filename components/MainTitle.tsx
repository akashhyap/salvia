import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

// @ts-ignore
const Teaser = ({ blok }) => {
  return (
    <div className={`pt-12 px-6 xl:px-0 ${blok.containerLayout ? "max-w-7xl m-auto" : "w-full"}`}>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-7">{blok.title}</h1>
    </div>
  );
};

export default Teaser;
