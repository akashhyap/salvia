import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";

import MailchimpSubscribe from 'react-mailchimp-subscribe'

import NewsletterForm from './NewsletterForm';


// @ts-ignore
export default function Newsletter({ blok }) {
    // console.log("Newsletter story", blok);
    const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL

    return (
        <>
            <div className="flex items-center rounded-lg bg-gray-200 p-6 sm:p-10">
                <div className="mx-auto max-w-sm">
                    <h3 className="font-semibold text-gray-900">{blok.leftTitle}</h3>
                    <div className="mt-2 [&>p]:text-sm &>p]:text-gray-500">{render(blok?.leftText)}</div>

                    <MailchimpSubscribe
                        // @ts-ignore
                        url={MAILCHIMP_URL}
                        // @ts-ignore
                        render={(props) => {
                            const { subscribe, status, message } = props || {};
                            return (
                                <NewsletterForm
                                    status={status}
                                    message={message}
                                    // @ts-ignore
                                    onValidated={formData => subscribe(formData)}
                                />
                            )
                        }}
                    >
                    </MailchimpSubscribe>
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
                    <div className="absolute inset-0 bg-gray-900"></div>
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
