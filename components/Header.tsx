"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import {
  BiHome,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiSearch,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handleLogout = () => {
    // logout
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-70 transition p-1"
          >
            <BiLeftArrowAlt className="text-white" size={24} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-70 transition p-1"
          >
            <BiRightArrowAlt className="text-white" size={24} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-70 transition">
            <BiHome className="text-black" size={24} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-70 transition">
            <BiSearch className="text-black" size={24} />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          <Button className="bg-transparent text-neutral-300 font-medium">
            Sign up
          </Button>
          <Button className="bg-white px-6 py-2 w-auto">Login</Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
