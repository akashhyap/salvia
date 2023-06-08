import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";
import { GET_PRODUCT_BY_DATABASE_ID } from "../lib/graphql";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";

import { useAddToCart } from "../hooks/useAddToCart";
import { useCart } from "./cart/CartContext";
import { useState } from "react";

// @ts-ignore
const WooProductId = ({ blok }) => {
    const { productId } = blok;

    const { loading, error, data } = useQuery(GET_PRODUCT_BY_DATABASE_ID, {
        variables: { id: productId },
    });

    // Context hooks
    const addToCart = useAddToCart();
    const { addItem, cartCount, setCartCount, cartItems, setCartItems } = useCart();

    // Local states
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    // Display loading, error, or data
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const product = data.product;

    // @ts-ignore
    const handleAddToCart = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        try {
            const productId = product.databaseId;  // Retrieve database ID directly from product
            if (!productId) {
                console.error('Product ID is null or undefined');
                return;
            }
            setAdding(true);
            const cartItem = await addToCart(productId, null);
            // Use the addItem function from CartContext
            addItem(cartItem);
            setAdding(false);

            setTimeout(() => {
                setAdded(false);
            }, 2000);  // Reset the added state after 2 seconds
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            setAdding(false);
        }
    };

    const buttonText = added ? 'Added to cart' : adding ? 'Adding...' : 'Add to cart';

    return (
        <div className="relative">
            {product?.image && <div className="relative">
                <Link href={`/products/${product?.slug}`} legacyBehavior>
                    <a>
                        <figure className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <Image
                                src={product?.image?.sourceUrl ?? ""}
                                alt="Image product"
                                layout="fill"
                                className="object-contain object-center"
                            />
                        </figure>
                    </a>
                </Link></div>}
            <div className="relative mt-4">
                <h3 className="text-sm font-medium text-gray-900 lg:h-10">
                    <Link href={`/products/${product?.slug}`} legacyBehavior>
                        {product.name}
                    </Link>
                </h3>
                <p className="text-sm text-gray-500">{product.price}</p>

                {product.node?.type !== "VARIABLE" ? (
                    <div className="mt-6">
                        <button
                            className="relative w-full flex items-center justify-center rounded-full border border-transparent bg-gray-900 px-8 py-2 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-200"
                            onClick={handleAddToCart}
                        >
                            {buttonText}
                        </button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <Link href={`/products/${product.node?.slug}`} legacyBehavior>
                            <a className="relative flex items-center justify-center rounded-full border border-transparent bg-gray-900 px-8 py-2 text-sm font-medium text-white  hover:text-gray-900 hover:bg-gray-200">
                                Select Option
                            </a>
                        </Link>
                    </div>
                )}
            </div>

        </div>

    );
};

export default WooProductId;