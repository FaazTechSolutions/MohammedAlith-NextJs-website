"use client"
import { useLocale } from "next-intl";

export default function FooterBottom() {
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";
  console.log("locale:", locale, "isArabic:", isArabic);

  return (
    <div 
    className="footer bg-[#54585b] text-white py-4 w-screen px-6 md:px-18">
      <div
        className={`container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 ${
          isArabic ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Left / Right text */}
        <div className="text-center md:text-left md:text-sm">
          <a href="#" className="text-white">
          { isArabic
  ? "جميع الحقوق محفوظة 2023 ©"
  : "© Copyright 2023 All Rights Reserved"
}
          </a>
        </div>

        {/* Centered social icons */}
        <div className="flex justify-center items-center gap-5">
          <a
            href="https://x.com/MawaridManpower"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://mawarid.com.sa/assets/images/MawridWebsite2023-13.png"
              alt="twitter"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.instagram.com/mawarid.manpower/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://mawarid.com.sa/assets/images/MawridWebsite2023-14.png"
              alt="instagram"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/mawarid-manpower-solutions-company-riyadh-saudi-arabia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://mawarid.com.sa/assets/images/MawridWebsite2023-15.png"
              alt="linkedin"
              width={20}
              height={20}
            />
          </a>
          <a href="#">
            <img
              src="https://mawarid.com.sa/assets/images/MawridWebsite2023-16.png"
              alt="youtube"
              width={20}
              height={20}
            />
          </a>
        </div>

        {/* Logo */}
        <div className="text-center md:text-right">
          <img
            src="https://mawarid.com.sa/assets/images/MawridWebsite2023-12.png"
            alt="logo"
            width={130}
            height={130}
          />
        </div>
      </div>
    </div>
  );
}
