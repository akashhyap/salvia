import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Link from "next/link";

const RESET_PASSWORD = gql`
  mutation resetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: {
        key: $key
        login: $login
        password: $password
      }
    ) {
      user {
        databaseId
      }
    }
  }
`;

interface Props {
  resetKey: string;
  login: string;
}

export default function SetPasswordForm({ resetKey: key, login }: Props) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [clientErrorMessage, setClientErrorMessage] = useState('');
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);
  const wasPasswordReset = Boolean(data?.resetUserPassword?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const isValid = validate();
    if (!isValid) return

    resetPassword({
      variables: {
        key,
        login,
        password,
      },
    }).catch(error => {
      console.error(error);
    });
  }

  function validate() {
    setClientErrorMessage('');

    const isPasswordLongEnough = password.length >= 5;
    if (!isPasswordLongEnough) {
      setClientErrorMessage('Password must be at least 5 characters.');
      return false;
    }

    const doPasswordsMatch = password === passwordConfirm;
    if (!doPasswordsMatch) {
      setClientErrorMessage('Passwords must match.');
      return false;
    }

    return true;
  }

  if (wasPasswordReset) {
    return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p>Your new password has been set.</p>
        <Link href="/log-in">
          <a className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6">Log in</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <h1 className="text-3xl mb-10">Reset your password</h1>
      <form method="post" onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <div className="mt-2">
            <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <input
              id="new-password"
              type="password"
              value={password}
              autoComplete="new-password"
              onChange={event => setPassword(event.target.value)}
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password-confirm" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
            <input
              id="password-confirm"
              type="password"
              value={passwordConfirm}
              autoComplete="new-password"
              onChange={event => setPasswordConfirm(event.target.value)}
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {clientErrorMessage ? (
            <p className="error-message">{clientErrorMessage}</p>
          ) : null}
          {error ? (
            <p className="error-message">{error.message}</p>
          ) : null}
          <div className="mt-2">
            <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {loading ? 'Saving...' : 'Save password'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
