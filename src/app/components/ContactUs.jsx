"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ContactUs() {
  const form = useRef(null);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation
  const validateForm = (data) => {
    const validationErrors = {};

    if (!data.user_name.trim()) {
      validationErrors.user_name = "Name is required";
    } else if (data.user_name.length < 2 || data.user_name.length > 15) {
      validationErrors.user_name = "Name must be between 2 and 15 characters";
    }

    if (!data.user_email.trim()) {
      validationErrors.user_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.user_email)) {
      validationErrors.user_email = "Invalid email format";
    }

    if (!data.message.trim()) {
      validationErrors.message = "Message is required";
    } else if (data.message.length > 1000) {
      validationErrors.message = "Message cannot exceed 1000 characters";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // ✅ Submit handler
  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) return;

    try {
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.sendForm(
        "service_blvkq7g",
        "template_327auqn",
        form.current,
        {
          publicKey: "u7NC5hEThO2DX6MaI",
        }
      );

      toast.success("Message sent successfully!");

      setFormData({
        user_name: "",
        user_email: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Try again.");
    }
  };

  // ✅ Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <main className="flex flex-col items-center justify-center w-[90%] m-auto">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full max-w-[400px] space-y-6 mt-10 mb-20 border p-4 shadow-lg rounded-2xl"
      >
        <h1 className="text-xl font-semibold">Contact Us</h1>

        {/* Name */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-bold">Name:</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            className={`p-2 border rounded-xl ${
              errors.user_name ? "border-red-500" : ""
            }`}
          />
          {errors.user_name && (
            <span className="text-red-500 text-xs">
              {errors.user_name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-bold">Email:</label>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleInputChange}
            className={`p-2 border rounded-xl ${
              errors.user_email ? "border-red-500" : ""
            }`}
          />
          {errors.user_email && (
            <span className="text-red-500 text-xs">
              {errors.user_email}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-bold">Message:</label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={`p-2 border rounded-xl ${
              errors.message ? "border-red-500" : ""
            }`}
          />
          {errors.message && (
            <span className="text-red-500 text-xs">
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#c4132a] text-white p-2 rounded-lg w-full"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}