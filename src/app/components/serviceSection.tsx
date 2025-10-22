import React from "react";

// 🔹 Shared types
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
  Order: number;
  steps: string;
  stepsHeader: string;
  stepsDescription: string;
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

// 🔹 Props definition – either About or Services
export interface CombinedProps {
  aboutItems?: AboutItem[];
  serviceItems?: ServicePageItem[];
}

// 🔹 Combined component
export default function ServicesSection({
  aboutItems,
  serviceItems,
}: CombinedProps) {
  // Decide which data to render
  const dataList = aboutItems ?? serviceItems ?? [];

  // If About section, sort by Order (only About has Order)
  const sortedList =
    "Order" in (dataList[0] || {})
      ? [...dataList].sort((a: any, b: any) => a.Order - b.Order)
      : dataList;

  return (
    <>
      {sortedList.map((x: any, index: number) => {
        // 🔸 Handle action parsing
        let parsedAction: Record<string, string> | null = null;
        if (x.action) {
          try {
            parsedAction = JSON.parse(x.action);
          } catch (err) {
            console.warn("Invalid action JSON for item:", x.Header || index);
          }
        }

        const actionText = parsedAction ? Object.keys(parsedAction)[0] : null;
        const actionValue = parsedAction ? Object.values(parsedAction)[0] : null;

        // 🔹 Parse slides outside JSX
        let slideImages: string[] = [];
        if (x.slides) {
          try {
           let slides = x.slides.replace(/\\/g, "\\\\").trim();
            const parsedSlides = JSON.parse(slides);
            slideImages = Object.values(parsedSlides);
            console.log("slideImages for", x.Header || index, slideImages);
          } catch (err) {
            console.warn("Invalid slides JSON:", x.slides, err);
          }
        }

        // 🔹 Conditional Background for About items only
        const bgClass = x.IsBackground === "True" ? "bg-gray-300/30" : "";

        return (
          <div key={x.RecId || index} className={`py-20 px-18 ${bgClass}`}>
            <div className=" px-18 w-screen">
              <div className="flex flex-col md:flex-row  py-12 space-y-8 md:space-y-0 md:space-x-8">
                {/* LEFT IMAGE (only if present) */}
                {x.imgposition === "Left" && x.Image && (
                  <div className="w-full md:w-1/2 text-center">
                    <img
                      src={x.Image}
                      alt={x.Header || "Image"}
                      className="mx-auto max-h-80 object-contain"
                    />
                  </div>
                )}

                {/* TEXT CONTENT */}
                <div className="w-full md:w-1/2">
                  {x.Header && (
                    <h3 className="text-2xl font-semibold mb-2">{x.Header}</h3>
                  )}
                  {x.SubHeader && (
                    <h4 className="text-lg font-medium mb-2 text-gray-700">
                      {x.SubHeader}
                    </h4>
                  )}
                  {x.Description && (
                    <p className="text-gray-600 mb-3">{x.Description}</p>
                  )}
                  {x.WhatHeSaid && <p className="mb-2">{x.WhatHeSaid}</p>}
                  {x.Name && <h6 className="font-medium">{x.Name},</h6>}
                  {x.position && (
                    <span className="text-yellow-500">{x.position}</span>
                  )}

                  {/* Steps (if service) */}
                  {x.stepsHeader && (
                    <div className="mt-4">
                      <h5 className="font-semibold text-yellow-600">
                        {x.stepsHeader}
                      </h5>
                      <p className="text-gray-700">{x.stepsDescription}</p>
                    </div>
                  )}

                  {/* Action button */}
                  <div className="flex justify-end">
                    {actionText && actionValue && (
                      <a
                        href={actionValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-2 py-2 border-2 border-yellow-500 bg-yellow-500 text-white hover:bg-transparent hover:text-yellow-500 transition"
                      >
                        {actionText}
                      </a>
                    )}
                  </div>
                </div>

                {/* RIGHT IMAGE OR SLIDER */}
                {(x.imgposition === "Right" || x.imgposition === "Left"||x.imgposition==="null") && (
                  <div className="w-full md:w-1/2 text-center">
                    {slideImages.length > 0 ? (
                      <div className="w-full overflow-hidden relative">
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory">
                          {slideImages.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={x.Header || `Slide ${idx + 1}`}
                              className="mx-auto max-h-80 object-contain snap-center rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      x.Image && (
                        <img
                          src={x.Image}
                          alt={x.Header || "Image"}
                          className="mx-auto max-h-80 object-contain"
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
