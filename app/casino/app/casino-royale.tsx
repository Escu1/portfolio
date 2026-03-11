"use client";

import { useState, useEffect } from "react";
import { Bounty } from "./casino.types";
import * as Assets from "@/assets";
import Image from "next/image";
import { BountyList } from "./bounties/bounties";
import { CasinoSignboard } from "./signboard/signboard";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export const CasinoRoyale: React.FC = () => {
  dayjs.extend(utc);

  const [bounties, setBounties] = useState<Bounty[] | null>(null);

  const Players = [
    {
      Name: "AyaOwO",
      Icon: Assets.AyaOwO,
      Twitter: "https://x.com/AyaOwO_VT",
      Twitch: "Twitch.tv/AyaOwO",
      YouTube: "",
    },
    {
      Name: "Baowser",
      Icon: Assets.Baowser,
      Twitter: "",
      Twitch: "https://twitch.tv/baowser_1",
      YouTube: "",
    },
    {
      Name: "Bendth",
      Icon: Assets.Shy,
      Twitter: "",
      Twitch: "https://www.twitch.tv/shy_929love",
      YouTube: "https://www.youtube.com/@shy929love-flovr",
    },
    {
      Name: "CamperOnDuty",
      Icon: Assets.CamperOnDuty,
      Twitter: "",
      Twitch: "https://www.twitch.tv/camperonduty",
      YouTube: "",
    },
    {
      Name: "CasterLogic",
      Icon: Assets.CasterLogic,
      Twitter: "https://x.com/CasterLogic",
      Twitch: "https://www.twitch.tv/CASTERLOGIC",
      YouTube: "https://www.youtube.com/@CasterLogic",
    },
    {
      Name: "CorvideusCrow",
      Icon: Assets.CorvideusCrow,
      Twitter: "https://x.com/CorvideusCrow",
      Twitch: "https://www.twitch.tv/corvideuscrow",
      YouTube: "https://www.youtube.com/@corvideuscrow",
    },
    {
      Name: "Courier",
      Icon: Assets.Courier,
      Twitter: "",
      Twitch: "https://www.twitch.tv/courierfive",
      YouTube: "",
    },
    {
      Name: "DianDestroyer",
      Icon: Assets.Diandestroyer,
      Twitter: "",
      Twitch: "https://www.twitch.tv/diandestroyer",
      YouTube: "",
    },
    {
      Name: "Eklispe",
      Icon: Assets.Eklispe,
      Twitter: "",
      Twitch: "https://www.twitch.tv/eklisped",
      YouTube: "https://www.youtube.com/@EklispeVideos",
    },
    {
      Name: "Ezter",
      Icon: Assets.Ezter,
      Twitter: "https://x.com/FreeSouluz",
      Twitch: "https://www.twitch.tv/ezterr",
      YouTube: "https://www.youtube.com/@ezter12",
    },
    {
      Name: "Frankiedoodle",
      Icon: Assets.FrankieDoodle,
      Twitter: "",
      Twitch: "https://www.twitch.tv/frankiedoodle7",
      YouTube: "",
    },
    {
      Name: "FreeStratos",
      Icon: Assets.FreeStratos,
      Twitter: "",
      Twitch: "https://twitch.tv/freestratoszzz",
      YouTube: "https://youtube.com/@zhumanchuie",
    },
    {
      Name: "GallaZor",
      Icon: Assets.Gallazor,
      Twitter: "https://x.com/gallazor_",
      Twitch: "https://www.twitch.tv/gallazor_",
      YouTube: "https://www.youtube.com/@GallaZor",
    },
    {
      Name: "Geb",
      Icon: Assets.Geb,
      Twitter: "",
      Twitch: "https://www.twitch.tv/attackspeedgeb",
      YouTube: "https://www.youtube.com/channel/UCnR-rd4w8MDP8vJpphFBXQw",
    },
    {
      Name: "Grubbz",
      Icon: Assets.Grubb,
      Twitter: "https://x.com/grubb1nz",
      Twitch: "https://www.twitch.tv/grubb1nz",
      YouTube: "https://www.youtube.com/@grubbiez",
    },
    {
      Name: "Hresvelg",
      Icon: Assets.Hresvelg,
      Twitter: "",
      Twitch: "https://www.twitch.tv/hresvilg",
      YouTube: "https://www.youtube.com/@Schwoogs",
    },
    {
      Name: "J7ang",
      Icon: Assets.J7ang,
      Twitter: "https://x.com/J7angERBS",
      Twitch: "https://www.twitch.tv/j7ang",
      YouTube: "https://www.youtube.com/@j7ang",
    },
    {
      Name: "Jast",
      Icon: Assets.Jast,
      Twitter: "",
      Twitch: "https://www.twitch.tv/jast107",
      YouTube: "https://www.youtube.com/@jast107/videos",
    },
    {
      Name: "Jignutjorgeston",
      Icon: Assets.Jignutjorgeston,
      Twitter: "",
      Twitch: "https://www.twitch.tv/jignutjorgeston",
      YouTube: "",
    },
    {
      Name: "NeoTep",
      Icon: Assets.Neotep,
      Twitter: "https://x.com/neo_tep",
      Twitch: "https://www.twitch.tv/neo_tep",
      YouTube: "https://www.youtube.com/@neo_tep",
    },
    {
      Name: "Passant",
      Icon: Assets.Passant,
      Twitter: "https://x.com/in_passant",
      Twitch: "https://www.twitch.tv/inpassant",
      YouTube: "https://www.youtube.com/@in_passant",
    },
    {
      Name: "PikaP",
      Icon: Assets.PikaP,
      Twitter: "",
      Twitch: "twitch.tv/pikapikalis",
      YouTube: "https://www.youtube.com/@pikapeen",
    },
    {
      Name: "RavenBergier",
      Icon: Assets.RavenBergier,
      Twitter: "",
      Twitch: "https://www.twitch.tv/RavenBergier",
      YouTube: "",
    },
    {
      Name: "Steelergirl",
      Icon: Assets.Steelergirl,
      Twitter: "",
      Twitch: "https://www.twitch.tv/steelergirl101101",
      YouTube: "",
    },
    {
      Name: "Superior",
      Icon: Assets.Superior,
      Twitter: "https://x.com/Superi0r11",
      Twitch: "https://www.twitch.tv/superi0r1",
      YouTube: "https://www.youtube.com/@superior9620",
    },
  ];

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const res = await fetch("/casino/bounties.json", { cache: "no-store" });
        const data = await res.json();

        if (data?.bounties) {
          const updated = updateBounties(data.bounties);
          console.log(updated);
          setBounties(updated);
        }
      } catch (err) {
        console.error("Failed to fetch data for bounties:", err);
      }
    };

    // Initial fetch on mount
    fetchBounties();

    // Optional interval refresh every 30s
    const interval = setInterval(fetchBounties, 30000);
    return () => clearInterval(interval);
  }, []); // Empty deps = run once on client mount

  if (!bounties) return null; // Wait for data to load

  return (
    <div className="flex flex-col items-center min-h-full p-4 pb-16 gap-8 sm:gap-16 sm:p-20">
      <Image
        src={Assets.BannerLogoBlank}
        alt="Event banner"
        className="w-full md:max-w-[40%] md:max-h-[40%]"
      />
      <CasinoSignboard />
      <BountyList Bounties={bounties} Participants={Players} />
    </div>
  );
};

