import React from "react";

// ✅ Define the interface for each banner item
export interface BannerItem {
  RecId: number;
  BannerText: string;
  BannerSubText: string;
  position?: string;
  Image?: string;
  imgposition?: "Left" | "Right" | null;
  IsBackground?: "True" | "False" | null;
  action?: string | null;
  Order: number;
}

// ✅ Define the props type
export interface BannerProps {
  banners: BannerItem[];
  locale: "ar" | "en"; // Added locale for RTL/LTR support
}

// ✅ Component
export default function Banner({ banners, locale }: BannerProps) {
  const isRtl = locale === "ar";

  // Sort banners by Order
  const sortedBanners = [...banners].sort((a, b) => a.Order - b.Order);

  return (
    <div className="w-screen " dir={isRtl ? "rtl" : "ltr"}>
      {sortedBanners.map((banner) => (
        <div
          key={banner.RecId}
          className=" relative p-1 md:h-4/6 w-full overflow-hidden"
        >
          {/* Background Image */}
          {banner.Image && (
            <img
              src={banner.Image}
              alt="banner"
              draggable="false"
              className="min-h-82 xl:h-full w-full object-cover "
            />
          )}

          {/* Text Overlay */}
          <div className="container mx-auto">
          <div
            className={`px-18  absolute top-10 font-bold ${
              isRtl
                ? " text-right"
                : " text-left"
            } flex flex-col gap-4 lg:gap-6`}
          >
            {banner.BannerText && (
              <h1 className="font-bold text-gray-600 text-5xl xl:text-6xl">
                {banner.BannerText}
              </h1>
            )}
            {banner.BannerSubText && (
              <h2 className="font-bold text-4xl xl:text-5xl text-white">
                {banner.BannerSubText}
              </h2>
            )}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
