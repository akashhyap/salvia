import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

// @ts-ignore
const Teaser = ({ blok }) => {
  return (
    <div className={`pt-12 ${blok.containerLayout ? "max-w-6xl m-auto" : "w-full"}`}>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">{blok.title}</h1>
    </div>
  );
};

export default Teaser;
