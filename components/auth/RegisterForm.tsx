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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterForm>();
  const password = watch("password");
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
        {/* Full Name */}
        <div className="relative grid gap-3">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            className="pl-8.5"
            {...register("fullName", {
              required: "Full Name is required",
            })}
            defaultValue="Pedro Duarte"
          />
          <FaUserCircle className="text-xl absolute top-9.5 left-2 text-cyan-500" />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        {/* Username */}
        <div className="relative grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            className="pl-8"
            {...register("username", {
              required: "Username is required",
            })}
            defaultValue="@peduarte"
          />
          <FaUserAlt className=" absolute top-10 left-2 text-cyan-500" />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        {/* Phone Number */}
        <div className="relative grid gap-3">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            className="pl-8"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            defaultValue="9840505684"
          />
          <FaPhoneAlt className=" absolute top-10 left-2 text-cyan-500" />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
        {/* Email */}
        <div className="relative grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            className="pl-8"
            {...register("email", {
              required: "Email is required",
            })}
            defaultValue="peduarte@email"
            type="email"
          />
          <MdEmail className="text-xl absolute top-10 left-2 text-cyan-500" />
          {errors.email && (
            <p className="tex-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div className="relative grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            className="pl-8"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            defaultValue="peduarte123"
            type={showPassword ? "text" : "password"}
          />
          <FaLock className="absolute top-10 left-2 text-cyan-500" />
          <Button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            variant={`primary`}
            className="absolute top-9 right-2 h-6 w-6 "
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="relative grid gap-3">
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            className="pl-8"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match ",
            })}
            defaultValue="peduarte123"
            type={showConfirmPassword ? "text" : "password"}
          />
          <FaLock className="absolute top-10 left-2 text-cyan-500" />
          <Button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
            variant={`primary`}
            className="absolute top-9 right-2 h-6 w-6 "
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {/* Role */}
        <div className=" relative grid gap-3">
          <Label htmlFor="role">Role</Label>
          <NativeSelect
            {...register("role", {
              required: "Role is required",
            })}
            className=" pl-8.5"
          >
            <NativeSelectOption value="">Select Role</NativeSelectOption>
            <NativeSelectOption value="USER">User</NativeSelectOption>
            <NativeSelectOption value="ADMIN">Admin</NativeSelectOption>
          </NativeSelect>
          <FaUserCheck className="text-xl absolute top-8.5 left-2 text-cyan-500" />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>
        <Button
          variant={`primary`}
          disabled={isPending}
        >
          {isPending ? <RotateLoader size={8} color="white" /> : "Sign Up"}
        </Button>
      </form>
      <div className="flex justify-center items-center gap-3 mt-3 text-center">
        <p className="w-full border border-cyan-500" />
          <p>OR</p>
        <hr className="w-full border border-cyan-500" />
      </div>
      <Button
        className="w-full mt-3 bg-orange-500 hover:bg-orange-600 cursor-pointer"
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
