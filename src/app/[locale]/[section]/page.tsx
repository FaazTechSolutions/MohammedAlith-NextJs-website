// import other sections as needed
import Services from "@/app/Pages/ServicesPage";
export const dynamic = "force-static";


export function generateStaticParams() {
  const locales = ["ar", "en"];
  const sections = ["about", "services","investor-relation" ];

  const params: { locale: string; section: string }[] = [];
  locales.forEach((locale) => {
    sections.forEach((section) => {
      params.push({ locale, section });
    });
  });
  return params;
}

// Server component for dynamic section pages
export default async function SectionPage({
  params,
}: {
  params: { locale: string; section: string };
}) {
  const { locale, section } = params;
  const isRtl = locale === "ar";

  let Component: React.ReactNode;

  switch (section) {
    case "about":
      // Component = locale === "ar" ? <AboutAr /> : <AboutEn />;
      break;

    case "services":
      Component = <Services locale={locale as "ar" | "en"} />;
      break;

       case "investor-relation":
      // Component = <Services locale={locale as "ar" | "en"} />;
      break;

    // Add other sections:
    // case "contact": ...
    // case "signIn": ...
    default:
      Component = (
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
          <p className="mt-4 text-lg text-gray-500">
            The section <code>{section}</code> does not exist.
          </p>
        </div>
      );
  }

  return <div dir={isRtl ? "rtl" : "ltr"}>{Component}</div>;
}
