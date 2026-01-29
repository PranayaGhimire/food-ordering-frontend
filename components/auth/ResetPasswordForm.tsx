'use client'

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { IResetPassword } from "@/utils/interfaces/resetPasswordInterface"
import { useResetPassword } from "@/utils/apis/authApi"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"

const ResetPasswordForm = () => {
  const {token} = useParams<{token:string}>();
  const router = useRouter();
  const {mutate,isPending} = useResetPassword();
  const {register,handleSubmit} = useForm<{password:string}>();
  const onSubmit = ({password}:{password:string}) => {
    const data ={token,password}
    mutate(data,{
        onSuccess:(response) => {
            toast.success(response.message);
            router.push("/auth");
        },
        onError: () => toast.error('Oops! something went wrong')
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Label>New Password</Label>
        <Input {...register('password')} type="password" placeholder="Enter your new password"/>
        <Button disabled={isPending} variant={`primary`} className="text-white">Submit</Button>
    </form>
  )
}

export default ResetPasswordForm
