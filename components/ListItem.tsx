"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BiPlay } from "react-icons/bi";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const onChangeRoute = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onChangeRoute}
      className="relative flex items-center rounded-md group overflow-hidden gap-x-3 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="liked" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-2 drop-shadow-md right-4 group-hover:opacity-100 hover:scale-110">
        <BiPlay size={24} className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
