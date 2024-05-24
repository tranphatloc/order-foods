export default function Sectionheader({ subHeader, mainHeader }) {
  return (
    <>
      <h3 className="font-semibold text-gray-500 leading-4">{subHeader}</h3>
      <h2 className="text-primary italic font-bol text-4xl">{mainHeader}</h2>
    </>
  );
}
