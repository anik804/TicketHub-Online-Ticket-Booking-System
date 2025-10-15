"use client";

import { useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import registerAnimation from "../../../../public/animations/register.json";
import SocialLogin from "../components/socialLogin";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    photo: "",
    role: "User",
    terms: false,
  });

  const [passwordError, setPasswordError] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear password error when typing
    if (name === "password") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "Password must be 8-64 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    if (!formData.terms) {
      toast.error("⚠️ You must agree to the Terms & Conditions.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Registration successful!");

        // Auto login
        const login = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (login?.ok) {
          setTimeout(() => {
            router.push(document.referrer || "/");
          }, 1500);
        } else {
          toast.error("Login failed after registration");
        }
      } else {
        toast.error(data.message || "Registration failed");
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
        Join Here
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className=" text-gray-600 font-semibold mb-4 md:mb-8 text-center"
      >
        Access exclusive features with your account.
      </motion.p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            className={`mt-2 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
              passwordError
                ? "border-red-500 focus:ring-primary"
                : "border-gray-300 focus:ring-primary"
            }`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Photo URL
          </label>
          <input
            name="photo"
            type="text"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="User">User</option>
            <option value="Organizer">Organizer</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 md:col-span-2 my-2">
          <input
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
            required
            className="h-4 w-4 accent-indigo-600"
          />
          <label className="text-gray-600 text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-black hover:underline">
              Terms & Conditions
            </Link>
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 rounded-md bg-gradient-to-r from-primary to-[#FF0000] font-semibold hover:opacity-95 transition text-white cursor-pointer md:col-span-2"
        >
          Register
        </motion.button>
      </form>
      <SocialLogin></SocialLogin>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center text-gray-500 text-sm"
      >
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-primary font-bold hover:underline"
        >
          Login here
        </Link>
      </motion.p>
    </div>
  );
}
