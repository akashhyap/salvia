import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import ScrollToTopButton from "./ScrollToTopButton";

// @ts-ignore
const Footer = ({ blok }) => {
    // console.log("footer", blok);
    return (
        <footer aria-labelledby="footer-heading" className="bg-white mt-5">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 xl:px-0">
                <div className="border-t border-gray-200">
                    <div className="pb-20 pt-16">
                        {/* Logo */}
                        <div className="md:flex md:justify-center">
                            {blok?.logo ? (
                                <Link href="/" legacyBehavior>
                                    <a className="relative w-36 h-10">
                                        <Image
                                            src={blok?.logo.filename}
                                            alt="Salvia Extract"
                                            layout="fill"
                                        />
                                    </a>
                                </Link>
                            ) : (
                                "SalviaExtract"
                            )}
                        </div>
                        {/* Menu */}
                        <div className="mx-auto mt-16 max-w-5xl xl:grid xl:gap-8">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {/* @ts-ignore */}
                                {blok?.footer.map((nestedBlok) => (
                                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Newsletter */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
                        {/* @ts-ignore */}
                        {blok?.newsletterBlock.map((nestedBlok) => (
                            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                        ))}
                    </div>
                </div>
                {/* Copyright section */}
                <div className="py-10 md:flex md:items-center md:justify-between">
                    <div className="text-center md:text-left [&>p]:text-sm [&>p]:text-gray-500">
                        {render(blok?.copyright)}
                    </div>

                    <div className="mt-4 flex items-center justify-center md:mt-0">
                        <div className="flex space-x-8">
                            <ul role="list" className="flex space-x-8">
                                {/* @ts-ignore */}
                                {blok?.footerBottom.map((nestedBlok) => (
                                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollToTopButton/>
        </footer>
    );
};

export default Footer;
