import { getMessages } from "../lib/api";
import ServicesSection from "../components/serviceSection";
import { useLocale } from "next-intl";
import { ServicePageItem } from "../components/serviceSection";

export interface ServicePageProps {
  services: ServicePageItem[];
}

export default async function Services({ locale }: { locale: 'ar' | 'en' }) {
  const data = await getMessages(locale);
  const items = data?.result?.Data || [];

  const service1 = items.filter(
    (item: any) => item.WorkItemType === 'Service' && item.ParentId === 54
  );

  console.log("service1", service1);

  return (
    <div>
      
      <ServicesSection  serviceItems={service1}  />
    </div>
  );
}
