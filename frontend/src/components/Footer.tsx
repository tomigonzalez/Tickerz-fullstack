import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-screen p-2">
      <div className="bg-primary w-full h-full rounded-[1rem]">
        <div></div>
        <div className="w-full">
          <h4 className="font-bold">
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
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/tgyvxauj.json"
              trigger="in"
              delay="1500"
              stroke="bold"
              state="in-reveal"
              colors="primary:#7c2303,secondary:#7c2303"
              style="width:250px;height:250px"
            ></lord-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
