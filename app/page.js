import Link from "next/link";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import Sectionheader from "./components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <Sectionheader subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-lg mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste
            quos suscipit tempora? Aperiam esse fugiat inventore laboriosam
            officiis quam rem!
          </p>
          <p>
            At consectetur delectus ducimus est facere iure molestias obcaecati
            quaerat vitae voluptate? Aspernatur dolor explicabo iste minus
            molestiae pariatur provident quibusdam saepe?
          </p>
          <p>
            Laborum molestias neque nulla obcaecati odio quia quod reprehenderit
            sit vitae voluptates? Eos, tenetur.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <Sectionheader subHeader={"Don't hesitate"} mainHeader={"Contact"} />
        <div className="mt-8">
          <a
            className="text-gray-500 text-4xl underline"
            href="tel:+84949841714"
          >
            +84 949 841 714
          </a>
        </div>
      </section>
      
    </>
  );
}
