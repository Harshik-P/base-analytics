import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Sidebar from "@/components/Sidebar";
import DashboardContainer from "@/components/DashboardContainer";

export default function Dashboard() {
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();
  const { data: sessionUser } = useSession();

  useEffect(() => {
    if (!sessionUser) {
      router.replace("/");
    }
  }, [sessionUser, router]);

  return (
    <div className="flex relative w-full">
      <div
        className={`absolute z-10 inset-y-0 left-0 w-full md:relative sm:w-[218px] transform md:translate-x-0 transition duration-100 ease-in-out ${
          showDrawer ? `` : `-translate-x-full`
        }`}
      >
        <Sidebar setShowDrawer={setShowDrawer} />
      </div>
      <DashboardContainer
        profilePicture={sessionUser?.user?.image}
        setShowDrawer={setShowDrawer}
      />
    </div>
  );
}
