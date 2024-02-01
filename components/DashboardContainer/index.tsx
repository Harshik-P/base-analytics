import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

import NotificationIcon from "../../public/assets/Notification-Navbar.svg";
import ProfilePic from "../../public/assets/ProfilePic.svg";
import Analytics from "../Analytics";
import Logo from "../../public/assets/Logo.svg";
import Hamburger from "../../public/assets/Hamburger.svg";

interface DashboardContainerProps {
  profilePicture?: string | null;
  setShowDrawer: (showDrawer: boolean) => void;
}

export default function DashboardContainer({
  profilePicture,
  setShowDrawer,
}: DashboardContainerProps) {
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);

  const handleToggleSidebar = () => {
    setShowDrawer(true);
  };

  const handleLogout = () => {
    setShowLogout(false);
    signOut();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full md:px-[30px] md:py-[30px] overflow-hidden">
      <div className="flex justify-between px-6 py-5 md:px-0 md:py-0 bg-white md:bg-[#F8FAFF] items-center">
        <div className="md:hidden">
          <div className="flex gap-2.5 sm:gap-3.5 items-center justify-center select-none mr-2 sm:mr-0">
            <div className="flex gap-4 items-center">
              <div className="cursor-pointer" onClick={handleToggleSidebar}>
                <Image src={Hamburger} alt="Logo" width={15} height={15} />
              </div>
              <div className="w-6 h-6">
                <Image src={Logo} alt="Logo" width={24} height={24} />
              </div>
            </div>
            <div className="text-[#030229] text-xl font-semibold">Base</div>
          </div>
        </div>
        <div className="text-2xl hidden md:block font-semibold">Upload CSV</div>
        <div className="flex h-fit gap-3 sm:gap-7">
          <Image
            src={NotificationIcon}
            alt="Notification"
            width={18}
            height={23}
          />
          <div className="relative">
            <Image
              src={profilePicture ? profilePicture : ProfilePic}
              alt="ProfilePic"
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            />
            {showLogout ? (
              <div
                ref={logoutRef}
                className="absolute top-10 right-0 z-10 rounded-lg px-2 py-1 bg-white flex justify-center items-center cursor-pointer"
              >
                <div
                  className="hover:bg-[#F8FAFF] px-3 py-1.5 hover:rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="text-[#030229] font-bold md:hidden mt-5 mx-10">
        Upload CSV
      </div>
      <div className="px-6 pb-5 md:px-0 md:py-0">
        <Analytics />
      </div>
    </div>
  );
}
