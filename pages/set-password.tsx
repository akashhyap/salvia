import { useRouter } from "next/router";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import SetPasswordForm from "../components/SetPasswordForm";

export default function SetPassword() {
  const router = useRouter();
  const resetKey = String(router.query.key || '');
  const login = String(router.query.login || '');

  return (
    <>
      <h1>Set Password</h1>
      <SetPasswordForm resetKey={resetKey} login={login} />
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