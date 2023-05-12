import Link from "next/link";
import { useMutation, gql } from "@apollo/client";
import Cookies from 'js-cookie';
import { GET_USER } from "../hooks/useAuth";
import { useCart, CartItem } from "./cart/CartContext";
import { useAddToCart } from "../hooks/useAddToCart";
import { Variation } from "../pages/products/[slug]";

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
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="text-5xl mb-10">Log In</h1>
      <form method="post" onSubmit={handleSubmit} className="space-y-6">
        <fieldset disabled={loading}>
          <div>
            <label htmlFor="log-in-email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="mt-2">
              <input
                id="log-in-email"
                type="email"
                name="email"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="log-in-password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link href="/forgot-password">
                  <a className="forgot-password-link">Forgot password?</a>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="log-in-password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {!isEmailValid ? (
            <p className="error-message">Invalid email. Please try again.</p>
          ) : null}
          {!isPasswordValid ? (
            <p className="error-message">Invalid password. Please try again.</p>
          ) : null}

          <div className="mt-5">
            <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
