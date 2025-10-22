import { getRequestConfig, type GetRequestConfigParams } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getMessages } from '../app/lib/api';

const locales = ['en', 'ar'];

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  const resolvedLocale = (await requestLocale) ?? 'ar';
  const locale:any = locales.includes(resolvedLocale) ? resolvedLocale : 'ar';

  const apiResponse = await getMessages(locale);
  if (!apiResponse || Object.keys(apiResponse).length === 0) notFound();

  const apiMessages = apiResponse.result || apiResponse;

  return { locale, messages: apiMessages };
});
