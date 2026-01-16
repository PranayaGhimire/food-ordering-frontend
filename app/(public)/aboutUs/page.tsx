import Image from "next/image";
import pizza from "@/assets/pizza.jpg";
import { Card } from "@/components/ui/card";
import momo from "@/assets/Momo.jpg";
const AboutUs = () => {
  return (
    <div>
      <div className="relative">
        <Image
          alt="Pizza Image"
          src={pizza}
          className="object-center w-full h-70 brightness-75"
        />
        <div className="absolute top-24 left-5 md:left-20 space-y-3">
          <p className="text-3xl  text-white font-bold">About Us</p>
          <hr className="border-2 w-15 border-cyan-500" />
        </div>
      </div>
      <div className="px-5 md:px-20 py-10 space-y-10">
        <p className="text-[18px]  ">
          Welcome to <span className="font-semibold">The Momo House</span>{" "}
          <span className="text-medium text-2xl">-</span> here you can order
          momos from your home and will be delivered to your home instantly. We
          provide other food items also such as Burger, Chicken Chilly, Pizza
          etc. Momo is our special here.
        </p>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
          <Image src={momo} alt="Momo" className="rounded-md w-100 h-80" />
          <div className="text-[18px]  space-y-2">
            <p className="font-semibold">Our Mission</p>
            <p className="">
              To provide qualitative & tasty foods with a home delivery service
              to customer home
            </p>
          </div>
        </div>
        <Card className="pl-10 border-t-4 border-t-cyan-500">
          <p className="font-semibold text-[18px]">Why Choose Us?</p>
          <ul className="list-disc pl-5">
            <li>Qualitative & Tasty Foods</li>
            <li>Home Delivery Service</li>
            <li>Reasonable Price Of Foods</li>
            <li>Varieties Of Food Items</li>
            <li>Experienced Cooks</li>
            <li>Varieties Of Momos</li>
            <li>Coffee, Tea & Cold Drinks</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
