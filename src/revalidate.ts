// src/server/actions.ts (or anywhere server-side)
import { revalidatePath } from "next/cache";

const En_API_URL = process.env.API_URL;
const Ar_API_URL = process.env.API_URL2;


export async function updatePageData(locale: "ar" | "en", section?: string) {
  const API_URL = locale === "ar" ? Ar_API_URL : En_API_URL;

  
  await fetch(`${API_URL}/update`, {
    method: "POST",
   
  });

 const pathToRevalidate = section ? `/${locale}/${section}` : `/${locale}`;
  revalidatePath(pathToRevalidate);
  console.log(`Revalidated: ${pathToRevalidate}`);
}
