export interface Certificate {
  Title: string;
  Order: number;
  Image?: string;
}

interface CertificateProps {
  certificateEn: Certificate[];   // English certificates
  certificateAr: Certificate[];   // Arabic certificates
  locale: "ar" | "en";
}

export default function Certificates({ certificateEn, certificateAr, locale }: CertificateProps) {
  // Pick the correct list based on locale
  const certificateList = locale === "ar" ? certificateAr : certificateEn;

  // Sort by Order
  const sortedList = [...certificateList].sort((a, b) => a.Order - b.Order);

  const headingText = locale === "ar" ? "شهادات الأيزو" : "ISO CERTIFICATES";

  return (
    <section className="container mx-auto mt-3  px-18 py-20">
  {/* Heading */}
  <h3 className="mb-5 text-[#53585b] text-2xl font-semibold">
    {headingText}
  </h3>

  {/* Certificates Grid */}
  <div className="certificates flex flex-wrap justify-center">
    {sortedList.map((cert, idx) => (
      <div
        key={idx}
        className="text-center w-1/2 md:w-1/2 lg:w-1/4 p-2"
      >
        {/* Image */}
        {cert.Image && (
          <img
            src={cert.Image}
            alt={cert.Title}
            className="mx-auto rounded-md shadow-md  transition-transform cursor-pointer"
          />
        )}
        {/* Title */}
        <span className="cir-title block mt-2 text-gray-700 font-medium">
          {cert.Title}
        </span>
      </div>
    ))}
  </div>
</section>

  );
}
