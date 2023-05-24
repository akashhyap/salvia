import { useState } from 'react';
import { sanitize } from "../lib/sanitize";
import Loading from "./Loading";

 {/* @ts-ignore */}
const NewsletterForm = ({ status, message, onValidated }) => {

    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);

    /**
     * Handle form submit.
     *
     * @return {{value}|*|boolean|null}
     */
    const handleFormSubmit = () => {

        setError(null);

        if (!email) {
            // @ts-ignore
            setError('Please enter a valid email address');
            return null;
        }

        const isFormValidated = onValidated({ EMAIL: email });

        // On success return true
        // @ts-ignore
        return email && email.indexOf("@") > -1 && isFormValidated;
    }

    /**
     * Handle Input Key Event.
     *
     * @param event
     */

    // @ts-ignore
    const handleInputKeyEvent = (event) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleFormSubmit();
        }
    }

    /**
     * Extract message from string.
     *
     * @param {String} message
     * @return {null|*}
     */
    // @ts-ignore
    const getMessage = (message) => {
        if (!message) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ("0" !== result?.[0]?.trim()) {
            return sanitize(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? sanitize(formattedMessage) : null;
    }

    return (
        <>
            <div className="mt-4 sm:mt-6 sm:flex">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                {/* @ts-ignore */}
                <input id="email-address" type="text" autoComplete="email" required="" className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    // @ts-ignore
                    onChange={(event) => setEmail(event?.target?.value ?? '')}
                    onKeyUp={(event) => handleInputKeyEvent(event)}
                />
                <div className="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button type="submit" className="rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm bg-gray-900 hover:bg-gray-300 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                        onClick={handleFormSubmit}
                    >Sign up</button>
                </div>
            </div>
            <div className="min-h-42px">
                {'sending' === status ? <Loading showSpinner message="Sending..." contentColorClass="text-white" hasVisibilityToggle={false} /> : null}
                {'error' === status || error ? (
                    <div
                        className="text-red-700 pt-2"
                        dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
                    />
                ) : null}
                {/* @ts-ignore */}
                {'success' === status && 'error' !== status && !error && (
                    <div className="text-green-600 font-semibold pt-2" dangerouslySetInnerHTML={{ __html: sanitize(message) }} />
                )}
            </div>
        </>
    );
}

export default NewsletterForm