import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

// @ts-ignore
const Dropdown = ({ blok }) => {
    console.log("dropdown", blok);

    return (
        <div className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] lg:flex lg:items-center h-full">
            <button id="hs-mega-menu-basic-dr" type="button" className="flex items-center h-full hover:bg-gray-200 px-3 py-2 text-base hover:text-gray-900 text-black">
                <span>{blok?.label}</span>
                <svg className="ml-2 w-2.5 h-2.5 text-gray-900" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-white sm:shadow-md rounded-md p-2 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5">
                {/* @ts-ignore */}
                {blok.submenu.map((nestedBlok) => (
                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                ))}
            </div>
        </div>
    );
};
export default Dropdown;
