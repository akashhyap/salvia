import Head from "next/head";
import React, { ReactNode } from "react";
import Nav from "./Nav";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
  siteLogo?: string;
  topInformationBar?: string;
};

// @ts-ignore
export default function Layout({ children, story }) {
  // console.log("layout story", story);

  return (
    <>
      <Head>
        <title>Salvia Extract</title>
        <meta name="description" content="" />
      </Head>
      {/* @ts-ignore */}
      <Header blok={story?.content} />
      <main>{children}</main>
      <Footer blok={story?.content} />
    </>
  );
}
