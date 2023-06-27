import { Tab, Disclosure } from '@headlessui/react'
import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

// @ts-ignore
const ProductFullDescription = ({ product }) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const tabs = [
        'Description',
        product.productDescription?.effectsContent && 'Effects',
        product.productDescription?.usageAndDosageContent && 'Usage and Dosage',
        product.productDescription?.faqContent && 'FAQ',
        product.productDescription?.shippingContent && 'Shipping'
    ].filter(Boolean);

    // @ts-ignore
    const sanitize = (content) => DOMPurify.sanitize(content);
    return (

        <div className="max-w-7xl mx-auto px-6 xl:px-0 mt-16 md:mb-20 lg:mb-28">
            {product.description === null ? (
                <>
                    {/* Mobile view - Accordion */}
                    <div className="sm:hidden">
                        {tabs.map((tab) => (
                            <Disclosure as="div" key={tab} className="mb-2">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-blue-300 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-blue-300 focus-visible:ring-opacity-75">
                                            <span>{tab}</span>
                                            <ChevronDownIcon
                                                className={`ml-3 h-5 w-5 text-gray-500 ${open ? 'transform rotate-180' : ''}`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                            {tab === 'Description' &&
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: sanitize(product.productDescription?.descriptionContent) }}
                                                    className="product-description"
                                                />
                                            }
                                            {tab === 'Effects' &&
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: sanitize(product.productDescription?.effectsContent) }}
                                                    className="product-description"
                                                />
                                            }
                                            {tab === 'Usage and Dosage' &&
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: sanitize(product.productDescription?.usageAndDosageContent) }}
                                                    className="product-description"
                                                />
                                            }
                                            {tab === 'FAQ' &&
                                                // @ts-ignore
                                                product.productDescription?.faqContent?.map((faq, index) => (
                                                    <div key={index} className="border-b border-gray-200">
                                                        <button
                                                            className="flex justify-between items-center w-full py-3"
                                                            onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                                        >
                                                            <p className="font-semibold">{faq.question}</p>
                                                            <span>{openAccordion === index ? '-' : '+'}</span>
                                                        </button>
                                                        {openAccordion === index && (
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: sanitize(faq.answer),
                                                                }}
                                                                className="product-description"
                                                            />
                                                        )}
                                                    </div>
                                                ))
                                            }
                                            {tab === 'Shipping' &&
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: sanitize(product.productDescription?.shippingContent) }}
                                                    className="product-description"
                                                />
                                            }
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                    {/* Desktop view - Tabs */}
                    <div className="hidden sm:block">
                        <Tab.Group>
                            <Tab.List className="flex p-1 space-x-1 bg-blue-300 rounded-md">
                                <Tab className="py-2.5 px-3">Description</Tab>
                                {product.productDescription?.effectsContent && <Tab className="py-2.5 px-3">Effects</Tab>}
                                {product.productDescription?.usageAndDosageContent && <Tab className="py-2.5 px-3">Usage and Dosage</Tab>}
                                {product.productDescription?.faqContent && <Tab className="py-2.5 px-3">FAQ</Tab>}
                                {product.productDescription?.shippingContent && <Tab className="py-2.5 px-3">Shipping</Tab>}
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel className="p-4 text-gray-900">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(product.productDescription?.descriptionContent),
                                        }}
                                        className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                                    ></div>
                                </Tab.Panel>

                                {product.productDescription?.effectsContent && <Tab.Panel className="p-4 text-gray-900">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(product.productDescription?.effectsContent),
                                        }}
                                        className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                                    ></div>
                                </Tab.Panel>}

                                {product.productDescription?.usageAndDosageContent && <Tab.Panel className="p-4 text-gray-900">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(product.productDescription?.usageAndDosageContent),
                                        }}
                                        className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                                    ></div>
                                </Tab.Panel>}

                                {product.productDescription?.faqContent && <Tab.Panel className="p-4 text-gray-900">
                                    {/* @ts-ignore */}
                                    {product.productDescription?.faqContent?.map((faq, index) => (
                                        <div key={index} className="border-b border-gray-200">
                                            <button
                                                className="flex justify-between items-center w-full py-3"
                                                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                            >
                                                <p className="font-semibold">{faq.question}</p>
                                                <span>{openAccordion === index ? '-' : '+'}</span>
                                            </button>
                                            {openAccordion === index && (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(faq.answer),
                                                    }}
                                                    className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </Tab.Panel>}

                                {product.productDescription?.shippingContent && <Tab.Panel className="p-4 text-gray-900">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(product?.productDescription?.shippingContent),
                                        }}
                                        className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                                    />
                                </Tab.Panel>}
                            </Tab.Panels>
                        </Tab.Group>
                    </div >
                </>) : (
                <div className="flex">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product?.description),
                        }}
                        className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                    >
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFullDescription;
