import Image from "next/image";
import { useState } from "react";

import Logo from "../../public/assets/Logo.svg";
import { sidebarItems } from "@/utils/constants";
import CloseIcon from "../../public/assets/CloseIcon-Gray.svg";

interface SidebarProps {
  setShowDrawer: (showDrawer: boolean) => void;
}

export default function Sidebar({ setShowDrawer }: SidebarProps) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleToggleSidebar = () => {
    setShowDrawer(false);
  };

  return (
    <div className="w-full h-screen rounded-tr-[30px] rounded-br-[30px] md:rounded-tr-none md:rounded-br-none bg-white flex flex-col">
      <div className="flex w-full justify-between items-center px-5 mt-[31px] mb-[50px]">
        <div className="flex w-fit gap-3.5 items-center justify-center select-none">
          <div className="hidden sm:block">
            <Image src={Logo} alt="Logo" width={42} height={42} />
          </div>
          <div className="sm:hidden">
            <Image src={Logo} alt="Logo" width={30} height={30} />
          </div>
          <div className="text-[#030229] text-xl sm:text-2xl font-semibold">
            Base
          </div>
        </div>
        <div
          className="w-3 h-3 cursor-pointer md:hidden"
          onClick={handleToggleSidebar}
        >
          <Image
            src={CloseIcon}
            alt="Close"
            width={12}
            height={12}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-[14px] select-none cursor-default"
          >
            <div
              className={`pl-8 py-2 ${
                selectedIndex === index
                  ? `bg-gradient-to-r from-violet-100 to-transparent`
                  : ``
              }`}
            >
              <Image src={item.icon} alt={item.title} width={24} height={24} />
            </div>
            <div
              className={`${
                selectedIndex === index ? `text-[#605BFF]` : `text-[#9A9AA9]`
              } font-semibold pr-8 py-2`}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
