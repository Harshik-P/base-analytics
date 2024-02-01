import Image from "next/image";

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
  const handleToggleSidebar = () => {
    setShowDrawer(true);
  };

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
          <Image
            src={profilePicture ? profilePicture : ProfilePic}
            alt="ProfilePic"
            width={30}
            height={30}
            className="rounded-full"
          />
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
