import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const HeroSection = ({ blok }) => {
    // console.log("heroSection:", blok);
    return (
        <header className="relative border-b border-gray-200 lg:border-0" {...storyblokEditable(blok)}>
            <div className="flex flex-col border-b border-gray-200 lg:border-0">
                <div className="relative">
                    <div aria-hidden="true" className="absolute hidden h-full w-1/2 bg-gray-100 lg:block" />
                    <div className="relative bg-gray-100 lg:bg-transparent">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
                            <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                                <div className="lg:pr-16">
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                                        {blok.title}
                                    </h1>
                                    <div className="mt-4 text-xl text-gray-600">
                                        {render(blok.content)}
                                    </div>
                                    <div className="mt-6">
                                        <Link href="/shop" legacyBehavior>
                                            <a
                                                className="inline-block rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:text-gray-900 hover:bg-gray-200"
                                            >
                                                {blok.button_label}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2 hero-img">
                        <Image
                            src={`${blok.image.filename + "/m/"}`}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="relative h-full w-full"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeroSection;
