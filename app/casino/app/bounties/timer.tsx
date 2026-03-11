import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import { CountdownRenderProps } from "react-countdown";
import "./globals.css";
import { TimerProps } from "../casino.types";

const montserrat = Montserrat({
  weight: "800",
  subsets: ["latin"],
});

const Countdown = dynamic(() => import("react-countdown"), {
  ssr: false,
});

export const Timer: React.FC<TimerProps> = ({ onComplete, time }) => {
  dayjs.extend(utc);
  const now = dayjs();
  const remainingTime = time.diff(now) > 0 ? time.toDate() : now.toDate();

  return (
    <div className="corner-border-container w-full max-w-screen-lg mx-auto px-4 relative md:w-[40%]">
      <Countdown
        date={remainingTime}
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
  );
};

const formatTime = (num: number): string => {
  if (num < 10) return "0" + num;
  else return num.toString();
};
