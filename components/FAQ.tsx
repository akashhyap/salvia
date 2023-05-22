import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";

// @ts-ignore
const FAQ = ({ blok }) => {
  // console.log("faq blok", blok);

  return (
    <div className={`${blok.background} ${blok.margin}`}>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
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
