"use client";

import { ReactNode } from "react";
import { I18nProvider } from "../lib/i18n/context";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import PageTransition from "./PageTransition";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </I18nProvider>
  );
}
