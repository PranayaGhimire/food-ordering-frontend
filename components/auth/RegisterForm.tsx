"use client";
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
import {
  FaLock,
  FaPhoneAlt,
  FaUserAlt,
  FaUserCheck,
  FaUserCircle,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RotateLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";
import { FaGoogle } from "react-icons/fa6";

const RegisterForm = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useRegister();
  const { register, handleSubmit } = useForm<IRegisterForm>();
  const onSubmit = (data: IRegisterForm) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        queryClient.setQueryData(["user"], { data: response.data });
      },
      onError: () => toast.error("Oops! something went wrong"),
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="relative grid gap-3">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            className="pl-8.5"
            {...register("fullName")}
            defaultValue="Pedro Duarte"
          />
          <FaUserCircle className="text-xl absolute top-9.5 left-2 text-cyan-500" />
        </div>
        <div className="relative grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            className="pl-8"
            {...register("username")}
            defaultValue="@peduarte"
          />
          <FaUserAlt className=" absolute top-10 left-2 text-cyan-500" />
        </div>
        <div className="relative grid gap-3">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            className="pl-8"
            {...register("phoneNumber")}
            defaultValue="9840505684"
          />
          <FaPhoneAlt className=" absolute top-10 left-2 text-cyan-500" />
        </div>
        <div className="relative grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            className="pl-8"
            {...register("email")}
            defaultValue="peduarte@email"
            type="email"
          />
          <MdEmail className="text-xl absolute top-10 left-2 text-cyan-500" />
        </div>
        <div className="relative grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            className="pl-8"
            {...register("password")}
            defaultValue="peduarte123"
            type="password"
          />
          <FaLock className="absolute top-10 left-2 text-cyan-500" />
        </div>
        <div className=" relative grid gap-3">
          <Label htmlFor="role">Role</Label>
          <NativeSelect {...register("role")} className=" pl-8.5">
            <NativeSelectOption value="">Select Role</NativeSelectOption>
            <NativeSelectOption value="USER">User</NativeSelectOption>
            <NativeSelectOption value="ADMIN">Admin</NativeSelectOption>
          </NativeSelect>
          <FaUserCheck className="text-xl absolute top-8.5 left-2 text-cyan-500" />
        </div>
        <Button
          className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? <RotateLoader size={8} color="white" /> : "Submit"}
        </Button>
      </form>
      <Button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 cursor-pointer"
        onClick={() =>
          (window.location.href = `${process.env.NEXT_PUBLIC_URL}/auth/google`)
        }
      >
        Continue with Google <FaGoogle />
      </Button>
    </div>
  );
};

export default RegisterForm;
