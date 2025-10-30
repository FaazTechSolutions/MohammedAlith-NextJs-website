"use client";
import Achievements from "../Acievement/Achievements";
import React from "react";
import Sidenav from "./SideNav";
import Link from "next/link";
import { useLocale,  } from "next-intl";
import { usePathname } from "next/navigation";



export default function MenuHeader() {
  const locale = useLocale() as "ar" | "en";


  const pathname = usePathname() ?? "/";
  const otherLocale = locale === "ar" ? "en" : "ar";



  // compute swap path robustly
  let newPath = pathname;
  if (pathname.startsWith(`/${locale}/`)) {
    newPath = pathname.replace(`/${locale}/`, `/${otherLocale}/`);
  } else if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    newPath = `/${otherLocale}`;
  } else {
    // fallback: switch to root of other locale
    newPath = `/${otherLocale}`;
  }

  const texts = {
    aboutMawarid: locale === "ar" ? "عن الموارد" : "ABOUT MAWARID",
    services: locale === "ar" ? "الخدمات" : "SERVICES",
    achievement: locale === "ar" ? "الإنجازات" : "ACHIEVEMENT",
    contact: locale === "ar" ? "تواصل معنا" : "CONTACT US",
    investor: locale === "ar" ? "علاقات المستثمرين" : "INVESTOR RELATIONS",
    language: otherLocale === "ar" ? "ع" : "En",
    profile: locale === "ar" ? "الملف التعريفي" : "Profile",
  };

  return (
    <div className="w-screen bg-white sticky top-0 z-10">
    <div className="flex sm:flex-shrink-1 px-4 xl:px-6 justify-between items-center py-6  bg-white  w-screen container mx-auto">
      {/* Mobile menu */}
      <div className="pt-3 xl:hidden relative">
        <Sidenav />
      </div>

      {/* Logo - use Link and locale prop */}
      <div>
          <Link href={`/${locale}` }>
          <img
            src="https://mawarid.com.sa/assets/images/logo.png"
            alt="logo"
            width={130}
            height={130}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden xl:block ">
      
        <ul className="flex gap-4 h-full items-center justify-center w-full text-sm font-bold pt-2 ">
          <li className="hover:text-[#fdbd3f] flex gap-3">
            {/* internal route - use Link and locale */}
            <Link href={`/${locale}/about-mawarid`} locale={locale}>{texts.aboutMawarid}</Link>
            <div className="bg-[#fdbd3f] w-1" />
          </li>

          <li className="hover:text-[#fdbd3f] flex gap-3">
            <Link href={`/${locale}/services`} locale={locale}>{texts.services}</Link>
            <div className="bg-[#fdbd3f] w-1" />
          </li>

        <li className="hover:text-[rgb(253,189,63)] flex gap-3">
            <Link href={`/${locale}#Achievements`}>{texts.achievement}</Link>
            <div className="bg-[#fdbd3f] w-1" />
          </li>

          <li className="hover:text-[#fdbd3f] flex gap-3">
            <Link href={`/${locale}#ContactUs`}>{texts.contact}</Link>
            <div className="bg-[#fdbd3f] w-1" />
          </li>

          <li className="hover:text-[#fdbd3f] flex gap-3">
            <Link href={`/${locale}/investor-relation`} locale={locale}>{texts.investor}</Link>
          </li>
        </ul>
        
      </div>

      {/* Buttons */}
      <div className="flex gap-1 xl:gap-2 h-full items-center pt-2">
        {/* Language switch - Link to newPath and pass locale */}
        <Link href={newPath} locale={otherLocale}>
          <button className="bg-[#fdbd3f] border-2 hover:bg-transparent border-[#fdbd3f] px-2 text-center xl:px-2 xl:py-1">
            {texts.language}
          </button>
        </Link>

        {/* Profile - external PDF, keep anchor */}
        <a href="https://mawarid.com.sa/assets/MawaridProfile2025%20-%20English.pdf" target="_blank" rel="noopener noreferrer">
          <button className="bg-[#fdbd3f] border-2 hover:bg-transparent border-[#fdbd3f] px-1 xl:py-1 text-center xl:text-center">
            {texts.profile}
          </button>
        </a>
      </div>
    </div>
    </div>
  );
}
