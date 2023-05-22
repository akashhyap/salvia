import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

// @ts-ignore
const FooterMenu = ({ blok }) => {
//   console.log("footer link", blok);
  return (
    <li className="text-sm">
      <Link
        href={`/${blok.link.cached_url}`}
        {...storyblokEditable(blok)}
        legacyBehavior
      >
        <a className="text-gray-900 hover:text-gray-600">{blok.text}</a>
      </Link>
    </li>
  );
};
export default FooterMenu;
