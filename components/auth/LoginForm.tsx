"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ILoginForm } from "@/utils/interfaces/LoginForm";
import { useLogin } from "@/utils/apis/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { RotateLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const onSubmit = (data: ILoginForm) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        queryClient.setQueryData(["user"], {
          data: response.data,
        });
        router.push(response.data.role === "ADMIN" ? "/admin" : "/");
      },
      onError() {
        toast.error("Oops! Something Went Wrong");
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="relative grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Enter email"
          className="pl-8.5"
        />
        <IoMdMail className="text-xl absolute top-9.5 left-2 text-cyan-500" />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="relative grid gap-3">
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          {/* forgot password */}
          <Link href={`/auth/forgotPassword`} className="text-sm">
            Forgot Password ?
          </Link>
        </div>
        <div className="relative">
          <Input
            {...register("password", {
              required: "Password is required",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="pl-8 pr-10"
          />
          <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-2 text-cyan-500" />
          <Button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            variant={`primary`}
            className="absolute top-1/2 transform -translate-y-1/2 right-2 h-6 w-6 "
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        disabled={isPending}
        className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
      >
        {isPending ? <RotateLoader size={8} color="white" /> : "Submit"}
      </Button>
    </form>
  );
};

export default LoginForm;
