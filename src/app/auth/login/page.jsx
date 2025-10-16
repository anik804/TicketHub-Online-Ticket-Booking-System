"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import SocialLogin from "../components/socialLogin";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid credentials");
      } else {
        toast.success("🎉 Login successful!", { duration: 1000 });

        setTimeout(() => {
          if (document.referrer && document.referrer !== window.location.href) {
            router.push(document.referrer);
          } else {
            router.push("/");
          }
        }, 800);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="w-full p-8 md:p-12 flex flex-col justify-center">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4"
      >
        Welcome Back
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className=" text-gray-600 font-semibold mb-4 md:mb-8 text-center"
      >
        Access more features with your account.
      </motion.p>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex justify-end mt-2">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-orange-700 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 rounded-md bg-gradient-to-r from-primary to-[#FF0000] font-semibold hover:opacity-95 transition text-white cursor-pointer"
        >
          Login
        </motion.button>
      </form>

      <SocialLogin></SocialLogin>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center text-gray-500 text-sm"
      >
        Don’t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-primary font-bold hover:underline"
        >
          Register here
        </Link>
      </motion.p>
    </div>
  );
}
