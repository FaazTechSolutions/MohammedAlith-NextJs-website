import LocalePage from './[locale]/page';

export default function RootPage() {
  // Manually show Arabic content on `/`
  return <LocalePage params={{ locale: 'ar' }} />;
}