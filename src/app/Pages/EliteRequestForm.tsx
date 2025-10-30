"use client";
import { FaPlus } from "react-icons/fa";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import { DynamicApi } from "../lib/dynamicApi";
import { useLocale } from "next-intl";

interface EliteFormValues {
  name: string;
  mobile: string;
  email?: string;
  profession: string;
  nationality: string;
  otherNationality?: string;
  gender: string;
  ageFrom?: number;
  ageTo?: number;
Langueges  ?: string;
  qualification?: string;
  housingType?: string;
  salary?: string;
  natureOfWork?: string;
}

export default function EliteRequestForm() {
  const locale = useLocale() as "ar" | "en";
  const isArabic = locale === "ar";

  const methods = useForm<EliteFormValues>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      profession: "",
      nationality: "",
      gender: "",
      Langueges: "",
      qualification: "",
      housingType: "",
      salary: "",
      natureOfWork: "",
    },
  });

  const { handleSubmit, register, watch, reset } = methods;
  const nationalityValue = watch("nationality");

  const onSubmit = async (data: EliteFormValues) => {
    // 🔹 Validation before sending
    if (
      !data.name ||
      !data.mobile ||
      !data.profession ||
      !data.nationality ||
      !data.gender ||
      (data.nationality === "Other" && !data.otherNationality)
    ) {
      Swal.fire("", "Fill all the fields!", "warning");
      return;
    }

    try {
      const EliteData = {
        EntityTypeId: 258,
        Name: data.name,
        Mobile: data.mobile,
        Email: data.email || "",
        Profession: data.profession,
        Nationality:
          data.nationality === "Other"
            ? `Other - ${data.otherNationality}`
            : data.nationality,
        Gender: data.gender,
        AgeFrom: data.ageFrom,
        AgeTo: data.ageTo,
        Langueges: data.Langueges,
        Qualification: data.qualification,
        HousingType: data.housingType,
        Salary: data.salary,
        NatureofWork: data.natureOfWork,
      };

      console.log("Elite Request EliteData:", EliteData);

      await DynamicApi(EliteData);

      Swal.fire("Success", "Your request has been submitted successfully!", "success");
      reset();
    } catch (error) {
      // 🔹 Keep error popup for API failure
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mt-6 px-2 mx-auto
    md:px-18 py-20 bg-white" dir={isArabic ? "rtl" : "ltr"}>
      <h4 className="text-center mb-6 text-xl font-bold">ELITE REQUEST FORM</h4>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${isArabic ? "rtl" : "ltr"}`}
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name")}
              className="form-control "
            />
          </div>

          {/* Mobile + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">
                Mobile <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("mobile")}
                className="form-control "
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email (Optional)</label>
              <input type="email" {...register("email")} className="form-control " />
            </div>
          </div>

          {/* Profession + Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">
                Profession <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select {...register("profession")} className="form-control ">
                  <option value="">Select Profession</option>
                  <option value="Butler">Butler</option>
                  <option value="House Master">House Master</option>
                  <option value="Companion">Companion</option>
                  <option value="Personal assistance">Personal assistance</option>
                  <option value="Yacht Crew">Yacht Crew</option>
                </select>
                <span className="dropdown-toggle "></span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Nationality <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select {...register("nationality")} className="form-control">
                  <option value="">Select Nationality</option>
                  <option value="Russia">Russia</option>
                  <option value="Finland">Finland</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Poland">Poland</option>
                  <option value="France">France</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Albania">Albania</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Other">Other</option>
                </select>
                <span className="dropdown-toggle top-1 left-20"></span>
              </div>

              {nationalityValue === "Other" && (
                <input
                  type="text"
                  placeholder="Other Nationality"
                  {...register("otherNationality")}
                  className="form-control "
                />
              )}
            </div>
          </div>

          {/* Gender + Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select {...register("gender")} className="form-control">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <span className="dropdown-toggle "></span>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Age Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="From"
                  {...register("ageFrom")}
                  className="form-control "
                />
                <input
                  type="number"
                  placeholder="To"
                  {...register("ageTo")}
                  className="form-control "
                />
              </div>
            </div>
          </div>

          {/* Langueges + Qualification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Langueges</label>
              <div className="relative">
                <select {...register("Langueges")} className="form-control ">
                  <option value="">Select Langueges</option>
                  <option value="English">English</option>
                  <option value="Arabic">Arabic</option>
                </select>
                <span className="dropdown-toggle "></span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Qualification</label>
              <div className="relative">
                <select {...register("qualification")} className="form-control ">
                  <option value="">Select Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master Degree">Master Degree</option>
                </select>
                <span className="dropdown-toggle"></span>
              </div>
            </div>
          </div>

          {/* Accommodation + Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Accommodation</label>
              <div className="relative">
                <select {...register("housingType")} className="form-control">
                  <option value="">Select Accommodation</option>
                  <option value="Live-in">Live-in</option>
                  <option value="Live-out">Live-out</option>
                </select>
                <span className="dropdown-toggle "></span>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Salary</label>
              <input type="text" {...register("salary")} className="form-control" />
            </div>
          </div>

          {/* Nature of Work */}
          <div className="mb-6">
            <textarea
              rows={5}
              placeholder="Please provide us a brief about the nature of work..."
              {...register("natureOfWork")}
              className="form-control"
            ></textarea>
          </div>

          <div className="clearfix my-3">
                    <span className="create_action">
                        <button className="bg-amber-400">
                            <i className="text-white"><FaPlus /></i>
                        </button>
                    </span>
                </div>

          {/* Notice */}
          <div className="md:p-4 mb-6">
            <h6 className="text-lg mb-2">**Confidentiality Notice**</h6>
            <p className="text-lg">
    Please be assured that any information you provide to us will be 
    treated with the utmost confidentiality. We are committed to maintaining 
    the privacy and security of your personal data. Your trust is important to us, 
    and we will take all necessary precautions to safeguard your information against 
    unauthorized access, disclosure, or use.
                    
            </p>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-[#fdbd3f] text-white px-6 py-2 border-2 border-[#fdbd3f] hover:bg-transparent hover:text-[#fdbd3f] transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
