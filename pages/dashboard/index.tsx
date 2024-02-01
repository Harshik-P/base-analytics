import { useState } from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";

import Sidebar from "@/components/Sidebar";
import DashboardContainer from "@/components/DashboardContainer";
import { AppRoutes } from "@/utils/routes";

interface DashboardProps {
  session: Session | null;
}

export default function Dashboard({ session }: DashboardProps) {
  const [showDrawer, setShowDrawer] = useState(false);

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
        profilePicture={session?.user?.image}
        setShowDrawer={setShowDrawer}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
      redirect: {
        destination: AppRoutes.login,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
};
