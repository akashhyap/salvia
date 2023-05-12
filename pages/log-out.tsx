import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import { GET_USER } from "../hooks/useAuth";
import { client } from "../lib/apolloClient";

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
    <>
      <h1>Log Out</h1>
      {!called || loading ? (
        <p>Logging out...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : !loggedOut ? (
        <p>Unable to log out. Please reload the page and try again.</p>
      ) : (
        <p>You have been logged out.</p>
      )}
    </>
  );
}

// @ts-ignore
export async function getStaticProps({params}) {
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