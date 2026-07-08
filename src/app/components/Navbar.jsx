"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="fixed left-0 top-0 w-full z-10 ease-in duration-300  bg-[#0a112d]">
      <div className="max-w-screen m-auto flex justify-between items-center text-white h-12 sm:h-10">
        <Link href="/" className="pl-8">
          <Image
            src='/arabsamacharwidelogotp.png'
            alt="arab samachar wide logo"
            width={100}
            height={56}
            style={{ width: '64px', height: '36px' }}
          />
        </Link>
        <ul className="hidden sm:flex w-5/6 justify-between pr-8">
          <li className="p-2 hover:underline decoration decoration-2 underline-offset-4">
            <Link href="/">होम</Link>
          </li>
          <li className="p-2 hover:underline decoration decoration-2 underline-offset-4">
            <Link href="/breaking" className="relative flex h-2 w-2">
              ब्रेकिंग
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4132a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c4132a]"></span>
              </span>
            </Link>
          </li>
          <li className="p-2 pl-8 hover:underline decoration decoration-2 underline-offset-4">
            <Link href="/national">राष्ट्रीय</Link>
          </li>
          <li className="p-2   hover:underline decoration   decoration-2 underline-offset-4">
            <Link href="/world">दुनिया</Link>
          </li>
          <li className="p-2   hover:underline decoration   decoration-2 underline-offset-4">
            <Link href="/entertainment">मनोरंजन</Link>
          </li>
          <li className="p-2  hover:underline decoration   decoration-2 underline-offset-4">
            <Link href="/lifestyle">लाइफस्टाइल</Link>
          </li>
          <li className="p-2   hover:underline decoration   decoration-2 underline-offset-4">
            <Link href="/technology">टेक्नोलॉजी</Link>
          </li>
          <li className="p-2   hover:underline decoration   decoration-2 underline-offset-4">
            <Link href="/finance">फाइनेंस</Link>
          </li>
          <li className="p-2   hover:underline decoration   decoration-2 underline-offset-4">
            <Link href="/sports">खेल</Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-20  mr-2 ">
          {nav ? <AiOutlineClose size={35} /> : <AiOutlineMenu size={35} />}
        </div>

        <div
          className={`fixed left-0 top-0 w-full h-full z-0 bg-gray-900 opacity-75 ${nav ? "" : "hidden"
            }`} // Conditional class based on nav state
        ></div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden bg-white absolute  top-0 left-0 right-0 bottom-0 flex justify-center items-center w-[70%] h-screen ease-in duration-200 text-black"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen ease-in duration-300 bg-black"
          }
        >
          <ul className="w-full">
            <li
              onClick={handleNav}
              className="p-4 flex flex-row justify-between items-center border-b border-t">
              <Link href="/" className="  text-2xl hover:text-[#c4132a] pl-10">होम</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>
            <li
              onClick={handleNav}
              className="p-4 flex flex-row justify-between items-center border-b"
            >
              <Link href="/breaking" className="  text-2xl hover:text-[#c4132a] pl-10">ब्रेकिंग</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>
            <li
              onClick={handleNav}
              className=" p-4 flex flex-row justify-between items-center border-b"
            >
              <Link href="/national" className="  text-2xl hover:text-[#c4132a] pl-10">राष्ट्रीय</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>
            <li
              onClick={handleNav}
              className="p-4 flex flex-row justify-between items-center border-b"
            >
              <Link href="/world" className="  text-2xl hover:text-[#c4132a] pl-10">दुनिया</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>
            <li
              onClick={handleNav}
              className="p-4 flex flex-row justify-between items-center border-b"

            >
              <Link href="/entertainment" className="  text-2xl hover:text-[#c4132a] pl-10">मनोरंजन</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>
            <li
              onClick={handleNav}
              className="p-4 flex flex-row justify-between items-center border-b"
            >
              <Link href="/lifestyle" className="  text-2xl hover:text-[#c4132a] pl-10">लाइफस्टाइल</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>
            <li
              onClick={handleNav}
              className="p-4 flex flex-row justify-between items-center border-b"
            >
              <Link href="/technology" className="  text-2xl hover:text-[#c4132a] pl-10">टेक्नोलॉजी</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>
            <li
              onClick={handleNav}
              className="p-4 flex flex-row justify-between items-center border-b"
            >
              <Link href="/finance" className="  text-2xl hover:text-[#c4132a] pl-10">फाइनेंस</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>
            <li
              onClick={handleNav}
              className="p-4 flex flex-row justify-between items-center border-b"
            >
              <Link href="/sports" className="  text-2xl hover:text-[#c4132a] pl-10">खेल</Link>
              <span className="pr-2">
                <MdArrowForwardIos />
              </span>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
