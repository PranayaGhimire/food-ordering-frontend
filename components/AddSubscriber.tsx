'use client'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useAddSubscriber } from "@/utils/apis/subscriberApi";
import { IAddSubscriber } from "@/utils/interfaces/addSubscriberInterface";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
const AddSubscriber = () => {
  const queryClient = useQueryClient();
  const {mutate,isPending} = useAddSubscriber();
  const {register,handleSubmit} = useForm<IAddSubscriber>();
  const onSubmit = (data:IAddSubscriber) => {
    mutate(data,{
        onSuccess: (response) => {
            toast.success(response.message);
            queryClient.invalidateQueries({queryKey:['subscribers']})
        },
        onError: () => toast.error("Oops! something went wrong")
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <Input
        type="email"
        {...register("email",{
            required:true
        })}
        placeholder="Your email"
        className="bg-gray-700 border-0 placeholder:text-gray-200"
      />
      <Button disabled={isPending} className="bg-cyan-500 hover:bg-cyan-700 cursor-pointer">
        {isPending ? <RotateLoader color="white" size={10}/> :  'Subscribe'}
      </Button>
    </form>
  );
};

export default AddSubscriber;
