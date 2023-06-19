import Link from "next/link";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import Image from "next/image";

//@ts-ignore
const ShopByCategory = ({ blok }) => {
    console.log("category", blok);

    return (
        <section aria-labelledby="category-heading" className="relative px-6 xl:px-0">
            <div className="mx-auto max-w-7xl pt-20">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 id="category-heading" className="text-3xl font-bold tracking-tight text-gray-900">
                        Shop by Category
                    </h2>
                    <Link href="/shop" legacyBehavior>
                        <a className="hidden text-sm font-semibold text-gray-900 hover:text-gray-800 sm:block">
                            Browse all categories
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 xl:grid-rows-2 sm:gap-x-6 sm:gap-8">

                    <div className="relative sm:col-span-2 xl:col-span-1 group overflow-hidden rounded-lg xl:aspect-h-1 xl:aspect-w-1 lg:row-span-2 bg-gray-900">
                        <figure className="absolute inset-0 h-full w-full">
                            <Image
                                src={blok?.image?.filename}
                                alt=""
                                layout="fill"
                                className="object-cover object-center"
                            />
                            {/* <img
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                                alt=""
                                className="absolute inset-0 -z-10 h-full w-full object-cover"
                            /> */}
                        </figure>
                        <div className="relative flex flex-wrap text-white bg-gray-900 bg-opacity-60 z-10">
                            <div className="py-14 px-10 xl:p-14">
                                <h2 className="text-4xl font-bold tracking-tight text-white mb-4 xl:mb-10">{blok.title}</h2>
                                <div className="text-xl leading-8 text-white sm:leading-9">
                                    {render(blok.text)}
                                </div>

                            </div>
                            <div className="flex items-end py-14 px-10 xl:p-14 pt-0">
                                <div>
                                    <Link href="/shop" legacyBehavior>
                                        <a className="text-white">Know More...</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* @ts-ignore */}
                    {blok.content.map((nestedBlok) => (
                        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                    ))}
                </div>

                <div className="mt-6 sm:hidden">
                    <Link href="/shop" legacyBehavior>
                        <a className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                            Browse all categories
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ShopByCategory;
