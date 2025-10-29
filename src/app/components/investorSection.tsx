"use client";
import React from "react";
import Reports from "./reports";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

export interface InvestorItem {
  Title: string;
  Description: string;
  NewsDate: string;
  order: number;
  Link1?: string | null; // For news
}

interface Props {
  locale: "ar" | "en";
  items?: InvestorItem[];
  type?: "news" | "reports"|"investor-Contacts"|"Email Subscription";
}

export default function InvestorSection({ locale, items = [], type = "news" }: Props) {
  // const reports = [
  //   {
  //     Title: locale=='ar'?"عرض موارد للمستثمر Q2 2025": "Mawarid Investor Presentation Q2 2025",
  //     Date: "2025-08-17",
  //     FileLink: "https://mawarid.com.sa/assets/Mawarid.Investor.Presentation.Q2.2025.Execution.Copy.as.of.17.08.25._vfinal.pdf",
  //     Button: locale=='ar'?"تحميل":"Download"
  //   },
  // ];

  const InvestorContacts = [
    {
     Question:locale=='ar'?"إذا كان لديك أي سؤال أو تعليق حول شركة الموارد، يرجى الاتصال بعلاقات المستثمرين:":"If you have any question or comment about Ma'aden and its operations, please contact investor relations",
      Title:locale=='ar'?"شركة الموارد للقوى البشرية":"Mawarid manpower company",
      Address:locale=='ar'?"13211 الرياض، الروضة":"13211 Riyadh , Alrawdah",
      PhoneNo:locale=='ar'?"920028886":"920028886",
      Email:locale=='ar'?"ir@mawarid.com.sa":"ir@mawarid.com.sa"


    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${date.getFullYear()}`;
  };

  if (type === "reports") {
    return (
    <Reports locale={locale}/>
    );
  }

  if (type==="investor-Contacts"){
    return(
      <div>
         <Reports locale={locale}/>

         {InvestorContacts.map((contact, idx) => (
  <div key={idx} className="mt-4">
    <p className="mb-4 text-lg">{contact.Question}</p>
  <div className={`h-[6px] transition-all theme-bgcolor ` }></div>
    <h3 className="font-bold theme-color mt-4">{contact.Title}</h3>
    {contact.Address}
    <p>Phone: {contact.PhoneNo}</p>
    <a href="mailto:ir@mawarid.com.sa" className="theme-color">Email: {contact.Email}</a>
  </div>
))}
      </div>
    )
  }
 
  if (type==="Email Subscription"){
    return(
      <div className="grid gap-3">
      <Reports locale={locale}/>
      <EmailSubscriptionForm/>
      </div>
    )
  }
  // Sort items descending: first by order, then by NewsDate
  const sortedItems = (items ?? []).sort((a, b) => {
    // First sort by order descending
    if (b.order !== a.order) return b.order - a.order;

    // If order is equal, sort by date descending
    const dateA = new Date(a.NewsDate).getTime();
    const dateB = new Date(b.NewsDate).getTime();
    return dateB - dateA;
  });

  return (
    <section className="space-y-6">
      {sortedItems.length === 0 && <p>{locale === "ar" ? "لا توجد بيانات" : "No news found."}</p>}
      {sortedItems.map((item, idx) => {
        let actionText: string | null = null;
        let actionValue: any = null;

        if (item.Link1) {
          try {
            const cleaned = item.Link1.replace(/\\r\\n/g, "").trim();
            const parsed = JSON.parse(cleaned);
            actionText = Object.keys(parsed)[0];
            actionValue = Object.values(parsed)[0];
          } catch {
            
          }
        }

        return (
          <div key={idx} className="border-b pb-2">
            <h3 className="font-semibold pb-2">{item.Title}</h3>
            <p className="text-sm theme-color ">{item.NewsDate && formatDate(item.NewsDate)}</p>
            <p className="mt-1">{item.Description}</p>
            {actionText && actionValue && (
              <a
                href={actionValue}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-3 py-2 border bg-yellow-400 text-white "
              >
                {actionText}
              </a>
            )}
          </div>
        );
      })}
    </section>
  );
}
