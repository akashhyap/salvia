import { gql } from "@apollo/client";
import Layout from "../components/Layout";
import { client } from "../lib/apolloClient";

import UnAuthContent from "../components/UnAuthContent";
import LogInForm from "../components/LogInForm";
import { GET_SITE_LOGO, GET_OPTIONS } from '../lib/graphql';

interface Params {
  uri: string;
  databaseId: string;
}
interface PageProps {
  siteLogo: string;
  topInformationBar?: string
}

export default function LogIn({ siteLogo, topInformationBar }: PageProps) {
  return (
    <Layout siteLogo={siteLogo} topInformationBar={topInformationBar}>
      <h1>Log In</h1>
      <UnAuthContent>
        <LogInForm />
      </UnAuthContent>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: Params }) {
  const [siteLogoResponse, topInformationBarResponse] = await Promise.all([
    client.query({ query: GET_SITE_LOGO }),
    client.query({ query: GET_OPTIONS }),
  ])
  const siteLogo = siteLogoResponse?.data?.getHeader?.siteLogoUrl;
  const topInformationBar = topInformationBarResponse?.data?.options?.topInformationBar?.informationBar;

  return {
    props: {
      siteLogo,
      topInformationBar,
    },
    revalidate: 60,
  };
}
