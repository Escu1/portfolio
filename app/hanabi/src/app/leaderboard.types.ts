import { StaticImageData } from "next/image";
import { ReactElement } from "react";

interface PlayerInfo {
  name: string;
  mmr: number;
  twitch: string;
  youtube: string;
  dak: string;
  culled: number | null;
  twitter: string;
  indanger: boolean;
}

interface PlayerCardProps {
  player: PlayerInfo;
  leaderRank: number;
  icon: StaticImageData;
}

interface Rank {
  icon: ReactElement;
  name: string;
}

interface TimerProps {
  onComplete: () => void;
}

interface Bounty {
  Title: string;
  Money: number;
  Sponsor: string;
  Text: string;
  Cleared: boolean;
}

interface BountyListProps {
  Bounties: Bounty[];
}
export type {
  PlayerInfo,
  PlayerCardProps,
  Rank,
  Bounty,
  BountyListProps,
  TimerProps,
};
