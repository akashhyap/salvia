import Nav from "./Nav";
import React, { ReactNode } from "react";

type HeaderProps = {
  siteLogo?: string;
  topInformationBar?: string;
};

export default function Header({ siteLogo, topInformationBar }: HeaderProps) {
  return (
    <div className="header bg-blue-300">
      <Nav siteLogo={siteLogo} topInformationBar={topInformationBar}/>
    </div>
  );
}
