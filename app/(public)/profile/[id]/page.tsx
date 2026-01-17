import MyProfile from "@/components/MyProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};
const Profile = () => {
  return (
    <div className="px-5 md:px-20 py-10 space-y-5">
      <h1 className="text-[18px] font-semibold">My Profile</h1>
      <MyProfile />
    </div>
  );
};

export default Profile;
