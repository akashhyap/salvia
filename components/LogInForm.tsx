import Link from "next/link";
import { useMutation, gql } from "@apollo/client";
import Cookies from 'js-cookie';
import { GET_USER } from "../hooks/useAuth";
import { useCart, CartItem } from "./cart/CartContext";
import { useAddToCart } from "../hooks/useAddToCart";
import { Variation } from "../pages/products/[slug]";

import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: {
      login: $login
      password: $password
    }) {
      status
    }
  }
`;

export default function LogInForm() {
  const { updateCartData, setUserLoggedIn, setCartItems } = useCart();
  const addToCart = useAddToCart();
  // LogInForm component

  const [logIn, { loading, error }] = useMutation(LOG_IN, {
    refetchQueries: [
      { query: GET_USER }
    ],
    async onCompleted() {
      // Merge local storage cart items with server-side cart items
      const localCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (localCartItems.length) {
        await Promise.all(
          localCartItems.map(async (item: CartItem) => {
            await addToCart(parseInt(item.product.node.id), item.variation ? (item.variation.node as Variation) : null, item.quantity);
          })
        );
        // Clear local storage cart items after merging
        localStorage.removeItem("cartItems");
      }
      // Update cart data after login
      await updateCartData();
    },
  });


  const errorMessage = error?.message || '';
  const isEmailValid =
    !errorMessage.includes('empty_email') &&
    !errorMessage.includes('empty_username') &&
    !errorMessage.includes('invalid_email') &&
    !errorMessage.includes('invalid_username');
  const isPasswordValid =
    !errorMessage.includes('empty_password') &&
    !errorMessage.includes('incorrect_password');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(data);
    logIn({
      variables: {
        login: email,
        password,
      }
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 xl:px-0">
      <h1 className="text-5xl mb-10">Log In</h1>
      <form method="post" onSubmit={handleSubmit} className="space-y-6">
        <fieldset disabled={loading}>
          <div>
            <label htmlFor="logEmail" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="relative mt-2">
              <input
                id="logEmail"
                type="email"
                name="email"
                autoComplete="username"
                required
                className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!isEmailValid ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300" : ""}`}
              />
              {!isEmailValid ? (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="logPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link href="/forgot-password">
                  <a className="forgot-password-link">Forgot password?</a>
                </Link>
              </div>
            </div>
            <div className="relative mt-2">
              <input
                id="logPassword"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!isPasswordValid ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300" : ""}`}
              />
              {!isPasswordValid ? (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              ) : null}
            </div>
          </div>

          {!isEmailValid ? (
            <p className="mt-2 text-sm text-red-600">Invalid email. Please try again.</p>
          ) : null}
          {!isPasswordValid ? (
            <p className="mt-2 text-sm text-red-600">Invalid password. Please try again.</p>
          ) : null}

          <div className="mt-5">
            <button type="submit" disabled={loading} className="flex w-full justify-center rounded-full bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-200 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </fieldset>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&#39;t have an account yet? {" "}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </p>
      </form>
    </div>
  );
}
