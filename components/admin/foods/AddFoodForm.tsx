"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { categoryFilters } from "@/constants/filters";
import { useAddFood } from "@/utils/apis/foodApi";
import { IFoodForm } from "@/utils/interfaces/foodForm";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddFoodForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useAddFood();
  const { register, handleSubmit } = useForm<IFoodForm>();
  const onSubmit = (data: IFoodForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("file", data.file[0]);
    formData.append("category",data.category);
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.message);
        router.push("/admin/foods");
      },
      onError: () => toast.error("Oops! Something Went Wrong"),
    });
  };
  return (
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
          <Input
            {...register("price")}
            type="number"
            placeholder="Enter Food Price"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row  gap-5">
        {/* Category */}
        <div className="md:w-1/2 space-y-2">
          <Label>Category</Label>
          <NativeSelect {...register('category')}>
              {categoryFilters.filter(cf => cf!=="All").map(cf =>
                  <NativeSelectOption key={cf} className="dark:bg-stone-700">{cf}</NativeSelectOption>
              )}
          </NativeSelect>
        </div>
        {/* Image */}
        <div className="md:w-1/2 space-y-2">
          <Label>Image</Label>
          <Input type="file" {...register("file")} className=" py-1" />
        </div>
      </div>

      <Button disabled={isPending} variant={`primary`} className="text-white">
        Add New Food
      </Button>
    </form>
  );
};

export default AddFoodForm;
