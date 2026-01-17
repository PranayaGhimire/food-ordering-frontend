"use client";
import { ISendMessage } from "@/utils/interfaces/SendMessageInterface";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useSendMessage } from "@/utils/apis/messageApi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SendMessage = () => {
  const queryClient = useQueryClient();
  const { mutate: sendMessage,isPending } = useSendMessage();
  const { register, handleSubmit } = useForm<ISendMessage>();
  const onSubmit = (data: ISendMessage) => {
    sendMessage(data, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["messages"] });
        toast.success(response.message);
      },
      onError: () => toast.error("Oops! something went wrong"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="Your Name" {...register("name")} />
      <Input placeholder="Your Email" {...register("email")} />
      <Textarea placeholder="Your Message" {...register("message")} />
      <Button disabled={isPending} variant={`primary`} className="w-full p-5">
        <Send /> Send Message
      </Button>
    </form>
  );
};

export default SendMessage;
