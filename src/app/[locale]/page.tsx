// app/[locale]/page.tsx
import React from 'react';
import Banner from '../components/Banner';

import Services from '../components/Services';
import Home from '../Pages/Home';

export const dynamic = 'force-static';

// Generate static params for SSG
export async function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' },
  ];
}

export default async function LocalePage(props: any) {
  // Await params before using them
  const { params } = await props;
  
  // Treat `/` as Arabic if params.locale is undefined
  const locale = (params?.locale ?? 'ar') as 'ar' | 'en';
  const isRtl = locale === 'ar';

  return (
    <main lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="bg-white text-gray-900">
      {/* Pass resolved locale to Banner */}
      {/* <Banner locale={locale} />
      <Services locale={locale}/> */}
      <Home locale={locale}/>
    </main>
  );
}
