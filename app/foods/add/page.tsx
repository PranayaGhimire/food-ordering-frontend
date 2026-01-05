'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddFood } from "@/utils/apis/foodApi";
import { IFoodForm } from "@/utils/interfaces/foodForm";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddFood = () => {
  const router = useRouter();
  const {mutate,isPending} = useAddFood();
  const {register,handleSubmit} = useForm<IFoodForm>();
  const onSubmit = (data:IFoodForm) => {
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("price",data.price.toString());
    formData.append("file",data.file[0]); 
    mutate(formData,{
        onSuccess: (response) => {
            toast.success(response.message);
            router.push("/foods")
        },
        onError: () => toast.error("Oops! Something Went Wrong")
    })    
  }
  return (
    <div className="px-5 md:px-20 py-10 space-y-3">
      <h1 className="text-[18px] font-semibold">Add New Food</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Name */}
              <div className="md:w-1/2 space-y-2">
                <Label>Name</Label>
                <Input {...register("name")} placeholder="Enter Food Name" />
              </div>
              {/* Price */}
              <div className="md:w-1/2 space-y-2">
                <Label>Price</Label>
                <Input {...register("price")} type="number" placeholder="Enter Food Price" />
              </div>
            </div>
            <Input type="file" {...register("file")}/>
            <Button disabled={isPending} variant={`primary`}>Add New Food</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFood;
