import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { storyblokInit, apiPlugin } from "@storyblok/react";

import { client } from "../lib/apolloClient";
import { AuthProvider } from "../hooks/useAuth";
import { CartProvider } from "../components/cart/CartContext";
import { useEffect } from "react";

import Layout from "../components/Layout";
import Page from "../components/Page";
import Content from "../components/Content";
import ImageTextSection from "../components/ImageTextSection";
import MainTitle from "../components/MainTitle";
import AllArticles from "../components/AllArticles";
import Article from "../components/Article";
import Menu from "../components/Menu";
import Submenu from "../components/Submenu";
import Dropdown from "../components/Dropdown";
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
import KratomWiki from "../components/KratomWiki";
import Delta from "../components/Delta";
import SalviaTripReport from "../components/SalviaTripReport";
import Media from "../components/Media";
import CbdComponent from "../components/CbdComponent";

import "../styles/globals.css";

const components = {
  page: Page,
  menu: Menu,
  submenu: Submenu,
  h1Title: MainTitle,
  content: Content,
  imageTextSection: ImageTextSection,
  "all-articles": AllArticles,
  Article,
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
  "salvia-trip-report": SalviaTripReport,
  cbd: CbdComponent,
  media: Media,
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOKINIT,
  use: [apiPlugin],
  components,
});


export default function MyApp({ Component, pageProps }: AppProps) {

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
