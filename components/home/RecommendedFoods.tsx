import { foodItems } from "@/constants/foodItems";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
const RecommendedFoods = () => {
  return (
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
                  {/* <CardFooter></CardFooter> */}
                </Card>
              ))}
            </div>
          </div>
  )
}

export default RecommendedFoods
