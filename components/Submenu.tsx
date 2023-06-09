import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useRouter } from "next/router";

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// @ts-ignore
const Submenu = ({ blok }) => {
  // console.log('menu link', blok);
  
  // const router = useRouter();

  // let cachedUrl = `/${blok.link.cached_url}`
  // let routerUrl = `${router.asPath}/`

  return (
    <Link
      href={`/${blok.link.cached_url}`}
      {...storyblokEditable(blok)}
      legacyBehavior
    >
      <a className="whitespace-nowrap flex items-center h-full hover:bg-gray-200 px-3 py-2 text-base hover:text-gray-900 text-black">
        {blok.title}
      </a>
    </Link>
  );
};
export default Submenu;
