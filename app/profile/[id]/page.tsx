"use client";
import Image from "next/image";
import profileImage from "@/assets/profile.avif";
import { Input } from "@/components/ui/input";
import { useGetProfile, useUploadProfile } from "@/utils/apis/userApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Profile = () => {
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
      <Card>
        <CardContent className="space-y-5">
          <div className="flex flex-col items-center gap-3">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-40 h-40 rounded-full relative overflow-hidden cursor-pointer"
            >
              {isLoading || isPending ? (
                <div className="w-full h-full flex justify-center items-center">
                  <ClipLoader />
                </div>
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
          {/* Full Name & Username */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:w-1/2 space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={profile?.data?.name} />
            </div>
            <div className="md:w-1/2 space-y-2">
              <Label>Username</Label>
              <Input defaultValue={profile?.data?.username} />
            </div>
          </div>
          {/* Email & Password */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="md:w-1/2 space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={profile?.data?.email} />
            </div>
            <div className="md:w-1/2 space-y-2">
              <Label>Role</Label>
              <Input value={profile?.data?.role} />
            </div>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer">Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
