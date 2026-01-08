import chickenChilly from "@/assets/chickenChilly.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { faqs } from "@/constants/faqs";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
const ContactUs = () => {
  return (
    <div>
      <div className="relative">
        <Image
          alt="Chicken Chilly Image"
          src={chickenChilly}
          className="w-full h-70"
        />
        <div className="absolute top-24 left-5 md:left-20 space-y-3">
          <p className="text-3xl text-white font-bold">Contact Us</p>
          <hr className="border-2 w-15 border-cyan-500" />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row px-5 md:px-20 py-10 space-y-10 ">
        <div className="md:w-[1/2] space-y-5">
          <p className="text-[20px] font-semibold">Get In Touch</p>
          <p>
            Have questions about our service or need help for home delivery of
            food ? Reach out to us anytime and our friendly team will assist
            you.
          </p>
          <p className="flex items-center gap-2 ">
            <FaLocationDot className="text-cyan-500" />
            <span className="font-semibold">Address: </span>3rd floor, Adharsha
            Chowk, Jyotinagar, Bharatpur, Nepal
          </p>
          <p className="flex items-center gap-2">
            <IoMdMail className="text-cyan-500" />
            <span className="font-semibold">Email: </span>rest@themomohouse.com
          </p>
          <p className="flex items-center gap-2">
            <IoCall className="text-cyan-500" />
            <span className="font-semibold">Phone: </span>+977-9840505684
          </p>
        </div>
        <Card className="md:w-1/2 border-t-4 border-t-cyan-500 shadow-lg">
          <CardContent className="space-y-3">
            <p className="text-[18px] font-semibold">Send Us A Message</p>
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" />
            <Textarea placeholder="Your Message" />
            <Button variant={`primary`} className="w-full p-5">
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="px-5 md:px-20 pb-10 space-y-5">
        <p className="font-semibold text-[20px]">Find Us Here</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14139.344690271073!2d84.26773595053261!3d27.629590130484516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1767205606543!5m2!1sen!2snp"
          width=""
          height="450"
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>
      <div className="px-5 md:px-20 pb-10 space-y-5">
        <p className="text-[20px] font-semibold">
          Frequently Asked Questions (FAQs)
        </p>
        <Card className="border-t-4 border-t-cyan-500 shadow-lg">
          <CardContent>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {faqs.map((f) => (
                <AccordionItem key={f.title} value={f.title}>
                  <AccordionTrigger className="">{f.title}</AccordionTrigger>
                  <AccordionContent className=" flex flex-col gap-4 text-balance">
                    {f.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactUs;
