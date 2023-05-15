import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import { GET_USER } from "../hooks/useAuth";
import { client } from "../lib/apolloClient";
import Link from "next/link";

const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

export default function LogOut() {
  const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [
      { query: GET_USER }
    ],
    awaitRefetchQueries: true,
  });
  const loggedOut = Boolean(data?.logout?.status);

  useEffect(() => {
    const logOutAndResetStore = async () => {
      try {
        await logOut();
        await client.resetStore();
      } catch (error) {
        console.error("Error logging out and resetting store:", error);
      }
    };

    logOutAndResetStore();
  }, [logOut]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
      {!called || loading ? (
        <p className="text-xl">Logging out...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : !loggedOut ? (
        <p>Unable to log out. Please reload the page and try again.</p>
      ) : (
        <>
          <h1 className="text-xl">You have been logged out.</h1>
          <p className="mt-6">
            <Link href="/" legacyBehavior>
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </p>
        </>

      )}
    </div>
  );
}

// @ts-ignore
export async function getStaticProps({ params }) {
  // @ts-ignore
  let slug = params?.slug ? params?.slug.join("/") : "home";
  let sbParams = {
    version: "draft", // or 'published'
    resolve_links: "url",
  };
  const storyblokApi = getStoryblokApi();
  // @ts-ignore
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  let { data: config } = await storyblokApi.get("cdn/stories/config");

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false,
    },
  };
}