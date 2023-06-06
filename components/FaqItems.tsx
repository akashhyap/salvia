import Link from "next/link";
import { render } from "storyblok-rich-text-react-renderer";

import { useRouter } from "next/router";

import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// @ts-ignore
const FaqItems = ({ blok }) => {
  // console.log('blok link', blok);

  return (
    <Disclosure as="div" key={blok.question} className="pt-2">
      {({ open }) => (
        <>
          <dt>
            <Disclosure.Button className={`${blok.whiteText ? "text-white" : "text-black"
              } flex w-full items-start justify-between text-left`}>
              <span className="text-base font-semibold leading-7">{blok.question}</span>
              <span className="ml-6 flex h-7 items-center">
                {open ? (
                  <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-2">
            <div className={`${blok.faqItemBg} ${blok.faqItemPadding} ${blok.whiteText ? "text-gray-300" : "text-black"} text-base leading-7 break-words`}>{render(blok.answer)}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default FaqItems;
