"use client";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import React, { useState } from "react";
import { useLocale } from "next-intl";

export interface BoardMemberItem {
  Name: string;
  Image: string;
  boardPosition: string;
  order?: number;
  Description?: string;
  Title?: string;
}

export interface BoardTitle {
  Title: string;
}

interface Props {
  BoardofDirectorsTitle?: BoardTitle[];
  Chairman?: BoardMemberItem;
  BoardofDirectors: BoardMemberItem[];
}

export function BoardMembers({
  BoardofDirectorsTitle,
  Chairman,
  BoardofDirectors,
}: Props) {
  const [selectedMember, setSelectedMember] = useState<BoardMemberItem | null>(
    null
  );

  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";

  const text =
    locale === "en"
      ? `of the Board of Directors of Al Mawarid`
      : `أعضاء مجلس الإدارة`;

  const rightIcon = <FaChevronRight className="mt-1" />;
  const leftIcon = <FaChevronLeft className="mt-1" />;

  const button = locale === "en" ? (
    <p className="flex items-center gap-2 text-2xl">
      {leftIcon}
      <span className="theme-color">Back</span>
    </p>
  ) : (
    <p className="flex items-center gap-2 text-2xl">
      
       {rightIcon}
     <span className="theme-color">رجوع</span>
    </p>
  );

  // ✅ Sort members by order
  const sortedMembers = [...BoardofDirectors]
    .filter((m) => m.boardPosition !== Chairman?.boardPosition)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Determine who to display in the top "Chairman" section
  const displayPerson:any = selectedMember || Chairman;

  return (
    <div className={`bod_list container mx-auto grid gap-5 mt-5`}>
      {/* Title */}
      <h1 className="text-4xl  text-center uppercase">
        {BoardofDirectorsTitle?.[0]?.Title}
      </h1>

      {/* Main (Chairman or selected member) */}
      <div
        className={`bod_list_top mt-5 flex gap-10 items-start flex-col md:flex-row ${
          isArabic ? "text-right " : "text-left"
        }`}
      >
        <div
          className="with-frame relative cursor-pointer"
          onClick={() => setSelectedMember(displayPerson)}
        >
          <img
            src={displayPerson?.Image}
            height={300}
            width={300}
            alt={displayPerson?.Name}
            className="with-frame relative z-10"
          />
          <img
            src="https://mawarid.com.sa/assets/images/Frame_Bg-07.png"
            className={`img-frame absolute top-0 ${
              isArabic ? "right-20" : "left-20"
            }`}
            alt="frame"
          />
        </div>

        <div className="flex flex-col gap-2">
        {selectedMember&&( <h1 className="text-base   ">
        {BoardofDirectorsTitle?.[0]?.Title}
      </h1>)}
          <h1 className="text-3xl ">{displayPerson?.Name}</h1>
          <p className="theme-color text-2xl text-wrap">
            <span className="font-medium">{displayPerson?.boardPosition}</span>{" "}
            {text}
          </p>
        </div>
      </div>

      {/* If a member is selected, show their description + back */}
      {selectedMember && (
        <div className="bod_list_bottom flex flex-col items-stretch gap-5 relative ">
          <p className="text-gray-500 text-lg position">
            {selectedMember.Description}
          </p>

          <button
            onClick={() => setSelectedMember(null)}
            className={`self-end hover:opacity-80 transition-opacity`}
          >
            {button}
          </button>
        </div>
      )}

      {/* Grid of board members (only when no member is selected) */}
      {!selectedMember && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 ">
          {sortedMembers.map((member) => (
            <div
              key={member.order ?? member.Name}
              className="cursor-pointer "
              onClick={() => setSelectedMember(member)}
            >
              <img
                src={member.Image}
                alt={member.Name}
                className=""
              />
              <h1 className=" text-xl text-gray-600 ">
                {member.Name}
              </h1>
              <p className="theme-color font-semibold text-lg">
                {member.boardPosition}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
