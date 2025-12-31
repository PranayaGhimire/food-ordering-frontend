import chickenChilly from "@/assets/chickenChilly.webp";
import Image from "next/image";
const ContactUs = () => {
  return (
    <div>
      <div className="relative">
        <Image alt="Chicken Chilly Image" src={chickenChilly} className="w-full h-70"/>
        <div className="absolute top-24 left-5 md:left-20 space-y-3">
          <p className="text-3xl text-white font-bold">Contact Us</p>
          <hr className="border-2 w-15 border-cyan-500"/>
        </div>
      </div>
    </div>
  )
}

export default ContactUs