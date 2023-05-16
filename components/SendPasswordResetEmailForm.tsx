import { useMutation, gql } from "@apollo/client";

const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation SendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      clientMutationId
    }
  }
`;

export default function SendPasswordResetEmailForm() {
  const [sendPasswordResetEmail, { loading, error, data }] = useMutation(
    SEND_PASSWORD_RESET_EMAIL
  );
  const wasEmailSent = Boolean(data?.sendPasswordResetEmail?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { email } = Object.fromEntries(data);
    sendPasswordResetEmail({
      variables: {
        username: email,
      }
    }).catch(error => {
      console.error(error);
    });
  }

  if (wasEmailSent) {
    return (
      <p>Please check your email. A password reset link has been sent to you.</p>
    );
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form method="post" onSubmit={handleSubmit}>
        <p>
          Enter the email associated with your account and you&#39;ll be sent a link
          to reset your password.
        </p>
        <fieldset disabled={loading}>
          <div className="my-4">
            <label htmlFor="password-reset-email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <input
              id="password-reset-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {error ? (
            <p className="error-message">{error.message}</p>
          ) : null}
          <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {loading ? 'Sending...' : 'Send password reset email'}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
