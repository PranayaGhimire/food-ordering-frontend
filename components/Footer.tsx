import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import AddSubscriber from "./AddSubscriber";

const Footer = () => {
  return (
    <footer className="  bg-zinc-800 text-white">
      <div className="flex flex-col xl:flex-row gap-15 xl:justify-between px-5 xl:px-20 py-10">
        {/* Quick Links */}
        <div className="grid gap-5">
          <p className="font-semibold text-[18px]">Quick Links</p>
          <ul className="grid gap-1">
            {navLinks.map((navLink) => (
              <li key={navLink.name}>
                <Link href={navLink.route}>{navLink.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col lg:flex-row gap-15">
          {/* Newsletter */}
          <div className="grid gap-3">
            <p className="font-semibold text-[18px]">Newsletter</p>
            <div className="grid gap-2">
              <p>Subscribe to get our latest updates</p>
              <AddSubscriber/>
            </div>
          </div>
          {/* Contact Info */}
          <div className="grid gap-3">
            <p className="font-semibold text-[18px]">Contact Info</p>
            <div className="grid gap-2">
              <div className="flex gap-2 items-center">
                <FaLocationDot className="text-cyan-500" />
                <p>
                  Official Address: 3<sup>rd</sup> floor, Adharsha Chowk, Jyotinagar, Bharatpur, Nepal
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <IoMdMail className="text-cyan-500"  />
                <p>rest@themomohouse.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <IoCall className="text-cyan-500"  />
                <p>9840505684; Pranaya Ghimire, Manager</p>
              </div>
            </div>
          </div>
          {/* Follow Us */}
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-[18px]">Follow Us</p>
            <div className="flex gap-3">
              <Link href={`https://www.facebook.com/pranaya.ghimire.9/`}><FaFacebook /></Link>
              <Link href={`https://www.instagram.com/pranaya_ghimire/`}><FaInstagram className="" /></Link>
              <Link href={`https://www.linkedin.com/in/pranaya-ghimire-8774a7253/`}><FaLinkedin /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center border-t mt-5 py-6 border-t-zinc-700 mx-3 lg:mx-8">
        &copy; {new Date().getFullYear()} The Momo House. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
