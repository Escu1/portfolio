import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import { BoxCorner } from "@/hanabi-assets";
import Image from "next/image";
import { CountdownRenderProps } from "react-countdown";
import "./globals.css";
import { TimerProps } from "./leaderboard.types";

const montserrat = Montserrat({
  weight: "800",
  subsets: ["latin"],
});

const Countdown = dynamic(() => import("react-countdown"), {
  ssr: false,
});

export const Timer: React.FC<TimerProps> = ({ onComplete }) => {
  const cullTime = getCullTime();
  const startDate = dayjs.utc("2025-10-26T07:00:00Z");
  let displayDate = "";
  if (cullTime.isBefore(startDate)) {
    displayDate = startDate.toISOString();
  } else displayDate = cullTime.toISOString();

  return (
    <div className="corner-border-container w-full max-w-screen-lg mx-auto px-4 relative md:w-[40%]">
      <Image
        className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 pointer-events-none"
        src={BoxCorner}
        width={80}
        height={80}
        alt="Corner assets"
      />
      <div className="grid justify-items-center items-center gap-1 py-2">
        <p className="text-xl md:text-3xl text-black text-center">
          TIMER TO ELIMINATION
        </p>
        <div className="text-xl md:text-3xl text-black w-full">
          <Countdown
            date={displayDate}
            onComplete={onComplete}
            renderer={(props: CountdownRenderProps) => {
              const { days, hours, minutes, seconds } = props;
              return (
                <div
                  className={`${montserrat.className} flex w-full max-w-[450px] h-[80px] md:h-[120px] bg-white rounded-3xl md:rounded-4xl min-h-full text-3xl md:text-[4rem] justify-center items-center mx-auto`}
                >
                  {formatTime(days * 24 + hours)}:{formatTime(minutes)}:
                  {formatTime(seconds)}
                </div>
              );
            }}
          />
        </div>
      </div>
      <Image
        className="absolute bottom-0 right-0 w-12 h-12 md:w-20 md:h-20 pointer-events-none"
        src={BoxCorner}
        width={80}
        height={80}
        alt="Corner assets"
        style={{ transform: "rotate(180deg)" }}
      />
    </div>
  );
};

const getCullTime = () => {
  dayjs.extend(utc);
  const currentTime = dayjs.utc();
  let cullTime = dayjs.utc().hour(8).minute(0).second(0).millisecond(0);
  if (cullTime.isBefore(currentTime)) {
    cullTime = cullTime.add(1, "day");
  }
  return cullTime;
};

const formatTime = (num: number): string => {
  if (num < 10) return "0" + num;
  else return num.toString();
};
