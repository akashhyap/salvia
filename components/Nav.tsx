import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { StoryblokComponent } from "@storyblok/react";
import Image from 'next/image'
import useAuth from "../hooks/useAuth";
import { useCart } from "./cart/CartContext";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

// @ts-ignore
export default function Nav({ blok }) {
  console.log("nav", blok);

  const [open, setOpen] = useState(false);
  const { loggedIn } = useAuth();
  const { cartCount, updateCartData } = useCart();

  return (
    <div className="w-full bg-white">
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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* @ts-ignore */}
                  {blok?.header_menu.map((nestedBlok) => {
                    return (
                      <Fragment key={nestedBlok._uid}>
                        {nestedBlok.component !== "dropdown" && <div onClick={() => setOpen(false)}>
                          <StoryblokComponent blok={nestedBlok} />
                        </div>}
                      </Fragment>
                    )
                  })}

                  {/* @ts-ignore */}
                  {blok?.header_menu.map((nestedBlok) => {
                    return (
                      <Fragment key={nestedBlok._uid}>
                        {nestedBlok.component === "dropdown" &&
                          <>
                            <div className='font-medium text-gray-900'>
                              {nestedBlok.label}
                            </div>
                            <div>
                              <ul
                                role="list"
                                aria-labelledby={`desktop-featured-heading-${nestedBlok._uid}`}
                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                              >
                                {/* @ts-ignore */}
                                {nestedBlok.submenu.map((item) => (
                                  <li key={item.label} className="flex" onClick={() => setOpen(false)}>
                                    <Link href={item.link.cached_url} legacyBehavior>
                                      <a className="text-gray-500">
                                        {item.label}
                                      </a>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>

                        }

                      </Fragment>
                    )
                  })}
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {!loggedIn ? (
                    <>
                      <div className="flow-root">
                        <Link href="/sign-up">
                          <a className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setOpen(false)}>
                            Create an account
                          </a>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link href="/log-in">
                          <a className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setOpen(false)}>
                            Sign in
                          </a>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="flow-root">
                      <Link href="/log-out">
                        <a className="text-sm font-medium text-gray-900 hover:text-gray-100" onClick={() => setOpen(false)}>Log Out</a>
                      </Link>
                    </div>
                  )
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 xl:pr-0">
              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                {blok?.topInformationBar}
              </p>

              <div className="hidden lg:flex flex-1 lg:items-center lg:justify-end space-x-6">
                {!loggedIn ? (
                  <>
                    <Link href="/sign-up">
                      <a className="text-sm font-medium text-white hover:text-gray-100">
                        Create an account
                      </a>
                    </Link>
                    <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                    <Link href="/log-in">
                      <a className="text-sm font-medium text-white hover:text-gray-100">
                        Log In
                      </a>
                    </Link>
                  </>
                ) : (
                  <Link href="/log-out">
                    <a className="text-sm font-medium text-white hover:text-gray-100">Log Out</a>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-blue-300 border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 lg:px-0">
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="relative hidden lg:flex basis-40 p-7">
                  <Link href="/" legacyBehavior>
                    <a>
                      <span className="sr-only">Your Company</span>
                      <Image
                        src={blok?.logo.filename}
                        alt="Salvia Extract"
                        layout="fill"
                        objectFit='contain'
                      />
                    </a>
                  </Link>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Mega menus */}
                  <Popover.Group className="ml-8">
                    <div className="flex h-full justify-center space-x-8">
                      {/* @ts-ignore */}
                      {blok?.header_menu.map((nestedBlok) => {
                        return (
                          <Fragment key={nestedBlok._uid}>
                            {nestedBlok.component !== "dropdown" && <StoryblokComponent blok={nestedBlok} />}
                          </Fragment>
                        )
                      })}

                      {/* @ts-ignore */}
                      {blok?.header_menu.map((nestedBlok) => {
                        // console.log("nestedBlok", nestedBlok);
                        return (
                          <Fragment key={nestedBlok._uid}>
                            {nestedBlok.component === "dropdown" &&
                              <Popover key={nestedBlok._uid} className="flex">
                                {({ open, close }) => (
                                  <>
                                    <div className="relative flex">
                                      <Popover.Button
                                        className={classNames(
                                          open
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-900 hover:text-gray-900',
                                          'relative z-10 -mb-px flex items-center border-b-2 pt-px text-base font-medium transition-colors duration-200 ease-out'
                                        )}
                                      >
                                        {nestedBlok.label} <ChevronDownIcon className="h-6 w-6 text-gray-900" />
                                      </Popover.Button>

                                      <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                      >
                                        <Popover.Panel className="absolute left-0 top-full text-gray-500 sm:text-sm">
                                          <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                          <div className="relative bg-white px-4 py-4 w-56">
                                            <ul
                                              role="list"
                                              aria-labelledby={`desktop-featured-heading-${nestedBlok._uid}`}
                                              className="space-y-6 sm:space-y-4"
                                            >
                                              {/* @ts-ignore */}
                                              {nestedBlok.submenu.map((item) => (
                                                <li key={item.label} className="flex">
                                                  <Link href={item.link.cached_url} legacyBehavior>
                                                    <a className="hover:text-gray-800" onClick={close}>
                                                      {item.label}
                                                    </a>
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </Popover.Panel>
                                      </Transition>
                                    </div>
                                  </>
                                )}

                              </Popover>
                            }
                          </Fragment>
                        )
                      })}
                    </div>
                  </Popover.Group>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Logo (lg-) */}
                <div className="lg:hidden basis-40 p-7">
                  <Link href="/" legacyBehavior>
                    <a>
                      <span className="sr-only">Your Company</span>
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

                <div className="flex flex-1 items-center justify-end">
                  <div className="flex items-center lg:ml-8">
                    <div className="flex space-x-8">
                      {/* <div className="hidden lg:flex">
                          <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div> */}

                      {loggedIn && <div className="flex">
                        <Link href="/sign-up">
                          <a className="-m-2 p-2 text-gray-900 hover:text-gray-500">
                            <span className="sr-only">Account</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </Link>
                      </div>}
                    </div>

                    {loggedIn && <span className="mx-4 h-6 w-px bg-gray-50 lg:mx-6" aria-hidden="true" />}

                    {/* Cart */}
                    <div className="flow-root">
                      <Link href="/cart" legacyBehavior passHref>
                        <a className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon
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
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
