import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <nav className="h-22 w-full top-0 p-2 fixed z-10 ">
      <div className="w-full h-full  mx-auto rounded-full sticky bg-white flex justify-center items-center px-2">
        <Image
          src="/img/logo.png"
          alt="Logo Tickerz"
          width={100}
          height={100}
          className="p-2 object-contain"
        />
      </div>
    </nav>
  );
};

export default NavBar;
