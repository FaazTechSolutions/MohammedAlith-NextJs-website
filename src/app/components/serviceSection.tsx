
import React from "react";
import Slider from './serviceslider'



const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 3000,
  arrows: true,
};


export interface Action {
  Text: string;
  Value: string;
}

export interface AboutItem {
  RecId: number;
  Header?: string;
  subHeader?: string;
  Description?: string;
  WhatHeSaid?: string;
  Name?: string;
  position?: string;
  Image?: string;
  imgposition?: "Left" | "Right" | null;
  IsBackground?: "True" | "False" | null;
  action?: string | null;
 
}

export interface ServicePageItem {
  Header?: string;
  SubHeader?: string;
  Description?: string;
  slides?: string;
  action?: string | null;
  steps: string;
  stepsHeader: string;
  stepsDescription: string;
}


export interface CombinedProps {
  aboutItems?: AboutItem[];
  serviceItems?: ServicePageItem[];

}


export default function ServicesSection({ aboutItems, serviceItems,}: CombinedProps) {

  const dataList = aboutItems ?? serviceItems ?? [];

const locale: "en" | "ar" = "ar";
  const sortedList =
    "Order" in (dataList[0] || {})
      ? [...dataList].sort((a: any, b: any) => a.Order - b.Order)
      : dataList;

  return (
    <>
      {sortedList.map((x: any, index: number) => {
        
        let parsedAction: Record<string, string> | null = null;
        if (x.action) {
          try {
            parsedAction = JSON.parse(x.action);
          } catch (err) {
            console.warn("Invalid action JSON for item:", x.Header || index);
          }
        }

        const actionText = parsedAction ? Object.keys(parsedAction)[0] : null;
        let actionValue = parsedAction ? Object.values(parsedAction)[0] : null;
       
         
        let finalActionValue = actionValue;
      
if (
  actionValue &&
  !actionValue.startsWith("http://") &&
  !actionValue.startsWith("https://") &&
  !actionValue.includes(`/${locale}/`)
) {
  if (actionValue.startsWith("/")) {
    finalActionValue = `/${locale}/${actionValue}`;
  } else {
    finalActionValue = `/${locale}/${actionValue}`;
  }
}
        
        let slideImages: string[] = [];
        if (x.slides) {
          try {
           let slides = x.slides.replace(/\r?\n/g, "").trim();
            const parsedSlides = JSON.parse(slides);
            slideImages = Object.values(parsedSlides).map((url :any) => url.replace(/\\\\/g, "/"));;
            // console.log("slideImages for", x.Header || index, slideImages);
          } catch (err) {
            console.warn("Invalid slides JSON:", x.slides, err);
          }
        }

          let parsedSteps: Record<string, string | null> = {};
  if (x.steps) {
    try {
      parsedSteps = JSON.parse(x.steps);
    } catch (err) {
      console.warn("Invalid steps JSON:", x.steps);
    }
  }

       

        return (
          <div key={x.RecId || index} className={` px-18 container mx-auto`}>
            <div className="py-4   ">
              <div className="flex flex-col md:flex-row gap-8">
              
                {/* {x.imgposition === "Left" && x.Image && (
                  <div className=" ">
                    <img
                      src={x.Image}
                      alt={x.Header || "Image"}
                      className="mx-auto max-h-80 object-contain"
                    />
                  </div>
                )} */}

               
                <div className="w-3/6 pt-8">
                  {x.Header && (
                    <h3 className="text-4xl font-Header  font-bold mb-2">{x.Header}</h3>
                  )}
                  { x.Header && (
  <h3
    className="text-3xl  font-bold mb-2"
    style={{
      color:
        x.Header === "HEMAH"|| x.Header === "HEMAHTECH"
          ? "#dc1e35"
          : x.Header === "SAWAID"
          ? "#6ec498"
          : "#fdbd3f",
    }}
  >
    {x.SubHeader}
  </h3>
)}
                  {x.Description && (
                    <p className="text-gray-600 mb-3">{x.Description}</p>
                  )}
                  {x.WhatHeSaid && <p className="mb-2">{x.WhatHeSaid}</p>}
                  {x.Name && <h6 className="font-medium">{x.Name},</h6>}
                  {x.position && (
                    <span className="text-yellow-500">{x.position}</span>
                  )}

                
                  {(x.stepsHeader || Object.keys(parsedSteps).length > 0) && (
  <div className="mt-12 ps-12">
    {x.stepsHeader && (
      <h5 className="font-bold text-2xl">{x.stepsHeader}</h5>
    )}
    {x.stepsDescription && (
      <p className="text-gray-700">{x.stepsDescription}</p>
    )}

    
   {Object.entries(parsedSteps).length > 0 && (
  <ul className="list-disc ml-8 mt-2">
    {Object.entries(parsedSteps).map(([label, value], i) => (
      <li key={i}>
        <strong>{label}:</strong> {value ?? ""}
      </li>
    ))}
  </ul>
)}

  </div>
)}

                 

                <div className="flex justify-end">
  {x.Header && actionText && actionValue && (
    <a href={
        x.Header === "HEMAH" ||
        x.Header === "HEMAHTECH" ||
        x.Header === "SAWAID"
         ? actionValue ?? undefined // ✅ convert null to undefined
          : finalActionValue ?? undefined // 🔹 use locale-prefixed link
      }
      target={
        x.Header === "HEMAH" ||
        x.Header === "HEMAHTECH" ||
        x.Header === "SAWAID"
          ? "_blank"
          : ""
      }
      rel="noopener noreferrer"
      className={`inline-block mt-4 px-2 py-2 border-2 text-white transition-all duration-300
        ${
          x.Header === "HEMAH" || x.Header === "HEMAHTECH"
            ? "bg-[#dc1e35] border-[#dc1e35] hover:bg-transparent hover:text-[#dc1e35]"
            : x.Header === "SAWAID"
            ? "bg-[#6ec498] border-[#6ec498] hover:bg-transparent hover:text-[#6ec498]"
            : "bg-[#fdbd3f] border-[#fdbd3f] hover:bg-transparent hover:text-[#fdbd3f]"
        }`}
    >
      {actionText}
    </a>
  )}
</div>


                </div>

               
    {(!x.imgposition || x.imgposition === "Right" || x.imgposition === "null") && (
                  <>
                    {serviceItems && slideImages.length > 0 ? (
                      <div className="w-full md:w-1/2 text-center">
                        <Slider slideImages={slideImages} header={x.Header} />
                      </div>
                    ) : (
                      x.Image && (
                        <div className="w-full md:w-1/2 text-center">
                          <img src={x.Image} alt={x.Header || "Image"} className="h-full object-contain rounded-lg" />
                        </div>
                      )
                    )}
                  </>
                )}


              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
