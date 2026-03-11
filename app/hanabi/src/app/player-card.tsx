import { PlayerCardProps, Rank } from "./leaderboard.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Iron,
  Bronze,
  Silver,
  Gold,
  Platinum,
  Diamond,
  Meteorite,
  Mythril,
  Immortal,
  Twitch,
  NoTwitch,
  Youtube,
  NoYoutube,
  Twitter,
  NoTwitter,
  Dak,
  NoDak,
  Unranked,
} from "../assets/index";

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  leaderRank,
  icon,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        linksRef.current &&
        !linksRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const rankImage: Rank = getRankFromRP(player.mmr);
  const twitchImage =
    player.twitch === "" ? (
      <Image src={NoTwitch} width={44} height={44} alt="Twitch icon" />
    ) : (
      <a href={player.twitch} target="_blank">
        <Image src={Twitch} width={44} height={44} alt="Twitch icon" />
      </a>
    );
  const youtubeImage =
    player.youtube === "" ? (
      <Image src={NoYoutube} width={44} height={44} alt="Youtube icon" />
    ) : (
      <a href={player.youtube} target="_blank">
        <Image src={Youtube} width={44} height={44} alt="Youtube icon" />
      </a>
    );
  const twitterLink =
    player.twitter === "" ? (
      <Image src={NoTwitter} width={44} height={44} alt="Twitter icon" />
    ) : (
      <a href={player.twitter} target="_blank">
        <Image src={Twitter} width={44} height={44} alt="Twitter icon" />
      </a>
    );
  const dakLink =
    player.dak === "" ? (
      <Image src={NoDak} width={44} height={44} alt="Dak icon" />
    ) : (
      <a href={player.dak} target="_blank">
        <Image src={Dak} width={44} height={44} alt="Dak icon" />
      </a>
    );
  const borderColour =
    player.culled === null
      ? player.indanger
        ? "border-[#ff0101] shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ff0101,0_0_15px_#ff0101,0_0_30px_#ff0101]"
        : "border-[#00ff5a] shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#00ff5a,0_0_15px_#00ff5a,0_0_30px_#00ff5a]"
      : "border-[#000000] shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#000000,0_0_15px_#000000,0_0_30px_#000000]";

  const bgColor = player.culled === null ? "bg-white" : "bg-neutral-200";

  const commonStyle = `grid gap-2 p-4 items-center border ${bgColor} ${borderColour} rounded-lg text-neutral-800 w-full text-xs`;

  return (
    <div className={`md:grid-cols-[5fr_6fr] ${commonStyle}`}>
      <div className="flex flex-row md:grid md:grid-cols-[1fr_1fr_3fr] gap-2 items-center">
        <p className="text-lg md:col-start-1 flex items-center">
          {"#" + leaderRank}
        </p>
        <Image
          src={icon}
          width={50}
          height={50}
          alt="Profile icon"
          className="md:col-start-2 my-auto"
        />
        <div className="col-span-2 md:col-span-1 md:col-start-3 flex flex-col justify-center">
          <p className="text-wrap break-all ">{player.name}</p>
          {player.indanger && (
            <p className="text-[#ff0101]">RISK OF ELIMINATION</p>
          )}
          {player.culled !== null && (
            <p className="text-[#ff0101]">{`Eliminated on day ${player.culled}`}</p>
          )}
        </div>
      </div>
      <div className="flex flex-row-reverse place-content-between md:grid md:grid-cols-[3fr_2fr] gap-2 items-center">
        <div className="relative col-start-3 md:col-start-4 flex items-center justify-center">
          <div ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="md:hidden bg-blue-500 text-white p-2 rounded"
            >
              Links
            </button>
          </div>
          <div
            ref={linksRef}
            className={`flex flex-col md:flex-row items-center gap-2 md:gap-4 ${
              isDropdownOpen
                ? "absolute top-full right-0 bg-white p-2 shadow-md rounded z-10"
                : "hidden md:flex"
            }`}
          >
            <span>{twitchImage}</span>
            <span>{youtubeImage}</span>
            <span>{twitterLink}</span>
            <span>{dakLink}</span>
          </div>
        </div>
        <div className="flex items-center gap-x-[8px] col-start-2 md:col-start-5 md:w-[145px] space-between">
          <div className="rounded-full flex items-center min-w-[44]">
            {rankImage.icon}
          </div>
          <div className="flex flex-col">
            <p>{rankImage.name}</p>
            <p>{player.mmr ? player.mmr + " RP" : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const getRankFromRP = (MMR: number) => {
  if (MMR === null)
    return {
      icon: <Image src={Unranked} width={44} height={44} alt="Unranked icon" />,
      name: "Unranked",
    };
  if (MMR < 600)
    return {
      icon: <Image src={Iron} width={44} height={44} alt="Iron icon" />,
      name: "Iron",
    };
  if (MMR < 1400)
    return {
      icon: <Image src={Bronze} width={44} height={44} alt="Bronze icon" />,
      name: "Bronze",
    };
  if (MMR < 2400)
    return {
      icon: <Image src={Silver} width={44} height={44} alt="Silver icon" />,
      name: "Silver",
    };
  if (MMR < 3600)
    return {
      icon: <Image src={Gold} width={44} height={44} alt="Gold icon" />,
      name: "Gold",
    };
  if (MMR < 5000)
    return {
      icon: <Image src={Platinum} width={44} height={44} alt="Platinum icon" />,
      name: "Platinum",
    };
  if (MMR < 6400)
    return {
      icon: <Image src={Diamond} width={44} height={44} alt="Diamond icon" />,
      name: "Diamond",
    };
  if (MMR < 7100)
    return {
      icon: (
        <Image src={Meteorite} width={44} height={44} alt="Meteorite icon" />
      ),
      name: "Meteorite",
    };
  if (MMR < 7800)
    return {
      icon: <Image src={Mythril} width={44} height={44} alt="Mythril icon" />,
      name: "Mythril",
    };
  else
    return {
      icon: <Image src={Immortal} width={44} height={44} alt="Immortal icon" />,
      name: "Immortal",
    };
};