function updateBounties(items: Bounty[]): Bounty[] {
  const now = Date.now();

  const updatedBounties = items.map((item) => {
    let table = item.Table;

    // ------------------------
    // Bucket logic (Money is ALWAYS a string)
    // ------------------------
    const moneyRaw = String(item.Reward).toLowerCase().trim();

    // 💵 Real money bounties (contains $)
    if (moneyRaw.includes("$")) {
      // Extract numeric value from strings like "$30", "$45+", "$10 usd"
      const numericValue = parseInt(moneyRaw.replace(/[^0-9]/g, ""), 10);

      if (!isNaN(numericValue)) {
        if (numericValue <= 10) table = 0;
        else if (numericValue <= 20) table = 1;
        else if (numericValue <= 45) table = 2;
        else table = 3;
      }
    }
    // 🎟️ Event / non-money bounties (no $)
    else {
      if (moneyRaw.includes("100") && moneyRaw.includes("np")) table = 0;
      else if (moneyRaw.includes("200") && moneyRaw.includes("np")) table = 1;
      else if (moneyRaw.includes("300") && moneyRaw.includes("np")) table = 2;
      else if (moneyRaw.includes("battle") && moneyRaw.includes("pass"))
        table = 3;
    }

    // ------------------------
    // New bounty detection
    // ------------------------
    const createdTime = item.createdAt ? new Date(item.createdAt).getTime() : 0;
    const isNew = now - createdTime < 1000 * 60 * 60 * 24;
    return { ...item, Table: table, isNew };
  });

  return updatedBounties.sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
}
