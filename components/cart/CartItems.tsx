import { useState, useEffect } from 'react';
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import { useMutation } from '@apollo/client';

import { useCart, CartItem } from './CartContext';
import { client } from '../../lib/apolloClient';
import {
    FETCH_CART_ITEMS,
    UPDATE_CART_ITEM,
    REMOVE_CART_ITEM,
    CLEAR_CART,
} from '../../lib/apiService';

import { v4 } from "uuid";
import CheckoutButton from './CartButton';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';

type CartProduct = {
    id: string;
    name: string;
    price: string;
};

const CartItems = () => {
    const { cartItems, setCartItems, userLoggedIn, updateCartData, cartCount, setCartCount, removeItem } = useCart();
    const [fetchedCartItems, setFetchedCartItems] = useState<CartItem[]>([]);

    const [requestError, setRequestError] = useState(null);


    useEffect(() => {
        const fetchCartItems = async () => {
            const { data } = await client.query({ query: FETCH_CART_ITEMS });
            console.log("Server cart items:", data.cart.contents.nodes);
            if (userLoggedIn) {
                await updateCartData();
                setFetchedCartItems(data.cart.contents.nodes);
            } else {
                setFetchedCartItems(cartItems);
            }
        };
        if (userLoggedIn) {
            fetchCartItems();
        } else {
            setFetchedCartItems(cartItems);
        }
    }, [setFetchedCartItems, userLoggedIn, cartItems, updateCartData]);

    const handleIncrement = async (itemId: string) => {
        const item = fetchedCartItems.find((item) => item.key === itemId);

        if (!item) return;
        const { data } = await client.mutate({
            mutation: UPDATE_CART_ITEM,
            variables: { items: itemId, quantity: item.quantity + 1 },
        });
        const updatedItems = fetchedCartItems.map((item) => {
            console.log("cart updatedItems", item);

            return (
                item.key === itemId
                    ? {
                        ...item,
                        quantity: data.updateItemQuantities.items[0].quantity,
                        total: data.updateItemQuantities.items[0].total.replace("$", ""),
                    }
                    : item
            )
        }

        );
        setFetchedCartItems(updatedItems);
        if (!userLoggedIn) {
            setCartItems(updatedItems);
        }
    };
    const handleDecrement = async (itemId: string) => {
        const item = fetchedCartItems.find((item) => item.key === itemId);
        if (!item || item.quantity <= 1) return;
        const { data } = await client.mutate({
            mutation: UPDATE_CART_ITEM,
            variables: { items: itemId, quantity: item.quantity - 1 },
        });
        const updatedItems = fetchedCartItems.map((item) =>
            item.key === itemId
                ? {
                    ...item,
                    quantity: data.updateItemQuantities.items[0].quantity,
                    total: data.updateItemQuantities.items[0].total.replace("$", ""),
                }
                : item
        );
        setFetchedCartItems(updatedItems);
        if (!userLoggedIn) {
            setCartItems(updatedItems);
        }
    };
    // const { removeItem } = useCart();
    const handleDelete = async (itemId: string) => {
        await client
            .mutate({
                mutation: REMOVE_CART_ITEM,
                variables: { cartKey: itemId },
            })
            .catch((error) => {
                console.error("Error while deleting item:", error);
            });
        setFetchedCartItems((prevItems) => prevItems.filter((item) => item.key !== itemId));
        removeItem(itemId);
    };
    // const { setCartCount } = useCart();
    const handleClearCart = async () => {
        if (userLoggedIn) {
            const cartItemKeys = fetchedCartItems.map((item) => item.key);

            // Debug logs
            console.log("fetchedCartItems:", fetchedCartItems);
            console.log("cartItemKeys:", cartItemKeys);

            if (cartItemKeys.length === 0) {
                console.log("No items in cart to remove.");
                return;
            }

            try {
                const { data } = await client.mutate({
                    mutation: CLEAR_CART,
                    variables: {
                        input: {
                            clientMutationId: v4(),
                            keys: cartItemKeys,
                        },
                    },
                });

                // Debug log
                console.log("Mutation response:", data);

                setFetchedCartItems([]);
                setCartCount(0);
            } catch (error) {
                console.error("Error clearing cart:", error);
            }
        } else {
            // Clear the local cart for non-logged-in users
            setFetchedCartItems([]);
            setCartItems([]);
            setCartCount(0);
        }
    };

    // console.log("fetchedCartItems",fetchedCartItems);
    // Calculate total cost
    // @ts-ignore
    const totalCost = fetchedCartItems.reduce((total, item) => {
        console.log("item", item);

        // @ts-ignore
        const itemTotal = parseFloat(item.total.replace('$', ''));
        return total + itemTotal;
    }, 0);
    // console.log("cost", totalCost);

    return (
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0'>
            <h1 className="text-5xl mb-10">Shopping Cart</h1>
            {fetchedCartItems.length > 0 ? (<div>
                <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                    {fetchedCartItems.map((item) => {
                        // @ts-ignore
                        // console.log("product item", item);
                        return (
                            <li key={item.key} className="flex py-6 sm:py-10" data-item={item.key}>
                                <div className="relative flex-shrink-0 basis-24 overflow-hidden">
                                    <Image
                                        // @ts-ignore
                                        src={item.product.node.image.sourceUrl}
                                        // @ts-ignore
                                        alt={item.product.node.image.title}
                                        layout='responsive'
                                        width={1}
                                        height={1}
                                        className="rounded-lg object-cover object-center"
                                    />
                                </div>

                                <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div>
                                        <div className="flex justify-between sm:grid sm:grid-cols-2">
                                            <div className="pr-6">
                                                <h3 className="text-sm">
                                                    {/* @ts-ignore */}
                                                    <Link href={`products/${item.product.node.slug}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                        {item.product.node.name}
                                                    </Link>
                                                </h3>
                                                {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                    {item.size ? <p className="mt-1 text-sm text-gray-500">{item.size}</p> : null} */}
                                            </div>
                                            {/* @ts-ignore */}
                                            <p className="text-right text-sm font-medium text-gray-900">${item.total.replace("$", "")}</p>
                                        </div>

                                        <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                                            <div>
                                                <button className='px-2' onClick={() => handleIncrement(item.key)}>+</button>
                                                <span className="text-right text-sm font-medium text-gray-900">{item.quantity}</span>
                                                <button className='px-2' onClick={() => handleDecrement(item.key)}>-</button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item.key)}
                                                className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                                            >
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                {/* Order summary */}
                <div className="mt-10 sm:ml-32 sm:pl-6">
                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                        <h2 className="sr-only">Order summary</h2>
                        <div className="flow-root">
                            <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                <div className="flex items-center justify-between py-4">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">${totalCost.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="mt-10">
                        <CheckoutButton />
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>
                            or {" "}
                            <Link href="/shop" legacyBehavior>
                                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>

            </div>) : (
                <p>No items in the Cart</p>
            )}
        </div>
    );
};

export default CartItems;
