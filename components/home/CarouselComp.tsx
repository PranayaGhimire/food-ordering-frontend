"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { carouselItems } from "@/constants/carouselItems";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const CarouselComp = () => {
  return (
     <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className=""
          >
            <CarouselContent className="">
              {carouselItems.map((c, index) => (
                <CarouselItem key={index} className="flex justify-center items-center relative overflow-hidden">
                  <Image
                    src={c.image}
                    alt="Restaurant Icon"
                    className="w-full h-130 object-center brightness-75"
                  />
                  <div className="absolute text-white text-2xl font-bold flex flex-col gap-2 items-center">
                        <p className="text-center">The Momo House</p>
                        <p className="text-center">Where you can order food from the comfort of your home</p>
                       <Button variant="primary" >
                        <Link href={`/foods`}>
                            Order Now
                        </Link>
                      </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
  )
}

export default CarouselComp