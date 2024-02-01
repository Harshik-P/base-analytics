import Image from "next/image";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import leftlayout from "../public/assets/left-layout.png";
import GitHub from "../public/assets/Github.svg";
import Twitter from "../public/assets/Twitter.svg";
import LinkedIn from "../public/assets/LinkedIn.svg";
import Discord from "../public/assets/Discord.svg";
import LandingPageLogo from "../public/assets/LandingPageLogo.svg";
import Google from "../public/assets/Google.svg";
import Apple from "../public/assets/Apple.svg";
import GitHubGray from "../public/assets/GitHub-Grey.svg";
import TwitterGray from "../public/assets/Twitter-Gray.svg";
import LinkedInGray from "../public/assets/LinkedIn-Gray.svg";
import DiscordGray from "../public/assets/Discord-Gray.svg";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: sessionUser } = useSession();

  if (sessionUser) {
    router.replace("/dashboard");
  }

  const handleLogin = () => {
    signIn("google");
  };

  return (
    <div className="relative flex w-full">
      <div className="hidden md:block md:w-[45%] lg:w-1/2">
        <div className="md:flex select-none absolute top-0 bottom-0 -z-10 hidden md:w-[45%] lg:w-1/2 justify-start h-screen">
          <Image src={leftlayout} alt="left-layout" fill />
        </div>
        <div className="w-[85%] h-screen">
          <div className="absolute top-10 left-10">
            <Image
              src={LandingPageLogo}
              alt="Logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center pt-10 justify-center h-[calc(100%-76px)]">
            <div className="text-[#FFFFFF] select-none font-bold md:text-6xl lg:text-7xl">
              BASE
            </div>
          </div>
          <div className="flex justify-center md:gap-5 lg:gap-9 h-[76px] pb-5 items-center">
            <Image src={GitHub} alt="GitHub" width={30} height={30} />
            <Image src={Twitter} alt="Twitter" width={30} height={30} />
            <Image src={LinkedIn} alt="LinkedIn" width={35} height={35} />
            <Image src={Discord} alt="Discord" width={38} height={38} />
          </div>
        </div>
      </div>
      <div className="w-full md:w-[55%] lg:w-1/2 md:pl-8 lg:pl-14 md:pr-6 lg:pr-10 flex flex-col justify-center items-start">
        <div className="bg-[#605BFF] md:hidden mb-7 sm:mb-4 w-full h-14 flex gap-2 sm:gap-5 items-center px-10">
          <Image
            src={LandingPageLogo}
            alt="Logo"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <div className="text-[#FAFAFB] font-semibold text-xl">Base</div>
        </div>
        <div className="px-4 sm:px-0 md:block sm:flex sm:flex-col sm:items-center md:items-start w-full sm:w-full md:w-fit">
          <div className="ml-2.5 sm:ml-0 text-black text-2xl font-semibold md:text-3xl lg:text-4xl md:font-bold">
            Sign In
          </div>
          <div className="ml-2.5 sm:ml-0 text-black text-xs md:text-base mt-2 md:mt-2.5">
            Sign in to your account
          </div>
          <div className="flex items-center gap-8 my-5 md:my-7">
            <div className="h-8 w-[45%] sm:w-44 md:w-40 lg:w-44 md:rounded-lg lg:rounded-xl bg-white flex justify-center items-center gap-3.5">
              <Image src={Google} alt="Google" width={15} height={15} />
              <div
                className="text-[#858585] text-[10px] cursor-pointer md:text-xs"
                onClick={handleLogin}
              >
                Sign in with Google
              </div>
            </div>
            <div className="h-8 w-[45%] sm:w-44 md:w-40 lg:w-44 rounded-xl bg-white flex justify-center items-center gap-3.5">
              <Image src={Apple} alt="Apple" width={15} height={15} />
              <div className="text-[#858585] text-[10px] md:text-xs">
                Sign in with Apple
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl w-full p-4 md:p-6 lg:p-8">
              <div className="text-black text-sm md:text-base mb-2 md:mb-[11px]">
                Email address
              </div>
              <input
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#F5F5F5] h-8 md:h-10 w-full sm:w-[350px] md:w-[300px] lg:w-[350px] rounded-lg outline-none px-2.5"
              />
              <div className="text-black text-sm md:text-base mt-[22px] mb-2 md:mb-[11px]">
                Password
              </div>
              <input
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-[#EAEAEA] h-8 md:h-10 w-full sm:w-[350px] md:w-[300px] lg:w-[350px] rounded-lg outline-none px-2.5"
              />
              <div className="my-5 text-sm md:text-base md:my-[22px] text-[#346BD4]">
                Forgot Password?
              </div>
              <button
                className="bg-[#605BFF] rounded-[10px] w-full sm:w-[350px] md:w-[300px] lg:w-[350px] h-8 md:h-10 text-white font-bold"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
            <div className="flex flex-col items-center text-sm md:text-base md:flex-row mt-[22px]">
              <span className="text-[#858585]">
                Don&apos;t have an account?
              </span>
              <span className="text-[#346BD4]">&nbsp;Register here</span>
            </div>
            <div className="md:hidden mt-6 mb-3 flex justify-center items-center gap-3">
              <Image src={GitHubGray} alt="GitHub" width={21} height={21} />
              <Image src={TwitterGray} alt="Twitter" width={22} height={22} />
              <Image src={LinkedInGray} alt="LinkedIn" width={26} height={26} />
              <Image src={DiscordGray} alt="Discord" width={28} height={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
