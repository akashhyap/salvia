import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";

// @ts-ignore
const FAQ = ({ blok }) => {
  // console.log("faq blok", blok);

  return (
    <div className={`${blok.background} ${blok.margin}`}>
      <div className={`mx-auto max-w-7xl ${blok.fullWidth ? '' : 'py-24 sm:py-20 px-6 lg:px-8'}`}>
        <div className={`max-w-4xl ${blok.fullWidth ? 'px-6 xl:px-0' : 'mx-auto'} divide-y divide-white/10`}>
          {blok.title && <h2 className={`text-2xl font-bold leading-10 tracking-tight ${blok.background === "bg-white" ? "": "text-white"}`}>{blok.title}</h2>}
          <dl className={`mt-5 lg:mt-6 space-y-6 divide-y ${blok.background === "bg-white" ? "divide-black/10": "divide-white/10"}`}>
            {/* @ts-ignore */}
            {blok.content.map((nestedBlok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
