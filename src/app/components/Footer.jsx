'use client'
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
  const form = useRef(null);
  const [formData, setFormData] = useState({
    user_email: '',
  });
  const [errors, setErrors] = useState({});
  const validateForm = (formData) => {
    const validationErrors = {};
    if (!formData.user_email.trim()) {
      validationErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      validationErrors.user_email = 'Invalid email format';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };


  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      return; // Prevent submission if validation fails
    }
    emailjs
      .sendForm('service_blvkq7g', 'template_327auqn', form.current, {
        publicKey: "u7NC5hEThO2DX6MaI",
        ...formData, // Include form data in the email payload
      })
      .then(
        () => {
          toast.custom((t) => (
            <div
              className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Image
                      className="h-12 w-12 rounded-full"
                      src="/favicon-32x32.png"
                      alt="arab samachar icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Thank you for Subscribing Us!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      You will get all Latest News Messages.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#c4132a] hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ))
          setFormData({ user_email: '' });
          setErrors({}); // Clear errors on successful submission
        },
        (error) => {
          toast.error('Something went wrong. Please try again.');
        }
      );
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error on input change
  };
  return (
    <footer className="bg-[#222] border-t dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">

          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <div>
                <Image src='/arabsamacharwidelogotp.png' alt="arab samachar wide logo"
                  width={100}
                  height={56}
                  style={{ width: 'auto', height: '40px' }}
                  className='inline-block pr-2' />
                <p className="text-2xl font-bold text-white dark:text-white inline-block">दुनिया भर की सच्ची ख़बरें</p>
                <p className="mt-4 text-white dark:text-gray-400">
                  जुड़े 'अरब समाचार' से जो  देता है ख़बरें, सच्चाई की हर हद तक ! बिना डरे, बिना रुके।
                </p>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form className="w-full" ref={form} onSubmit={sendEmail}>
                <label className="sr-only"> Email </label>
                <div
                  className="border border-gray-100 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4 dark:border-gray-800"
                >
                  <input
                    type="email"
                    name="user_email"
                    placeholder="name@domain.com"
                    className={`h-[42px] rounded pl-2 w-full border-none outline-none focus:border-transparent focus:ring-transparent sm:text-sm dark:bg-gray-900 dark:text-white
                    ${errors.user_email ? 'border-red-500' : ''}`}
                    value={formData.user_email}
                    onChange={handleInputChange}
                  />


                  <button
                    type="submit"
                    value="Send"
                    className="mt-1 w-full bg-[#da251d] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0"
                  >
                    Sign Up
                  </button>
                </div>
                {errors.user_email && (
                  <span className="text-red-500 text-xs ml-4 pt-1">{errors.user_email}</span>
                )}
              </form>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-bold text-white dark:text-white">Navigation</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/breaking" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Breaking
                  </Link>
                </li>
                <li>
                  <Link href="/national" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    National
                  </Link>
                </li>
                <li>
                  <Link href="/world" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    World
                  </Link>
                </li>
                <li>
                  <Link href="/lifestyle" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Lifestyle
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-bold text-white dark:text-white">Navigation</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/technology" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/finance" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Finance
                  </Link>
                </li>
                <li>
                  <Link href="/entertainment" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Entertainment
                  </Link>
                </li>
                <li>
                  <Link href="/auto" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Auto
                  </Link>
                </li>
                <li>
                  <Link href="/sports" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Sports
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-medium text-white dark:text-white">Tools</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/tools/uae-gratuity-calculator" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Gratuity Calculator
                  </Link>
                </li>

                <li>
                  <Link href="/tools/gold-silver-rate/uae" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Gold & Silver Rate
                  </Link>
                </li>
                <li>
                  <Link href="/tools/exchange-rate/uae" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Money Exchange
                  </Link>
                </li>
                <li>
                  <Link href="/tools/weather/uae" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Weather
                  </Link>
                </li>
                <li>
                  <Link href="/tools/fuel-rates/uae" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Fuel Rate
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-bold text-white dark:text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/copyright" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Copyright
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimers" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Disclaimers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-bold text-white dark:text-white">Helpful Links</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/about-us" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/cookies-policy" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-white transition hover:opacity-75 dark:text-gray-200">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-red-500 pt-4 dark:border-gray-800">
          <div className="sm:flex sm:justify-between">
            <ul className="col-span-2 flex justify-center gap-6 lg:col-span-5 lg:justify-end">
              <li>
                <Link
                  href="https://www.facebook.com/arabsamachar"
                  rel="noreferrer"
                  target="_blank"
                  title="Facebook"
                  className="text-white transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Facebook</span>

                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/arabsamacharnews/"
                  rel="noreferrer"
                  target="_blank"
                  title="Instagram"
                  className="text-white transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Instagram</span>

                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="https://x.com/arabsamachar"
                  rel="noreferrer"
                  target="_blank"
                  title="X"
                  className="text-white transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">X</span>

                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2H21.5l-7.5 8.59L22 22h-6.828l-5.34-6.34L4.4 22H1l8.04-9.19L2 2h6.97l4.88 5.8L18.244 2zm-1.2 18h2.06L7.06 4H4.9l12.144 16z" />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="https://t.me/arabsamachar"
                  rel="noreferrer"
                  target="_blank"
                  title="Telegram"
                  className="text-white transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Telegram</span>

                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 3L2 11l7 2 2 7 3-5 5 5 3-17z" />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="https://gulfistan.com"
                  rel="noreferrer"
                  target="_blank"
                  title="Gulfistan"
                  className="text-white transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">Gulfistan</span>

                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
            <p className="text-xs text-white dark:text-gray-400 flex justify-center pt-4">
              &copy; 2026. Arab Samachar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
