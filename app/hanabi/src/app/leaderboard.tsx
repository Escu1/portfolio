"use client";
import { Banner, Discord, Twitter } from "@/hanabi-assets";

import { Timer } from "./timer";
import { PlayerCard } from "./player-card";
import { Bounty, PlayerInfo } from "./leaderboard.types";
import Image, { StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  PlaceholderIcon,
  Baowser,
  Bunu,
  Camper,
  Chibi,
  Coraline,
  Deus,
  Eklispe,
  Else,
  Frankie,
  Fwitchu,
  Gallazor,
  Geb,
  Gemos,
  Gryph,
  Hercules,
  Hresvelg,
  InternetRap,
  Isterio,
  J7ang,
  Jast,
  Jignut,
  Khaosfire,
  Kittykang,
  Lockne,
  Magecraft,
  Neotep,
  Nesious,
  Nynykash,
  Passant,
  Radeent,
  Raven,
  Rin,
  Rymrinth,
  Sacra,
  Shy929,
  Starbie,
  Stormdrag,
  Strikxer,
  Superior,
  Wisu,
  Wokez,
  Xelias,
  Xtro,
  Yeomla,
  Yookay,
} from "@/assets/player-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ToggleButton } from "./toggle-button";
import { BountyList } from "./bounties";

export const Leaderboard: React.FC = () => {
  dayjs.extend(utc);

  const [players, setPlayers] = useState<PlayerInfo[] | null>(null);

  const [bounties, setBounties] = useState<Bounty[] | null>(null);

  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const [showBounties, setShowBounties] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [playersRes, bountiesRes] = await Promise.all([
        fetch("/hanabi/players.json", { cache: "no-store" }),
        fetch("/hanabi/bounties.json", { cache: "no-store" }),
      ]);

      const [playersJson, bountiesJson] = await Promise.all([
        playersRes.json(),
        bountiesRes.json(),
      ]);

      // Update players
      if (
        JSON.stringify(playersJson.players) !== JSON.stringify(players) ||
        JSON.stringify(dayjs.utc().diff(playersJson.meta.time, "minutes")) !==
          JSON.stringify(lastUpdated)
      ) {
        setPlayers(sortData(playersJson.players));
        setLastUpdated(dayjs.utc().diff(playersJson.meta.time, "minutes"));
      }

      // Update bounties
      if (bountiesJson?.bounties) {
        const sortedBounties = bountiesJson.bounties.sort(
          (a: Bounty, b: Bounty) => {
            if (a.Cleared !== b.Cleared) {
              return Number(a.Cleared) - Number(b.Cleared);
            }
            return b.Money - a.Money;
          },
        );
        setBounties(sortedBounties);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }, [lastUpdated, players]);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval
    const interval = setInterval(fetchData, 30000); // 30,000 ms = 30 seconds

    // Clean up on unmount
    return () => clearInterval(interval);
  }, [fetchData]);

  return players && bounties ? (
    <>
      <div className="flex flex-col items-center justify-items-center min-h-full p-4 pb-16 gap-8 sm:gap-16 sm:p-20">
        <Image
          src={Banner}
          alt="Event header banner"
          className="w-full md:max-w-[50%]"
        />
        <div className="flex flex-col gap-4 mb-[-8%] md:mb-0 text-black md:text-3xl">
          Event Socials
          <div className="flex flex-row w-full gap-4 justify-center items-center">
            <a href="https://discord.gg/23Z7RxUnGk" target="_blank">
              <Image
                src={Discord}
                alt="Event discord icon"
                width={48}
                height={48}
                className="w-[48px] h-[48px] md:w-[78px] md:h-[78px]"
              />
            </a>
            <a href="https://x.com/CupHanabi" target="_blank">
              <Image
                src={Twitter}
                alt="Event twitter icon"
                width={48}
                height={48}
                className="w-[48px] h-[48px] md:w-[78px] md:h-[78px]"
              />
            </a>
          </div>
        </div>
        <Timer onComplete={() => fetchData()} />
        <div className="flex flex-col md:max-w-[50%] md:w-[50%]">
          <div className="flex flex-row mb-4 justify-between items-center text-[0.6rem] text-black">
            {`Last updated: ${lastUpdated} minutes ago`}
            <div className="flex flex-row justify-end items-center md:gap-2">
              <p className="text-center">Show bounties</p>
              <ToggleButton
                id={"bounty"}
                enabled={showBounties}
                onChange={setShowBounties}
                disabled={false}
              />
            </div>
          </div>
          {showBounties ? (
            <BountyList Bounties={bounties} />
          ) : (
            <div className="flex flex-col gap-8">
              {players.map((player, idx) => {
                return (
                  <PlayerCard
                    key={idx}
                    player={player}
                    leaderRank={idx + 1}
                    icon={getPlayerIcon(player.name)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* <FloatingSocialLink href={""} /> */}
    </>
  ) : null;
};

const sortData = (players: PlayerInfo[]) => {
  players.sort((a, b) => {
    // Non-culled players always come first
    if (a.culled && !b.culled) return 1;
    if (!a.culled && b.culled) return -1;

    // If both are culled, sort by smaller culled number (ascending)
    if (a.culled && b.culled) {
      return (b.culled ?? 0) - (a.culled ?? 0);
    }

    // Otherwise, sort by MMR descending
    return b.mmr - a.mmr;
  });

  return players;
};

const getPlayerIcon = (name?: string) => {
  if (!name || typeof name !== "string") return playerIcons["Placeholder"];
  return playerIcons[name.toLowerCase()] || playerIcons["Placeholder"];
};

const playerIcons: Record<string, StaticImageData> = {
  Placeholder: PlaceholderIcon,
  isterio: Isterio,
  gallazor: Gallazor,
  camperonduty: Camper,
  coraiineswife: Coraline,
  mrowwwwwwwwwwwww: Kittykang,
  wokez: Wokez,
  internetrap: InternetRap,
  wis: Wisu,
  frankiedoodle: Frankie,
  passant: Passant,
  neotep: Neotep,
  북미이터물로켓슛: Rin,
  rymrinth: Rymrinth,
  xelias: Xelias,
  eklispe: Eklispe,
  strikxer: Strikxer,
  geb: Geb,
  hercules: Hercules,
  bunubunuson: Bunu,
  chibiarc: Chibi,
  chrom: Radeent,
  hresvelg: Hresvelg,
  gryph: Gryph,
  baowser: Baowser,
  superior: Superior,
  gemos: Gemos,
  j7ang: J7ang,
  actorthatispaid: Stormdrag,
  elseorelse: Else,
  fwitchu: Fwitchu,
  locknelive: Lockne,
  yeomla: Yeomla,
  ravenbergier: Raven,
  jast: Jast,
  starbie: Starbie,
  nesious: Nesious,
  jignutjorgeston: Jignut,
  xtrogames: Xtro,
  deusxm: Deus,
  yeguhbadha: Yookay,
  magecraft: Magecraft,
  khaosfire: Khaosfire,
  sacra: Sacra,
  shy929love: Shy929,
  nynykash: Nynykash,
};
