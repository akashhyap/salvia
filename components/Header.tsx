import Nav from "./Nav";
import React, { ReactNode } from "react";

type logo = {
  siteLogo?: string;
};

export default function Header({siteLogo}:logo) {
  return (
    <div className="header bg-blue-300">
      <Nav siteLogo={siteLogo}/>
    </div>
  );
}
