import Link from "next/link";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

//@ts-ignore
const ShopByCategory = ({ blok }) => {
    // console.log("category", blok);

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
                        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                            <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
                                <div
                                    className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                    }}
                                />
                            </div>
                        </div>
                        <div className="py-14 px-10 xl:p-14 text-white">
                            <h2 className="text-4xl font-bold tracking-tight text-white mb-4 xl:mb-10">{blok.title}</h2>
                            <div className="text-xl leading-8 text-white sm:leading-9">
                                {render(blok.text)}
                            </div>

                        </div>
                        {/* <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" /> */}
                        <div className="flex items-end py-14 px-10 xl:p-14 text-white pt-0">
                            <div>
                                <Link href="/shop" legacyBehavior>
                                    <a className="text-white">Know More...</a>
                                </Link>
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
