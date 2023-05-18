import Nav from "./Nav";
import React, { ReactNode } from "react";

// @ts-ignore
export default function Header({ blok }) {
  return (
    <div className="header bg-blue-300">
      {/* @ts-ignore */}
      <Nav blok={blok} />
    </div>
  );
}
