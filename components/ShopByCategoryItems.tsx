import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const ShopByCategoryItems = ({ blok }) => {
    // console.log("ShopByCategoryItems:", blok);

    return (
        <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg xl:aspect-none xl:relative xl:h-full">
            <figure className="group-hover:opacity-75 xl:inset-0 xl:h-full xl:w-full">
                <Image
                    src={blok.image.filename}
                    alt=""
                    layout="fill"
                    className="object-cover object-center"
                />
            </figure>
            <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-70 xl:absolute xl:inset-0"
            />
            <div className="flex items-end p-6 xl:absolute xl:inset-0">
                <div>
                    <h3 className="text-2xl font-semibold text-white">
                        <Link href={blok.link.cached_url}>
                            <a>
                                <span className="absolute inset-0" />
                                {blok.title}
                            </a>
                        </Link>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                        Shop now
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShopByCategoryItems;
