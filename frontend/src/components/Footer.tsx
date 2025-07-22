import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full p-2">
      <div className="bg-primary p-6 w-full h-full rounded-[1rem]">
        <div className="flex-row flex justify-between p-6">
          <div className="w-1/2 p-6 text-secondary font-bold">
            <h1 className=" text-8xl">TICKERZ</h1>

            <p className="max-w-md  text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              provident nihil hic deserunt obcaecati voluptatem sequi placeat
              cumque repellendus quis expedita quidem ea consequatur possimus
              tenetur, quia voluptatum delectus ipsum!
            </p>
          </div>
          <div className="w-1/2 p-6 flex flex-row justify-end text-secondary font-bold">
            <div className="flex flex-col gap-4 ">
              <h4 className="text-5xl ">Menu</h4>
              <ul className="text-3xl flex gap-2 flex-col">
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between pl-6 pr-6 items-center">
          <h4 className="font-bold text-xl">
            developed by{" "}
            <Link href={"https://portafolio-indol.vercel.app/"} target="_blank">
              TMGC
            </Link>
          </h4>
          <Image
            src="/img/logo.png"
            alt="Logo Tickerz"
            width={100}
            height={100}
            className="p-2 object-contain"
          />
          <div className="flex flex-row gap-4">
            <FaInstagram color="#7C2303" size={52} />
            <FaLinkedinIn color="#7C2303" size={52} />
            <FaTiktok color="#7C2303" size={52} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
