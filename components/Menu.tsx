import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { useRouter } from "next/router";

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// @ts-ignore
const Menu = ({ blok }) => {
  // console.log('blok link', blok);
  
  const router = useRouter();

  let cachedUrl = `/${blok.link.cached_url}`
  let routerUrl = `${router.asPath}/`

  return (
    <Link
      href={`/${blok.link.cached_url}`}
      {...storyblokEditable(blok)}
      legacyBehavior
    >
      <a
        className={classNames(
          cachedUrl == routerUrl
            ? "rounded-none transition duration-500 ease-in-out relative after:absolute after:block after:right-3 after:left-3 after:bottom-0  after:border-b-2 after:border-poppy-900"
            : "flex items-center hover:bg-gray-200",
          "block px-3 py-2 rounded-lg text-base"
        )}
        aria-current={cachedUrl == routerUrl ? "page" : undefined}
      >
        {blok.title}
      </a>
    </Link>
  );
};
export default Menu;
