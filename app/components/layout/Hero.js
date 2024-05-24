import Image from "next/image";
import { MoveRight } from "lucide-react";
export default function Hero() {
  return (
    <section className="hero">
      <div className="py-12">
        <h1 className="text-4xl font-semibold ">
          Everything <br/> is better <br/> with a&nbsp; <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-4 text-gray-500">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex bg-primary px-4 py-2 rounded-full text-white uppercase items-center">
            Order now
            <MoveRight />
          </button>
          <button className="flex gap-2 py-2 text-gray-500 font-semibold ">
            Learn more
            <MoveRight />
          </button>
        </div>
      </div>
      <div className="relative -right-32">
        <Image
          src={"/pizza.png"}
          alt={"pizza"}
          objectFit={"contain"}
          layout="fill"
        />
      </div>
    </section>
  );
}
