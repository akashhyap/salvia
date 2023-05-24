import { useMutation, gql } from "@apollo/client";
import Link from "next/link";

const REGISTER_USER = gql`
  mutation registerUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    registerUser(
      input: {
        username: $email
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      user {
        databaseId
      }
    }
  }
`;

export default function SignUpForm() {
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const wasSignUpSuccessful = Boolean(data?.registerUser?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data);
    register({
      variables: values,
    }).catch(error => {
      console.error(error);
    });
  }

  if (wasSignUpSuccessful) {
    return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 xl:px-0">
        <h2 className="text-3xl mb-10">
          Congrates you have successfully signed up!
        </h2>
        <p>Please check your email – an account confirmation link has been sent to you.</p>
      </div>
    )
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 xl:px-0">
      <h1 className="text-5xl mb-10">Sign Up</h1>
      <form method="post" onSubmit={handleSubmit}>
        <fieldset disabled={loading} className="grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label htmlFor="sign-up-first-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
              <input id="sign-up-first-name"
                type="text"
                name="firstName"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div>
              <label htmlFor="sign-up-last-name" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
              <input id="sign-up-last-name"
                type="text"
                name="lastName" className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="sign-up-email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <input
              id="sign-up-email"
              type="email"
              name="email"
              autoComplete="username"
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="sign-up-pass" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <input
              id="sign-up-pass"
              type="password"
              name="password"
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {error ? (
            (error.message.includes('This username is already registered') ? (
              <p className="error-message">
                You&#39;re already signed up! <Link href="/log-in">Log in</Link>
              </p>
            ) : (
              <p className="error-message">{error.message}</p>
            ))
          ) : null}
          <div className="mt-2">
            <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </fieldset>
        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account? <Link href="/log-in"><a>Log in</a></Link>
        </p>
      </form>
    </div>
  );
}
