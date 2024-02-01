import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

import Sidebar from "@/components/Sidebar";
import DashboardContainer from "@/components/DashboardContainer";
import { AppRoutes } from "@/utils/routes";

export default function Dashboard() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { data: sessionUser } = useSession();

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: AppRoutes.login,
      },
    };
  }

  return {
    props: {},
  };
};
