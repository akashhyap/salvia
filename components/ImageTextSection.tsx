import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { render } from "storyblok-rich-text-react-renderer";
// @ts-ignore
const ImageTextSection = ({ blok }) => {
    console.log("ImageTextSection", blok);
    console.log("imageMoveRight", blok.imageMoveRight);
    let image = blok.image.filename + "/m/";

    return (
        <div className="image-text-section py-5">
            <div className={`flex flex-col w-full text-md md:text-lg ${blok.containerLayout ? "max-w-6xl m-auto" : "w-full"}`}>
                <div className="mb-5 [&>h2]:text-3xl">
                    {render(blok.headline)}
                </div>
                <div className="flex flex-col lg:flex-row px-6 lg:px-0">
                    <div className={`relative lg:flex-1 mb-10 lg:mb-0 p-7 ${blok.imageMoveRight ? "order-2" : "order-1"}`}>
                        <Image
                            src={image}
                            alt=""
                            layout="fill"
                            className="w-full object-contain"
                        />
                    </div>
                    <div className={`lg:flex-1 ${!blok.imageMoveRight ? "order-2" : "order-1"}`}>
                        {render(blok.content)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageTextSection;
