import Link from "next/link";
import { Fragment, useState, useEffect } from 'react';

import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

import useAuth from "../hooks/useAuth";
import { useCart } from "./cart/CartContext";
import Image from "next/image";

import { StoryblokComponent } from "@storyblok/react";


function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

// @ts-ignore
export default function Nav({ blok }) {
  const { loggedIn } = useAuth();
  const { cartCount, updateCartData } = useCart();
  const [open, setOpen] = useState(false)

  // console.log("nav blok", blok);

  useEffect(() => {
    updateCartData();
  }, [loggedIn, updateCartData]);

  return (
    <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
      <div className="flex items-center justify-between">
        <div className="ml-4 lg:ml-0">
          {blok?.logo ? (
            <Link href="/" legacyBehavior>
              <a className="relative py-2 inline-block">
                <Image
                  src={blok.logo.filename}
                  alt="Salvia Extract"
                  width={175}
                  height={60}
                  objectFit="contain"
                />
              </a>
            </Link>
          ): (
            "SalviaExtract"
          )}
        </div>
        <div className="sm:hidden">
          <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-basic" aria-controls="navbar-collapse-basic" aria-label="Toggle navigation">
            <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
            <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>
      <div id="navbar-collapse-basic" className="hidden basis-full h-full grow sm:flex">
        <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:w-full sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
          {/* @ts-ignore */}
          {blok?.header_menu.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}

          {!loggedIn ? (
            <div className="lg:ml-auto flex flex-col gap-5 sm:flex-row sm:basis-full sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <Link href="/log-in">
                <a className="flex items-center h-full hover:bg-gray-200 px-3 py-2 text-base hover:text-gray-900 text-black">Log In
                </a>
              </Link>
              <Link href="/sign-up">
                <a className="flex items-center h-full hover:bg-gray-200 px-3 py-2 text-base hover:text-gray-900 text-black">Sign Up</a>
              </Link>
            </div>
          ) : (
            <div className="lg:ml-auto flex flex-col gap-5 sm:flex-row sm:basis-full sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <Link href="/members">
                <a className="flex items-center h-full hover:bg-gray-200 px-3 py-2 text-base hover:text-gray-900 text-black">Members</a>
              </Link>
              <Link href="/log-out">
                <a className="flex items-center h-full hover:bg-gray-200 px-3 py-2 text-base hover:text-gray-900 text-black">Log Out</a>
              </Link>
            </div>
          )}

          {/* Cart */}
          <div className="flow-root lg:ml-6 pb-5 lg:pb-0 pl-3">
            <Link href="/cart" legacyBehavior passHref>
              <a className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                  className="h-6 w-6 flex-shrink-0 text-gray-900 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm text-gray-900 group-hover:text-gray-700">{cartCount}</span>
                <span className="sr-only">items in cart, view bag</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
