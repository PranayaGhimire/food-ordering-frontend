"use client";
import { Button } from "./ui/button";
import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import Image from "next/image";
import momoHouse from "@/assets/MomoHouse.png";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MdAccountCircle } from "react-icons/md";
import { useLogout } from "@/utils/apis/authApi";
import { useGetProfile } from "@/utils/apis/userApi";
import { LogIn, LogOut, Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "@/redux/mode/modeSlice";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const isDarkMode = useSelector((state: RootState) => state.mode.value);
  const dispatch = useDispatch();
  const path = usePathname();
  const { data: profile } = useGetProfile();
  console.log(profile);
  
  const first = profile?.data?.fullName.split(" ")[0];
  const shortFirst = profile?.data?.fullName.slice(0, 1).toUpperCase();
  const shortLast = profile?.data?.fullName
    .split(" ")[1]
    ?.slice(0, 1)
    .toUpperCase();
  const { mutate } = useLogout();
  return (
    <header>
      <div className="flex  justify-center  lg:justify-between items-center bg-cyan-600 h-14 px-20 text-white ">
        <div className="font-semibold hidden lg:flex gap-10">
          <p>EMAIL: rest@themomohouse.com</p>
          <p>PHONE: 9840505684; Pranaya Ghimire, Manager</p>
        </div>
        <Button className="group w-28 h-full rounded-none bg-stone-800 hover:bg-stone-900 cursor-pointer">
          <Link href={`/foods`}>Order Now</Link> <FaLongArrowAltRight className="group-hover:translate-x-2 transition-transform duration-400" />
        </Button>
      </div>
      <div className="flex justify-between items-center h-28 px-5 md:px-20 bg-white">
        <Image
          loading="eager"
          src={momoHouse}
          alt="Momo House Logo"
          className="rounded-full w-20 h-20"
        />
        {profile && <p className="font-medium">Welcome, {first}</p>}
        <ul className="lg:flex gap-8 hidden">
          {navLinks.map((navLink) => (
            <li
              key={navLink.name}
              className={` hover:bg-cyan-500 hover:border-white  hover:text-white hover:p-2 hover:rounded-md transition-all duration-600 ${
                path === navLink.route && "text-cyan-500"
              } font-medium`}
            >
              <div className="flex gap-2 items-center">
                <navLink.icon size={20} />{" "}
                <Link href={navLink.route}>{navLink.name}</Link>
              </div>
              {path === navLink.route && (
                <hr className="mt-1 w-12 border-2 border-cyan-500" />
              )}
            </li>
          ))}
        </ul>

        {profile ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary">{`${shortFirst}${shortLast}`}</Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col space-y-2">
              <p className="flex items-center gap-2 border-b-2 pb-2 font-medium">
                <MdAccountCircle className="text-cyan-500 text-2xl" />{" "}
                {`My Account`}
              </p>
              <Link
                href={`/profile/${profile?.data?.fullName
                  .replace(" ", "_")
                  .replace(" ", "_")}`}
              >
                Profile
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-red-500 border-2 hover:border-red-500 hover:bg-white hover:text-red-500 transition-all duration-400  cursor-pointer">
                    Log Out
                    <LogOut />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. You will be logged out from
                      your account and have to login again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => mutate()}
                      className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant={`primary`}>
            <Link href={`/auth`} className="flex gap-2 items-center">
              Log In
              <LogIn />
            </Link>
          </Button>
        )}
        <Button
          variant={`primary`}
          onClick={() => dispatch(toggleMode())}
          className="hidden md:block"
        >
          {isDarkMode ? (
            <div className="flex  gap-3 items-center">
              Light Mode
                <Sun />
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Moon />
              Dark Mode
            </div>
          )}
        </Button>
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild suppressHydrationWarning>
            <Button className="bg-cyan-500 md:hidden">
              <GiHamburgerMenu />
            </Button>
          </SheetTrigger>
          <SheetContent className="[&>button]:text-white">
            <SheetHeader className="bg-cyan-600">
              <SheetTitle className="text-white">The Momo House</SheetTitle>
              <SheetDescription className="text-white">
                We Provide online delivery of foods and our special here is
                momos and its types.
              </SheetDescription>
            </SheetHeader>
            <ul className="md:hidden flex flex-col gap-5 px-5  ">
              {navLinks.map((navLink) => (
                <li
                  key={navLink.name}
                  className={`${
                    path === navLink.route && "text-cyan-500"
                  } font-medium`}
                >
                  <div className="flex gap-2 items-center">
                    <navLink.icon size={20} />
                    <Link href={navLink.route}>{navLink.name}</Link>
                  </div>
                  {path === navLink.route && (
                    <hr className="mt-1 w-12 border-2 border-cyan-500" />
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
