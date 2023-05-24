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
    <>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gray-900 pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}

                <div className="space-y-6 px-4 pb-6 pt-2">
                  <div className="flow-root border-t border-gray-50 pt-3">
                    {/* @ts-ignore */}
                    {blok?.header_menu.map((nestedBlok) => (
                      <div onClick={() => setOpen(false)} key={nestedBlok._uid}>
                        <StoryblokComponent blok={nestedBlok} />
                      </div>
                    ))}
                  </div>

                  {!loggedIn ? (
                    <div className="flow-root border-t border-gray-50 pt-3">
                      <Link href="/log-in">
                        <a className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg text-base text-white hover:text-gray-900" onClick={() => setOpen(false)}>Log In</a>
                      </Link>
                      <Link href="/sign-up">
                        <a className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg text-base text-white hover:text-gray-900" onClick={() => setOpen(false)}>Sign Up</a>
                      </Link>
                    </div>
                  ) : (
                    <div className="flow-root border-t border-gray-50 pt-3">
                      <Link href="/members">
                        <a className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg text-base text-white hover:text-gray-900" onClick={() => setOpen(false)}>Members</a>
                      </Link>
                      <Link href="/log-out">
                        <a className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg text-base text-white hover:text-gray-900" onClick={() => setOpen(false)}>Log Out</a>
                      </Link>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          {blok?.topInformationBar}
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-6 xl:px-0">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-900 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 lg:ml-0 basis-40 p-7">
                <Link href="/" legacyBehavior>
                  <a className="order-2">
                    <Image
                      src={blok?.logo.filename}
                      alt="Salvia Extract"
                      layout="responsive"
                      width={300}
                      height={139}
                    />
                  </a>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {/* @ts-ignore */}
                  {blok?.header_menu.map((nestedBlok) => (
                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!loggedIn ? (
                    <>

                      <Link href="/log-in">
                        <a className="flex items-center text-sm text-gray-900 hover:text-gray-800">Log In
                        </a>
                      </Link>
                      <Link href="/sign-up">
                        <a className="flex items-center text-sm text-gray-900 hover:text-gray-800">Sign Up</a>
                      </Link>

                    </>
                  ) : (
                    <>
                      <Link href="/members">
                        <a className="flex items-center text-sm text-gray-900 hover:text-gray-800">Members</a>
                      </Link>
                      <Link href="/log-out">
                        <a className="flex items-center text-sm text-gray-900 hover:text-gray-800">Log Out</a>
                      </Link>
                    </>
                  )}
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
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
          </div>
        </nav>
      </header>
    </>
  );
}
