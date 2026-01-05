"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteFood, useGetFoods } from "@/utils/apis/foodApi";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const Foods = () => {
  const { data: foods } = useGetFoods();
  console.log(foods);
  const {mutate:deleteFood} = useDeleteFood();
  const queryClient = useQueryClient();
  const handleDeleteFood = (id:string) => {
      deleteFood(id,{
        onSuccess: (response) => {
            toast.success(response.message);
            queryClient.invalidateQueries({queryKey:['foods']});
        },
        onError: () => toast.error("Oops! Something Went Wrong")
      })
  }
  return (
    <div className="px-5 md:px-20 py-10 space-y-3">
      <h1 className="text-[18px] font-semibold">All Foods</h1>
      <Button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">
        <Link href={`/foods/add`}>Add Food</Link>
      </Button>
      <div className="flex flex-col md:flex-row flex-wrap gap-5">
        {foods?.data?.map((f: { _id: string; name: string; price: number,image:string }) => (
          <Card key={f._id}>
            <CardHeader>
              <CardTitle>{f.name}</CardTitle>
              <CardDescription>{`Rs. ${f.price}`}</CardDescription>
              <CardAction>
                <Button variant={`primary`}>Order</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="w-full h-50 rounded-md relative overflow-hidden">
                    {f.image && <Image src={f.image} alt="Food Image" sizes="160px" fill className="object-cover"/>}
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button className="bg-gray-500 hover:bg-gray-600 cursor-pointer">
                <Eye/>View
              </Button>
              <Button variant={`primary`}><Edit/>Update</Button>
              <Button onClick={() => handleDeleteFood(f._id)} 
              className="bg-red-500 hover:bg-red-600 cursor-pointer">
                <Trash/>Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Foods;
