import Image from "next/image";
import { foodItems } from "@/constants/foodItems";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/constants/testimonials";
import { FaStar } from "react-icons/fa";
import CarouselComp from "@/components/CarouselComp";

const Home = () => {
  return (
    <div>
      <CarouselComp/>
      <div className="flex flex-col gap-8 px-5 md:px-20 py-20">
        <p className="text-center text-2xl font-semibold">Recommended Foods</p>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {foodItems.map((f) => (
            <Card
              key={f.name}
              className="w-full max-w-md shadow-md border-t-4 border-t-cyan-500"
            >
              <CardHeader>
                <CardTitle>{f.name}</CardTitle>
                <CardDescription>Rs. {f.price}</CardDescription>
                <CardAction>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">
                    Order
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Image
                  src={f.photo}
                  alt="Food Photo"
                  className="w-100 h-50 rounded-lg"
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 px-5 md:px-20 pb-20">
        <p className="text-center font-semibold text-2xl">
          What Our Customers Say
        </p>
        <div className="flex flex-col items-center lg:flex-row gap-8">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="w-full max-w-md h-80 flex flex-col items-center justify-evenly  shadow-md border-t-4 border-t-cyan-500"
            >
              <CardHeader className="w-full">
                <CardTitle>{t.name}</CardTitle>
                <CardDescription>{`" ${t.description} "`}</CardDescription>
                {/* <CardAction>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">
                    Rate
                  </Button>
                </CardAction> */}
              </CardHeader>
              <CardContent>
                <Image
                  src={t.photo}
                  alt="testimonial photo"
                  className="w-35 h-35 rounded-full"
                />
              </CardContent>
              <CardFooter className="flex gap-2">
                {Array.from({ length: 5 }).map((_, item) => (
                  <div key={item}>
                    <FaStar
                      className={`${item < t.rating && "text-yellow-400"}`}
                    />
                  </div>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
