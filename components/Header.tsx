"use client";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  BiHome,
  BiLeftArrowAlt,
  BiRightArrowAlt,
  BiSearch,
  BiUser,
} from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    // logout
    const { error } = await supabaseClient.auth.signOut();

    // reset any playing song
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
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
        {user ? (
          <div className="flex gap-x-4 items-center">
            <Button onClick={handleLogout} className="bg-white px-6 py-2">
              Logout
            </Button>
            <Button
              onClick={() => router.push("/account")}
              className="bg-white"
            >
              <BiUser />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center gap-x-4">
              <Button
                onClick={authModal.onOpen}
                className="bg-transparent text-neutral-300 font-medium"
              >
                Sign up
              </Button>
              <Button
                onClick={authModal.onOpen}
                className="bg-white px-6 py-2 w-auto"
              >
                Login
              </Button>
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
