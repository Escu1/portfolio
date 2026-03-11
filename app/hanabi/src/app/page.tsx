import { Leaderboard } from "./leaderboard";
import { Garnet, Branches, Lanterns } from "@/hanabi-assets";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="background-diamonds"></div>
      <AssetPage />
    </>
  );
}

const AssetPage = () => {
  return (
    <div className="lg: grid gap-4 overflow-x-hidden items-stretch overflow-y-visible">
      <div className="hidden lg:block fixed top-0 left-0 w-[85vw] h-[100vh] pointer-events-none z-50 overflow-x-visible overflow-y-visible translate-x-[-2%]">
        <Image
          src={Garnet}
          alt={"Image of Garnet"}
          className="w-full h-full object-fill"
        />
      </div>
      <Leaderboard />
      <div>
        <div className="hidden lg:block fixed top-0 right-0 translate-x-[5%] translate-y-[0%] w-[25vw] h-[25vh] pointer-events-none z-50">
          <Image
            src={Lanterns}
            alt={"Image of lanterns"}
            className="w-full h-full object-fill"
          />
        </div>
        <div className="hidden lg:block fixed bottom-0 right-0 translate-x-[20%] translate-y-[30%] w-[25%] h-[75%] pointer-events-none z-50">
          <Image
            src={Branches}
            alt="Image of branches"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
