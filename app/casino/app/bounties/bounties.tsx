import { useMemo, useState } from "react";
import { BoardFilters, Bounty, BountyListProps } from "../casino.types";
import { DataTable } from "./bounty-table";
import { BountyFilterPanel } from "./filter";
import useIsSm from "../check-view";
import dayjs from "dayjs";
import { BountyFilterDialog } from "./filter-dialog";

export const BountyList: React.FC<BountyListProps> = ({
  Bounties,
  Participants,
}) => {
  function applyBountyFilters(
    bounties: Bounty[],
    filters: BoardFilters,
  ): Bounty[] {
    return bounties.filter((b) => {
      // Source filters
      if (!filters.showHouse && b.House) return false;
      if (!filters.showCommunity && !b.House) return false;

      // Expiry filters, exclude expired bounties if showExpired is false
      if (filters.hasExpiry && !b.DueAt) return false;
      if (!filters.showExpired && b.DueAt && dayjs(b.DueAt).isBefore(dayjs()))
        return false;

      // Prize Table filters
      if (!filters.showPenny && b.Table === 0) return false;
      if (!filters.showLow && b.Table === 1) return false;
      if (!filters.showHigh && b.Table === 2) return false;
      if (!filters.showVip && b.Table === 3) return false;

      // Claimed filter
      if (!filters.showClaimed && b.Cleared) return false;
      if (filters.showClaimed && !b.Cleared) return false;

      return true;
    });
  }

  const [filters, setFilters] = useState<BoardFilters>({
    showHouse: true,
    showCommunity: true,
    hasExpiry: false,
    showExpired: false,
    showPenny: true,
    showLow: true,
    showHigh: true,
    showVip: true,
    showClaimed: false,
  });

  const filteredBounties = useMemo(
    () => applyBountyFilters(Bounties, filters),
    [Bounties, filters],
  );

  const isDesktop = useIsSm();

  return isDesktop ? (
    <div className="flex flex-row gap-4 w-full">
      <div className="w-64">
        <BountyFilterPanel filters={filters} onChange={setFilters} />
      </div>
      <div className="flex flex-row gap-8 w-full bg-none">
        <DataTable bounties={filteredBounties} participants={Participants} />
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full justify-center">
        <BountyFilterDialog filters={filters} onChange={setFilters} />
      </div>
      <div className="flex w-full bg-none">
        <DataTable bounties={filteredBounties} participants={Participants} />
      </div>
    </div>
  );
};
