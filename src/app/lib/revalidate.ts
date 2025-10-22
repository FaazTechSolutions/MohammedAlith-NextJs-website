import { revalidatePath } from 'next/cache';

export async function POST(req:any) {
  const { locale } = await req.json();

  if (locale === 'ar') revalidatePath('/ar');
  else revalidatePath('/en');

  return new Response(JSON.stringify({ success: true }));
}
