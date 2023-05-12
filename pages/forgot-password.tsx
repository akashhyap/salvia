import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import UnAuthContent from "../components/UnAuthContent";
import SendPasswordResetEmailForm from "../components/SendPasswordResetEmailForm";

export default function ForgotPassword() {
  return (
    <>
      <h1>Forgot Your Password?</h1>
      <UnAuthContent>
        <SendPasswordResetEmailForm />
      </UnAuthContent>
    </>
  )
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