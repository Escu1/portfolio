"use client";
import HanabiHome from "../hanabi/src/app/page";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../hanabi/src/assets/moderniz/Moderniz.otf",
});

import { useEffect } from "react";

export default function HanabiCupPage() {
  useEffect(() => {
    document.body.classList.add("hanabi-cup-override");
    return () => {
      document.body.classList.remove("hanabi-cup-override");
    };
  }, []);
  return (
    <div className={myFont.className}>
      <HanabiHome />
    </div>
  );
}
