'use client'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ILoginForm } from "@/utils/interfaces/LoginForm";
import { useLogin } from "@/utils/apis/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { login } from "@/redux/auth/authSlice";
import { RotateLoader } from "react-spinners";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {mutate,isPending} = useLogin();
  const {register,handleSubmit} = useForm<ILoginForm>();
  const onSubmit = (data:ILoginForm) => {
    mutate(data,{
        onSuccess: (response) => {
            toast.success(response.message);
            dispatch(login({
              token:response.accessToken,
              user:response.data
            }));
            router.push("/");
        },
        onError() {
          toast.error("Oops! Something Went Wrong");
        },
    });
  } 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="relative grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input {...register('email')} type="email" placeholder="Enter email" className="pl-8.5"  />
        <IoMdMail className="text-xl absolute top-8.5 left-2 text-cyan-500" />
      </div>
      <div className="relative grid gap-3">
        <Label htmlFor="password">Password</Label>
        <Input {...register('password')} type="password" placeholder="Enter password" className="pl-8" />
        <FaLock className="absolute top-9 left-2 text-cyan-500" />
      </div>
      <Button disabled={isPending} className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">
        {isPending ? <RotateLoader  size={8} color="white" /> : 'Submit'}
      </Button>
    </form>
  );
};

export default LoginForm;
