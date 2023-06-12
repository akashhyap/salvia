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
import ShopByCategory from "../components/ShopByCategory";
import ShopByCategoryItems from "../components/ShopByCategoryItems";
import HeroSectionV2 from "../components/HeroSectionV2";
import Table from "../components/Table";
import YouTube from "../components/YouTube";
import WooProductId from "../components/WooProductId";
import WooProduct from "../components/WooProduct";
import News from "../components/News";
import Salvia from "../components/Salvia";
import SalviaDivinorum from "../components/SalviaDivinorum";
import Blog from "../components/Blog";
import Dropdown from "../components/Dropdown";
import KratomWiki from "../components/KratomWiki";
import Delta from "../components/Delta";
import CBD from "../components/CBD";

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
  HeroSectionV2,
  footerColumn: FooterColumn,
  footerMenu: FooterMenu,
  newsletter: Newsletter,
  about: About,
  faq: FAQ,
  faqItems: FaqItems,
  trendingProducts: TrendingProducts,
  shopByCategory: ShopByCategory,
  shopByCategoryItems: ShopByCategoryItems,
  table: Table,
  youtube: YouTube,
  "woo-product-id": WooProductId,
  "woo-product": WooProduct,
  news: News,
  salvia: Salvia,
  "salvia-divinorum": SalviaDivinorum,
  blog: Blog,
  dropdown: Dropdown,
  "kratom-wiki": KratomWiki,
  "delta-8": Delta,
  cbd: CBD,
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://staticw2.yotpo.com/${process.env.APP_KEY}/widget.js`; // Replace APP_KEY with your Yotpo app key
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
