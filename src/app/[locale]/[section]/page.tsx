import React from "react";
import Services from "@/app/Pages/ServicesPage";
import AboutPage from "@/app/Pages/AboutPage";
import InvestorRelationPage from "@/app/Pages/InvestorRelations";
import BusinessService from "@/app/Pages/BusinessService";
import EliteService from "@/app/Pages/EliteService";
import BusinessRequestForm from "@/app/Pages/BusinessRequestForm";

export const dynamic = "force-static";

// ✅ Generate all static paths for locales & sections
export function generateStaticParams() {
  const locales = ["ar", "en"];
  const sections = [
    "about-mawarid.html",
    "services.html",
    "investor-relation.html",
    "business-service",
    "elite-service",
    "business-request-form",
  ];

  const params: { locale: string; section: string }[] = [];

  for (const locale of locales) {
    for (const section of sections) {
      params.push({ locale, section });
    }
  }

  return params;
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  const isRtl = locale === "ar";

  let Component: React.ReactNode;

  switch (section) {
    case "about-mawarid.html":
      Component = <AboutPage locale={locale as "ar" | "en"} />;
      break;

    case "services.html":
      Component = <Services locale={locale as "ar" | "en"} />;
      break;

    case "investor-relation.html":
      Component = <InvestorRelationPage locale={locale as "ar" | "en"} />;
      break;

    case "business-service":
      Component = <BusinessService locale={locale as "ar" | "en"} />;
      break;

    case "elite-service":
      Component = <EliteService locale={locale as "ar" | "en"} />;
      break;

    case "business-request-form":
      Component = <BusinessRequestForm  />;
      break;

    default:
      Component = (
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold text-red-600">
            404 - Page Not Found
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            The section <code>{section}</code> does not exist.
          </p>
        </div>
      );
      break;
  }

  return <div dir={isRtl ? "rtl" : "ltr"}>{Component}</div>;
}
