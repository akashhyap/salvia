import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";

//@ts-ignore
const ProductFullDescription = ({ product }) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    return (
        <div className="max-w-7xl mx-auto px-6 xl:px-0 mt-16 md:mb-20 lg:mb-28">
            {product.description === null ? (
                <>
                    <select id="tab-select" className="sm:hidden py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" aria-label="Tabs">
                        <option value="#hs-tab-to-select-1">Description</option>
                        <option value="#hs-tab-to-select-2">FAQ</option>
                        <option value="#hs-tab-to-select-3">Shipping</option>
                    </select>
                    <div className="hidden sm:block border-b border-gray-200">
                        <nav className="flex space-x-2" aria-label="Tabs" role="tablist" data-hs-tab-select="#tab-select">
                            <button type="button" className="hs-tab-active:bg-gray-900 hs-tab-active:border-b-transparent hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-200 text-sm font-medium text-center border text-gray-900 rounded-t-lg hover:bg-gray-900 hover:text-white active" id="hs-tab-to-select-item-1" data-hs-tab="#hs-tab-to-select-1" aria-controls="hs-tab-to-select-1" role="tab">
                                Description
                            </button>
                            <button type="button" className="hs-tab-active:bg-gray-900 hs-tab-active:border-b-transparent hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-200 text-sm font-medium text-center border text-gray-900 rounded-t-lg hover:bg-gray-900 hover:text-white" id="hs-tab-to-select-item-2" data-hs-tab="#hs-tab-to-select-2" aria-controls="hs-tab-to-select-2" role="tab">
                                FAQ
                            </button>
                            <button type="button" className="hs-tab-active:bg-gray-900 hs-tab-active:border-b-transparent hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-200 text-sm font-medium text-center border text-gray-900 rounded-t-lg hover:bg-gray-900 hover:text-white" id="hs-tab-to-select-item-3" data-hs-tab="#hs-tab-to-select-3" aria-controls="hs-tab-to-select-3" role="tab">
                                Shipping
                            </button>
                        </nav>
                    </div>
                    <div className="py-5">
                        <div id="hs-tab-to-select-1" role="tabpanel" aria-labelledby="hs-tab-to-select-item-1">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(product.productDescription.descriptionContent),
                                }}
                                className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                            ></div>
                        </div>
                        <div id="hs-tab-to-select-2" className="hidden" role="tabpanel" aria-labelledby="hs-tab-to-select-item-2">
                            {/* @ts-ignore */}
                            {product.productDescription.faqContent.map((faq, index) => (
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
                        </div>
                        <div id="hs-tab-to-select-3" className="hidden" role="tabpanel" aria-labelledby="hs-tab-to-select-item-3">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(product.productDescription.shippingContent),
                                }}
                                className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product.description),
                        }}
                        className="product-description mb-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:py-4 [&>p]:text-lg [&>p]:py-4 [&>p]:leading-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:leading-8 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:leading-8"
                    >
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductFullDescription;