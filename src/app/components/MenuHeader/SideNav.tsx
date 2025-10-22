"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { FaBars, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function MenuHeaderButtons() {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as "ar" | "en";
  const isArabic = locale === "ar";

  const closeNav = () => setOpen(false);

  const labels = {
    ar: [
      { text: "عن الموارد" },
      { text: "الخدمات" },
      { text: "الإنجازات" },
      { text: "تواصل معنا" },
      { text: "علاقات المستثمرين" },
    ],
    en: [
      { text: "ABOUT ALMAWARID" },
      { text: "SERVICES" },
      { text: "ACHIEVEMENTS" },
      { text: "CONTACT US" },
      { text: "INVESTOR RELATIONS" },
    ],
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} >
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center text-[#fdbd3f] text-2xl"
      >
        <FaBars />
      </button>

      {/* Sidebar Menu (Always rendered, only moved in/out) */}
      <div
        className={`absolute -top-8 ${
          isArabic ? "-right-4" : "-left-4"
        } w-[200px] bg-[#595c5e] text-white z-50 shadow-lg 
        transform transition-transform duration-[1000ms]
        ${open ? "translate-x-0" : isArabic ? "translate-x-full" : "-translate-x-full"}`}
      >
        <div className="p-4 flex flex-col gap-5">
          {/* Close Button */}
          <button
            onClick={closeNav}
            className={`text-[#fdbd3f] text-2xl ${
              isArabic ? "self-start" : "self-end"
            }`}
          >
            {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
          </button>

          {/* Navigation */}
          <nav className="flex flex-col gap-7 text-sm font-bold pb-6">
            {labels[locale].map((item, index) => (
              <div key={index} className="flex flex-col gap-3">
                <a
                  href="#"
                  onClick={closeNav}
                  className="hover:text-[#fdbd3f]"
                >
                  {item.text}
                </a>
                <div className="bg-[#fdbd3f] w-full h-0.5"></div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

