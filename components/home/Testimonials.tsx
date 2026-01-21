import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { testimonials } from "@/constants/testimonials";
import { FaStar } from "react-icons/fa";
const Testimonials = () => {
  return (
    <div className="flex flex-col gap-8 px-5 md:px-20 pb-20">
      <p className="text-center font-semibold text-2xl">
        What Our Customers Say
      </p>
      <div className="flex flex-col items-center lg:flex-row gap-8">
        {testimonials.map((t) => (
          <Card
            key={t.name}
            className="w-full max-w-md h-80 flex flex-col items-center justify-evenly  shadow-md border-t-4 border-t-cyan-500 hover:-translate-y-5 transition-all duration-400"
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
              {Array.from({ length: 10 }).map((_, item) => (
                <div key={item}>
                  <FaStar
                    className={`${item < t.rating && "text-yellow-400"} text-gray-400`}
                  />
                </div>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
