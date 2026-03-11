import { BoardFilters } from "../casino.types";
import { Cherries, Diamond, GreenChip, Info, YellowChip } from "@/assets";
import Image from "next/image";
import { Tooltip } from "./tooltip";

type FilterPanelProps = {
  filters: BoardFilters;
  onChange: (filters: BoardFilters) => void;
};

export function BountyFilterPanel({ filters, onChange }: FilterPanelProps) {
  // Shared styles for buttons
  const buttonBase =
    "w-full px-3 py-2 rounded text-sm font-semibold transition flex items-center gap-4";

  return (
    <div
      className="w-64 p-4 rounded-xl border-2 flex flex-col"
      style={{
        borderColor: "#381c1e",
        background: "linear-gradient(180deg, #0f2a1f 0%, #071a12 100%)",
      }}
    >
      <h4 className="mb-2 text-sm tracking-widest text-[#ffd700]">FILTERS</h4>

      {/* --- Group 1: Source --- */}
      <div className={"flex flex-col gap-2"}>
        <h5 className="col-span-2 text-xs text-[#ffd700] mb-1 font-semibold">
          Source
        </h5>
        <button
          className={`${buttonBase} ${
            filters.showHouse
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() =>
            onChange({ ...filters, showHouse: !filters.showHouse })
          }
        >
          House
        </button>
        <button
          className={`${buttonBase} ${
            filters.showCommunity
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() =>
            onChange({ ...filters, showCommunity: !filters.showCommunity })
          }
        >
          Community
        </button>
      </div>

      {/* --- Group 2: Prize Level --- */}
      <div className={"flex flex-col gap-2 mt-4"}>
        <Tooltip
          content={
            <ul className="list-inside">
              <li>
                <strong>Penny:</strong> $10 and under or 100 Event NP
              </li>
              <li>
                <strong>Low:</strong> $11 - 20 or 200 Event NP
              </li>
              <li>
                <strong>High:</strong> $21 - 45 or 300 Event NP
              </li>
              <li>
                <strong>VIP:</strong> $46+ or Battle Pass
              </li>
            </ul>
          }
        >
          <h5 className="col-span-2 text-xs text-[#ffd700] mb-1 font-semibold cursor-help flex flex-row items-center gap-1">
            <span>Table Prizing </span>
            <Image
              src={Info}
              alt="Prize level info icon"
              width={20}
              height={20}
            />
          </h5>
        </Tooltip>

        <button
          className={`${buttonBase} ${
            filters.showPenny
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() =>
            onChange({ ...filters, showPenny: !filters.showPenny })
          }
        >
          <Image src={Cherries} alt="Penny" width={30} height={30} />
          Penny
        </button>

        <button
          className={`${buttonBase} ${
            filters.showLow
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() => onChange({ ...filters, showLow: !filters.showLow })}
        >
          <Image src={GreenChip} alt="Low" width={30} height={30} />
          Low
        </button>

        <button
          className={`${buttonBase} ${
            filters.showHigh
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() => onChange({ ...filters, showHigh: !filters.showHigh })}
        >
          <Image src={YellowChip} alt="High" width={30} height={30} />
          High
        </button>

        <button
          className={`${buttonBase} ${
            filters.showVip
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() => onChange({ ...filters, showVip: !filters.showVip })}
        >
          <Image src={Diamond} alt="VIP" width={30} height={30} />
          VIP
        </button>
      </div>

      {/* --- Group 3: Claimed/Expiry --- */}
      <div className={"flex flex-col gap-2 mt-4"}>
        <h5 className="col-span-2 text-xs text-[#ffd700] mb-1 font-semibold">
          Claimed + Expired
        </h5>

        <button
          className={`${buttonBase} ${
            filters.hasExpiry
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() =>
            onChange({ ...filters, hasExpiry: !filters.hasExpiry })
          }
        >
          Expiring bounties only
        </button>

        <button
          className={`${buttonBase} ${
            filters.showExpired
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() =>
            onChange({ ...filters, showExpired: !filters.showExpired })
          }
        >
          Show expired
        </button>

        <button
          className={`${buttonBase} ${
            filters.showClaimed
              ? "bg-[#b30000] text-white"
              : "bg-[#1a3a2b] text-[#ffd700]"
          }`}
          onClick={() =>
            onChange({ ...filters, showClaimed: !filters.showClaimed })
          }
        >
          View claimed
        </button>
      </div>

      {/* --- Optional Clear Filters Button --- */}
      {(!filters.showHouse ||
        !filters.showCommunity ||
        !filters.showPenny ||
        !filters.showLow ||
        !filters.showHigh ||
        !filters.showVip ||
        filters.hasExpiry ||
        filters.showExpired ||
        filters.showClaimed) && (
        <button
          className="mt-4 w-full px-3 py-2 rounded text-xs text-[#ffd700] opacity-80 hover:opacity-100 col-span-2"
          onClick={() =>
            onChange({
              showHouse: true,
              showCommunity: true,
              hasExpiry: false,
              showExpired: false,
              showPenny: true,
              showLow: true,
              showHigh: true,
              showVip: true,
              showClaimed: false,
            })
          }
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
