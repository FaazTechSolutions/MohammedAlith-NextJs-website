'use client';
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function BaseFooter() {
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";

  const pathname = usePathname();

  // --- Conditional background ---
  // White on '/' or '/en' or '/ar', gray otherwise
  const isWhiteBg = pathname === "/" || pathname === `/${locale}`;
  const bgClass = isWhiteBg ? "bg-white" : "basefooter";

  // --- Hide footer on investor relation page ---
  const hideFooter = pathname?.includes("investor-relation");
  if (hideFooter) return null;

  const links = isArabic
    ? [
        { href: "/about-mawarid", label: "عن الموارد" },
        { href: "/services", label: "الخدمات" },
        { href: "#Achievements", label: "الإنجازات" },
        { href: "#Contactus", label: "تواصل معنا" },
        { href: "/investor-relation", label: "علاقات المستثمرين" },
      ]
    : [
        { href: "/about-mawarid", label: "ABOUT ALMAWARID" },
        { href: "/services", label: "SERVICES" },
        { href: "#Achievements", label: "ACHIEVEMENTS" },
        { href: "#Contactus", label: "CONTACT" },
        { href: "/investor-relation", label: "INVESTOR RELATIONS" },
      ];

  return (
    <div id="ContactUs"
      dir={isArabic ? "rtl" : "ltr"}
      className={`px-18 py-8 base-footer container m-auto ${bgClass}`}
    >
      <ul className={`w-1/6 font-Medium ${isArabic ? "text-right" : "text-left"}`}>
        {links.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.label}</a>
            <div className="h-[2px] theme-bgcolor w-full mt-2"></div>
          </li>
        ))}
      </ul>
      <div className="mt-12 address">
        <p className="mb-1">{isArabic ? "13211 الرياض، الروضة" : "13211 Riyadh , Alrawdah"}</p>
        <p className="mb-1">920027202</p>
        <p>
          <a href="mailto:info@mawarid.com.sa">info@mawarid.com.sa</a>
        </p>
      </div>
    </div>
  );
}
