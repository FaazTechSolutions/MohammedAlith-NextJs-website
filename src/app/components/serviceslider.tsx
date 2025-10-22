"use client";
import React from "react";
import Slider from "react-slick";
import { useLocale } from "next-intl"; // import locale hook
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ClientSliderProps {
  slideImages: string[];
  header?: string;
}

export default function ClientSlider({ slideImages, header }: ClientSliderProps) {
  const locale = useLocale(); 
  const isRTL = locale === "ar"; 

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    rtl: isRTL, 
  };

  return (
    <div className={`${isRTL ? "rtl" : "ltr"} ba-img h-[470px]`}>
      <div className="insideSlide h-full absolute overflow-hidden">
        <Slider {...sliderSettings}>
          {slideImages.map((src, idx) => (
            <div key={idx} className="h-[330px] flex justify-center items-center">
              <img
                src={src}
                alt={ `Slide ${idx + 1}`}
                className="h-[110%] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
