import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useRouter } from "next/router";

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// @ts-ignore
const Menu = ({ blok }) => {
  // console.log('menu link', blok);
  
  // const router = useRouter();

  // let cachedUrl = `/${blok.link.cached_url}`
  // let routerUrl = `${router.asPath}/`

  return (
    <Link
      href={`/${blok.link.cached_url}`}
      legacyBehavior
    >
      <a className="whitespace-nowrap flex items-center lg:h-full hover:bg-gray-200 lg:px-3 lg:py-2 text-base font-medium text-gray-900">
        {blok.title}
      </a>
    </Link>
  );
};
export default Menu;
