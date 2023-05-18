import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";

// @ts-ignore
const FooterColumn = ({ blok }) => {
    // console.log("footer blok", blok);
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900">{blok.heading}</h3>
      <ul role="list" className="mt-6 space-y-6">
        {/* @ts-ignore */}
        {blok.column.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
