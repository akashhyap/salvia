import Image from "next/image";
import React, { ReactNode } from "react";
import { render } from "storyblok-rich-text-react-renderer";


// @ts-ignore
export default function Newsletter({ blok }) {
    // console.log("Newsletter story", blok);

    return (
        <>
            <div className="flex items-center rounded-lg bg-gray-100 p-6 sm:p-10">
                <div className="mx-auto max-w-sm">
                    <h3 className="font-semibold text-gray-900">{blok.leftTitle}</h3>
                    <div className="mt-2 [&>p]:text-sm &>p]:text-gray-500">{render(blok?.leftText)}</div>
                    <form className="mt-4 sm:mt-6 sm:flex">
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        {/* @ts-ignore */}
                        <input id="email-address" type="text" autoComplete="email" required="" className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                        <div className="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                            <button type="submit" className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="relative mt-6 flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <Image
                        src={blok?.bgimage.filename}
                        alt="Salvia Extract"
                        layout="fill"
                        className="h-full w-full object-cover object-center saturate-0 filter"
                    />
                    <div className="absolute inset-0 bg-indigo-600 bg-opacity-90"></div>
                </div>
                <div className="relative mx-auto max-w-sm text-center">
                    <h3 className="text-2xl font-bold tracking-tight text-white">{blok.rightTitle}</h3>
                    <div className="mt-2 [&>p]:text-gray-200">
                        {render(blok?.rightText)}
                    </div>
                </div>
            </div>
        </>
    );
}
