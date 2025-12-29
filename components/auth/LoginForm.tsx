'use client'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ILoginForm } from "@/utils/interfaces/LoginForm";
import { useLogin } from "@/utils/apis/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {mutate,isPending} = useLogin();
  const {register,handleSubmit} = useForm<ILoginForm>();
  const onSubmit = (data:ILoginForm) => {
    mutate(data,{
        onSuccess: (response) => {
            toast.success(response.message);
            router.push("/");
            dispatch(setToken(response.accessToken));
            dispatch(setUser(response.data));
        }
    });
  } 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input {...register('email')} type="email"  />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="password">password</Label>
        <Input {...register('password')} type="password" />
      </div>
      <Button disabled={isPending} className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
