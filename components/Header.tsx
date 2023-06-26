import Nav from "./Nav";
import React, { ReactNode } from "react";

// @ts-ignore
export default function Header({ blok }) {
  return (
    <div className="header relative flex flex-wrap sm:justify-start sm:flex-nowrap z-30 w-full text-sm bg-blue-300">
      {/* @ts-ignore */}
      <Nav blok={blok} />
    </div>
  );
}
