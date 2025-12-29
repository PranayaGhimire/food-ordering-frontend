"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { carouselItems } from "@/constants/carouselItems";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

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
                <CarouselItem key={index} className="overflow-hidden">
                  <Image
                    src={c.image}
                    alt="Restaurant Icon"
                    className="w-full h-130 object-center"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
  )
}

export default CarouselComp