import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const About = ({ blok }) => {
    // console.log("Inner page about:", blok);

    return (
        <div>
            {/* Testimonial section */}
            <div className="relative z-10 mt-32 mb-32 bg-gray-900 pb-20 sm:pb-24 xl:pb-0">
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
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
                    <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                        <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                            <img
                                className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                                src={blok.image.filename}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:pl-10 xl:py-14">
                        <div className="relative isolate py-6">
                            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">{blok.title}</h2>
                            <div className="text-xl font-semibold leading-8 text-white sm:leading-9">
                                {render(blok.content)}
                                <Link href={blok.link.cached_url} legacyBehavior>
                                   <a>More...</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
