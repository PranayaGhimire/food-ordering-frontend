import { foodItems } from "@/constants/foodItems";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
const RecommendedFoods = () => {
  return (
    <div className="flex flex-col gap-8 px-5 md:px-20 py-20">
            <p className="text-center text-2xl font-semibold">Recommended Foods</p>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {foodItems.map((f) => (
                <Card
                  key={f.name}
                  className="dark:bg-gray-700 w-full max-w-md shadow-md border-t-4 border-t-cyan-500 hover:-translate-y-5 transition-all duration-400"
                >
                  <CardHeader>
                    <CardTitle>{f.name}</CardTitle>
                    <CardDescription>Rs. {f.price}</CardDescription>
                    <CardAction>
                      <Button variant={`primary`} asChild className="text-white">
                          <Link href={`/foods`}><UtensilsCrossed/>Order</Link>
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
                  {/* <CardFooter></CardFooter> */}
                </Card>
              ))}
            </div>
          </div>
  )
}

export default RecommendedFoods
