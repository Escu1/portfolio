import dayjs from "dayjs";
import { StaticImageData } from "next/image";

interface Bounty {
  Title: string;
  Reward: string;
  Sponsor: string;
  Text: string;
  createdAt: string;
  expired: boolean;
  DueAt: string;
  House: boolean;
  Cleared: string;
  Table: number;
  isNew: boolean;
}

interface BoardFilters {
  showHouse: boolean;
  showCommunity: boolean;
  hasExpiry: boolean;
  showExpired: boolean;
  showPenny: boolean;
  showLow: boolean;
  showHigh: boolean;
  showVip: boolean;
  showClaimed: boolean;
}

interface BountyListProps {
  Bounties: Bounty[];
  Participants: Participant[];
}

interface TimerProps {
  onComplete: () => void;
  time: dayjs.Dayjs;
}

interface Participant {
  Name: string;
  Icon: StaticImageData;
  Twitter: string;
  Twitch: string;
  YouTube: string;
}

export type { Bounty, BountyListProps, BoardFilters, TimerProps, Participant };
