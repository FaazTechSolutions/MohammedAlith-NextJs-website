// app/page.tsx
import React from 'react';
import Home from './Pages/Home';
import Header from "./components/Header/Header";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import BaseFooter from "./components/BaseFooter";
import FooterBottom from "./components/Footer";

export default function RootPage() {
  return (
    <>
     <main lang="ar" dir="rtl" className="bg-white text-gray-900">
      <Header />
      <MenuHeader />
     
        <Home locale="ar" />
     
      <BaseFooter />
      <FooterBottom />
      </main>
    </>
  );
}