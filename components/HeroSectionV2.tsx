import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const HeroSectionV2 = ({ blok }) => {
    // console.log("heroSection V2:", blok);
    return (
        <div className="relative image-effect isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
            <figure className="">
                <Image
                    src={`${blok.image.filename}`}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="inset-0 -z-10 h-full w-full"
                />
            </figure>
            <div
                className="absolute inset-x-0 -top-40 -z-8 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="ml-auto max-w-2xl py-24">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-end">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/10 hover:ring-white/20">
                            {blok.topContent}{' '}
                            <Link href={blok.topContentLink.cached_url} legacyBehavior>
                                <a className="font-semibold text-white">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    Read here <span aria-hidden="true">&rarr;</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-foregen tracking-tight text-white sm:text-5xl">
                            {render(blok.title)}
                        </div>
                        <div className="mt-6 text-lg leading-8 text-white">
                            {render(blok.subTitle)}
                        </div>
                        <div className="relative z-20 mt-10 flex items-center justify-end gap-x-6">
                            <Link href={blok.buttonLink1.cached_url} legacyBehavior>
                                <a
                                    className="rounded-full bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                >
                                    {blok.buttonLabel1}
                                </a>
                            </Link>
                            <Link href={blok.buttonLink2.cached_url} legacyBehavior>
                                <a className="text-sm font-semibold leading-6 text-white">
                                    {blok.buttonLabel2} <span aria-hidden="true">→</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-8 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </div>
    );
};

export default HeroSectionV2;
