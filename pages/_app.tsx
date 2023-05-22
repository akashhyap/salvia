import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { storyblokInit, apiPlugin } from "@storyblok/react";

import { client } from "../lib/apolloClient";
import { AuthProvider } from "../hooks/useAuth";
import { CartProvider } from "../components/cart/CartContext";
import { useEffect } from "react";

import Layout from "../components/Layout";
import Page from "../components/Page";
import HeroSection from "../components/HeroSection";
import Content from "../components/Content";
import ImageTextSection from "../components/ImageTextSection";
import MainTitle from "../components/MainTitle";
import AllArticles from "../components/AllArticles";
import Article from "../components/Article";
import Menu from "../components/Menu";
import FooterColumn from "../components/FooterColumn";
import FooterMenu from "../components/FooterMenu";
import Newsletter from "../components/Newsletter";
import About from "../components/About";
import FAQ from "../components/FAQ";
import FaqItems from "../components/FaqItems";
import TrendingProducts from "../components/TrendingProducts";

import "../styles/globals.css";

const components = {
  page: Page,
  menu: Menu,
  h1Title: MainTitle,
  content: Content,
  imageTextSection: ImageTextSection,
  "all-articles": AllArticles,
  Article,
  HeroSection,
  footerColumn: FooterColumn,
  footerMenu: FooterMenu,
  newsletter: Newsletter,
  about: About,
  faq: FAQ,
  faqItems: FaqItems,
  trendingProducts: TrendingProducts,
}

storyblokInit({
  accessToken: "ueQ2wRv7HHABAaVO3Rr1lAtt",
  use: [apiPlugin],
  components,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    import("preline");
  }, []);
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          {/* @ts-ignore */}
          <Layout story={pageProps.config}>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
