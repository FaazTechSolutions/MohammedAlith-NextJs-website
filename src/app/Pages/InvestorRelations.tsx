import React from "react";
import { InvestorRelation } from "../lib/api";
import InvestorTabs from "../components/investortabs";
import { InvestorItem } from "../components/investorSection";

export default async function InvestorRelationPage({ locale }: { locale: "ar" | "en" }) {
  // Fetch data from API
  const data: InvestorItem[] = await InvestorRelation({ locale });

  return <InvestorTabs locale={locale} news={data} reports={[]} investorContacts={[]} />;
}
