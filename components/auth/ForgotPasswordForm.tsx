'use client'
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForgotPassword } from "@/utils/apis/authApi";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const {mutate} = useForgotPassword();
  const {register,handleSubmit} = useForm<{email:string}>();
  const onSubmit = ({email}:{email:string}) => {
    mutate(email,{
      onSuccess:(response) => toast.success(response.message),
      onError:() => toast.error('Oops! something went wrong')
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Label>Email</Label>
      <Input type="email" placeholder="Enter your registered email" {...register('email')} />
      <Button variant={`primary`} className="text-white">Submit</Button>
    </form>
  );
};

export default ForgotPasswordForm;
