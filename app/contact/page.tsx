"use client";

import { toast } from "@/components/ui/toast";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      phone: formData.phone,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });

      setStatus("success");
      toast.add({
        type: "success",
        description: "Thanks for reaching out! Your message has been sent.",
      });
      setFormData({ name: "", email: "", message: "", phone: "" });
    } catch (err) {
      setStatus("error");
      if (err instanceof EmailJSResponseStatus) {
        toast.add({
          type: "error",
          description: `Could not send message (${err.text}).Please try again.`,
        });
      } else {
        toast.add({
          type: "error",
          description: "Something went wrong. Please try again later.",
        });
      }
    }
  }
  return (
    <div className="my-20 flex flex-col md:flex-row items-stretch gap-10 max-w-5xl mx-auto p-10">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="bg-cover bg-center bg-no-repeat duration-300 md:duration-500 transition-all rounded-2xl w-full md:w-1/2 min-h-105 shadow-xl/60 hover:shadow-xl/80 hover:scale-105"
        style={{
          backgroundImage: "url(/images/background.jpg)",
        }}
      />
      <form className="flex-1 mt-14 md:mt-0" onSubmit={handleSubmit}>
        <motion.h1
          className="text-4xl font-medium mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Contact us
        </motion.h1>
        <div className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full border-b pb-3 outline-none"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border-b pb-3 outline-none"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <label htmlFor="phone" className="text-sm">
              Phone Number
            </label>
            <input
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              type="number"
              id="phone"
              placeholder="Enter your phone number"
              className="w-full border-b pb-3 outline-none"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          >
            <label htmlFor="meassage" className="text-sm">
              Message
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              id="meassage"
              placeholder="Enter your meassage"
              className="w-full border-b pb-3 outline-none"
            />
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
            type="submit"
            className="flex items-center gap-3 group duration-200 bg-zinc-900 hover:bg-zinc-800 text-white mr-auto rounded-lg px-5 py-2 cursor-pointer"
          >
            {status === "submitting" ? (
              <div className="flex items-center gap-3">
                Sending <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                Submit{" "}
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 " />
              </div>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
