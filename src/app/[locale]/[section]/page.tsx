// app/[locale]/[section]/page.tsx
import React from "react";
import Services from "@/app/Pages/ServicesPage";
import AboutPage from "@/app/Pages/AboutPage";
import InvestorRelationPage from "@/app/Pages/InvestorRelations";
import BusinessService from "@/app/Pages/BusinessService";
import EliteService from "@/app/Pages/EliteService";

export const dynamic = "force-static";

// ✅ Generate static params for each locale and section
export function generateStaticParams() {
  const locales = ["ar", "en"];
  const sections = ["about-mawarid", "services", "investor-relation", "business-service.html", "elite-service.html"];

  const params: { locale: string; section: string }[] = [];

  for (const locale of locales) {
    for (const section of sections) {
      params.push({ locale, section });
    }
  }

  return params;
}

// ✅ Dynamic server component for section pages
export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  const isRtl = locale === "ar";

  let Component: React.ReactNode;

  switch (section) {
    case "about-mawarid":
      Component = <AboutPage locale={locale as "ar" | "en"} />;
      break;

    case "services":
      Component = <Services locale={locale as "ar" | "en"} />;
      break;

    case "investor-relation":
      Component = <InvestorRelationPage locale={locale as "ar" | "en"} />;
      break;

   
    case "business-service.html": 
      Component = <BusinessService locale={locale as "ar" | "en"} />;
      break;

    case "elite-service.html":
      Component=<EliteService locale = {locale as "ar" | "en"}/>
      break;

    default:
      Component = (
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
          <p className="mt-4 text-lg text-gray-500">
            The section <code>{section}</code> does not exist.
          </p>
        </div>
      );
      break;
  }

  return <div dir={isRtl ? "rtl" : "ltr"}>{Component}</div>;
}
