'use client'
import { useForm } from "react-hook-form";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IRegisterForm } from "@/utils/interfaces/RegisterForm";
import { Button } from "../ui/button";
import { useRegister } from "@/utils/apis/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaLock, FaUserAlt, FaUserCheck, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const RegisterForm = () => {
  const router = useRouter();
  const {mutate,isPending} = useRegister();
  const { register, handleSubmit } = useForm<IRegisterForm>();
  const onSubmit = (data: IRegisterForm) => {
    mutate(data,{
        onSuccess:(response) =>{
            toast.success(response.message);
            router.refresh();
        },
        onError:() => toast.error("Oops! something went wrong") 
    })
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="relative grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          className="pl-8"
          {...register("name")}
          defaultValue="Pedro Duarte"
        />
        <FaUserCircle className="absolute top-9 left-2 text-gray-600" />
      </div>
      <div className="relative grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input
         className="pl-8"
          {...register("username")}
          defaultValue="@peduarte"
        />
        <FaUserAlt className="absolute top-9 left-2 text-gray-600" />
      </div>
      <div className="relative grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input 
          className="pl-8"
          {...register("email")}
          defaultValue="peduarte@email"
          type="email"
        />
        <MdEmail className="absolute top-9.5 left-2 text-gray-600" />
      </div>
      <div className="relative grid gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          className="pl-8"
          {...register("password")}
          defaultValue="peduarte123"
          type="password"
        />
        <FaLock className="absolute top-9 left-2 text-gray-600" />
      </div>
      <div className="w-full max-w-md relative grid gap-3">
        <Label htmlFor="role">Role</Label>
        <NativeSelect {...register("role")} className="w-full max-w-md pl-8">
          <NativeSelectOption value="">Select Role</NativeSelectOption>
          <NativeSelectOption value="USER">User</NativeSelectOption>
          <NativeSelectOption value="ADMIN">Admin</NativeSelectOption>
        </NativeSelect>
        <FaUserCheck className="absolute top-9.5 left-2 text-gray-600" />
      </div>
      <Button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer" disabled={isPending}>
        Submit
      </Button>
    </form>
  );
};

export default RegisterForm;
