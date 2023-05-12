import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

import UnAuthContent from "../components/UnAuthContent";
import SignUpForm from "../components/SignUpForm";

// @ts-ignore
export default function SignUp({ story }) {
  return (
    <>
      <UnAuthContent>
        <SignUpForm />
      </UnAuthContent>
    </>
  );
}

// @ts-ignore
export async function getStaticProps({ params }) {
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
    revalidate: 3600,
  };
}