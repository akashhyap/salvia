import {
    useStoryblokState,
    getStoryblokApi,
    StoryblokComponent,
} from "@storyblok/react";
import { useState } from 'react'
import { sendContactForm } from "../lib/api";


const initValues = { name: "", email: "", subject: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Contact() {
    const [state, setState] = useState(initState);
    const [touched, setTouched] = useState({});

    const { values, isLoading, error } = state;
    // @ts-ignore
    const onBlur = ({ target }) =>
        setTouched((prev) => ({ ...prev, [target.name]: true }));
    // @ts-ignore
    const handleChange = ({ target }) =>
        setState((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                [target.name]: target.value,
            },
        }));
    // @ts-ignore
    const onSubmit = async (event) => {
        event.preventDefault();
        setState((prev) => ({
            ...prev,
            isLoading: true,
        }));
        try {
            await sendContactForm(values);
            setTouched({});
            setState(initState);
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                // @ts-ignore
                error: error.message,
            }));
        }
    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 xl:px-0">
            <h1 className="text-5xl mb-10">Contact</h1>
            {error && <p className="text-red-500 my-4 text-xl">{error}</p>}

            <form onSubmit={onSubmit} className="space-y-4">
                {error && (
                    <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                        <span className="text-xl inline-block mr-5 align-middle">
                            <i className="fas fa-bell" />
                        </span>
                        <span className="inline-block align-middle mr-8">
                            <b className="capitalize">Error!</b> {error}
                        </span>
                    </div>
                )}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                        value={values.name}
                        onBlur={onBlur}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                        value={values.email}
                        onBlur={onBlur}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                        value={values.subject}
                        onBlur={onBlur}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
                    <textarea
                        name="message"
                        id="message" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                        value={values.message}
                        onBlur={onBlur}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className={`flex w-full justify-center rounded-full bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${isLoading || !values.name || !values.email || !values.subject || !values.message
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-200 hover:text-gray-900"
                            }`}
                        disabled={isLoading || !values.name || !values.email || !values.subject || !values.message}
                    >
                        {isLoading ? "Sending..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

// @ts-ignore
export async function getStaticProps({ params }) {
    let slug = params?.slug ? params?.slug.join("/") : "home";
    let sbParams = {
        version: "draft", // or 'published'
        resolve_links: "url",
    };
    const storyblokApi = getStoryblokApi();
    // @ts-ignore
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    let { data: config } = await storyblokApi.get("cdn/stories/config");

    return {
        props: {
            story: data ? data.story : false,
            key: data ? data.story.id : false,
            config: config ? config.story : false,
        },
        revalidate: 3600,
    };
}