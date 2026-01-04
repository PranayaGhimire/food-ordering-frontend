"use client";
import Image from "next/image";
import profileImage from "@/assets/profile.avif";
import { Input } from "@/components/ui/input";
import { useGetProfile, useUpdateProfile, useUploadProfile } from "@/utils/apis/userApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { IRegisterForm } from "@/utils/interfaces/RegisterForm";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const {mutate:updateProfile,isPending:isUpdateProfilePending} = useUpdateProfile();
  const { register, handleSubmit } = useForm<IRegisterForm>();
  const onSubmit = (data:IRegisterForm) => {
     updateProfile(data,{
      onSuccess: (response) => {
          toast.success(response.message);
      },
      onError: () => toast.error("Oops! Something Went Wrong")
     });
  }
  const { data: profile, isLoading } = useGetProfile();
  console.log(profile);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUploadProfile();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: () => toast.error("Oops! something went wrong"),
    });
  };
  return (
    <div className="px-5 md:px-20 py-10 space-y-5">
      <h1 className="text-[18px] font-semibold">My Profile</h1>
      <Card className="border-t-4 border-t-cyan-500 shadow-md">
        <CardContent className="space-y-5">
          <div className="flex flex-col items-center gap-3">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-40 h-40 rounded-full relative overflow-hidden cursor-pointer"
            >
              {isLoading || isPending ? (
                  <Skeleton className="w-full h-full rounded-full bg-gray-400" />
              ) : (
                <Image
                  src={profile?.data?.profileImageUrl || profileImage}
                  fill
                  sizes="160px"
                  alt="Profile Photo"
                  className="object-cover"
                />
              )}
            </div>
            <p className="text-gray-600 text-center">
              Select on the image to upload your profile picture
            </p>
          </div>

          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={onFileSelect}
          />
          {isLoading ? <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-5">
                <Skeleton className="md:w-1/2 h-10 bg-gray-400"/>
                <Skeleton className="md:w-1/2 h-10 bg-gray-400"/>
              </div>
             <div className="flex flex-col md:flex-row gap-5">
                <Skeleton className="md:w-1/2 h-10 bg-gray-400"/>
                <Skeleton className="md:w-1/2 h-10 bg-gray-400"/>
              </div>
          </div> :
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name & Username */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="md:w-1/2 space-y-2">
                <Label>Full Name</Label>
                <Input {...register("name")} defaultValue={profile?.data?.name} />
              </div>
              <div className="md:w-1/2 space-y-2">
                <Label>Username</Label>
                <Input {...register("username")} defaultValue={profile?.data?.username} />
              </div>
            </div>
            {/* Email & Role */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="md:w-1/2 space-y-2">
                <Label>Email</Label>
                <Input {...register("email")} type="email" defaultValue={profile?.data?.email} />
              </div>
              <div className="md:w-1/2 space-y-2">
                <Label>Role</Label>
                <Input  defaultValue={profile?.data?.role} />
              </div>
            </div>
            {/* Password */}
            {/* <div className="flex flex-col md:flex-row gap-5">
              <div className="md:w-1/2 space-y-2">
                <Label>Old Password</Label>
                <Input  type="password" placeholder="Enter Old Password" />
              </div>
              <div className="md:w-1/2 space-y-2">
                <Label>New Password</Label>
                <Input type="password" {...register("password")} placeholder="Enter New Password" />
              </div>
            </div> */}
            {/*  */}
            <Button disabled={isUpdateProfilePending} className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">
              Update Profile
            </Button>
          </form>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
