import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

// @ts-ignore
const Teaser = ({ blok }) => {
  return (
    <div className={`pt-12 ${blok.containerLayout ? "max-w-6xl m-auto" : "w-full"}`}>
      <h1 className="text-5xl mb-7">{blok.title}</h1>
    </div>
  );
};

export default Teaser;
