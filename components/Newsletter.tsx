import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";

import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { sanitize } from "../lib/sanitize";
import Loading from "./Loading"; 

// @ts-ignore
export default function Newsletter({ blok }) {
    // console.log("Newsletter story", blok);
    const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);

    /**
     * Handle form submit.
     *
     * @return {{value}|*|boolean|null}
     */
    const handleFormSubmit = () => {

        setError(null);

        if (!email) {
            // @ts-ignore
            setError('Please enter a valid email address');
            return null;
        }
        // @ts-ignore
        const isFormValidated = onValidated({ EMAIL: email });

        // On success return true
        // @ts-ignore
        return email && email.indexOf("@") > -1 && isFormValidated;
    }

    /**
     * Handle Input Key Event.
     *
     * @param event
     */
    // @ts-ignore
    const handleInputKeyEvent = (event) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleFormSubmit();
        }
    }

    /**
     * Extract message from string.
     *
     * @param {String} message
     * @return {null|*}
     */
    // @ts-ignore
    const getMessage = (message) => {
        if (!message) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ("0" !== result?.[0]?.trim()) {
            return sanitize(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? sanitize(formattedMessage) : null;
    }

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
                                <>
                                    <form className="mt-4 sm:mt-6 sm:flex">
                                        <label htmlFor="email-address" className="sr-only">Email address</label>
                                        {/* @ts-ignore */}
                                        <input id="email-address" type="text" autoComplete="email" required="" className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            // @ts-ignore
                                            onChange={(event) => setEmail(event?.target?.value ?? '')}
                                            onKeyUp={(event) => handleInputKeyEvent(event)}
                                        />
                                        <div className="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                                            <button type="submit" className="rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm bg-gray-900 hover:bg-gray-300 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                                onClick={handleFormSubmit}
                                            >Sign up</button>
                                        </div>
                                        <div className="min-h-42px">
                                            {'sending' === status ? <Loading showSpinner message="Sending..." contentColorClass="text-white" hasVisibilityToggle={false} /> : null}
                                            {'error' === status || error ? (
                                                <div
                                                    className="text-red-700 pt-2"
                                                    dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
                                                />
                                            ) : null}
                                            {/* @ts-ignore */}
                                            {'success' === status && 'error' !== status && !error && (
                                                <div className="text-green-200 font-bold pt-2" dangerouslySetInnerHTML={{ __html: sanitize(message) }} />
                                            )}
                                        </div>
                                    </form>
                                </>
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
