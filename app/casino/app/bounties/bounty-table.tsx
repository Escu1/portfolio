import React, { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  SortingFn,
} from "@tanstack/react-table";
import {
  NewTag,
  Diamond,
  Cherries,
  YellowChip,
  GreenChip,
  BackArrow,
  FrontArrow,
  Twitter,
  BWTwitter,
  Twitch,
  BWTwitch,
  Youtube,
  BWYoutube,
  Status,
} from "@/assets";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Bounty, Participant } from "../casino.types";
import useIsSm from "../check-view";

dayjs.extend(relativeTime);

// Extend ColumnMeta to include custom properties
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    width?: string;
    backgroundColor?: string;
  }
}

// ---------- Countdown Component ----------
function ExpiryCountdown({ expiresAt }: { expiresAt: string }) {
  const [now, setNow] = React.useState(dayjs());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  const expiry = dayjs(expiresAt);
  const isExpired = expiry.isBefore(now);

  return (
    <span style={{ color: isExpired ? "red" : "inherit" }}>
      {isExpired ? "Expired" : "Expires " + expiry.from(now)}
    </span>
  );
}

const caseInsensitiveStringSort: SortingFn<Bounty> = (rowA, rowB, columnId) => {
  const a = String(rowA.getValue(columnId) ?? "").toLowerCase();
  const b = String(rowB.getValue(columnId) ?? "").toLowerCase();

  return a.localeCompare(b);
};

const statusSortingFn: SortingFn<Bounty> = (rowA, rowB) => {
  const getRank = (row: Bounty) => {
    if (!row.DueAt && !row.Cleared) return 3; // Open
    if (row.DueAt && dayjs(row.DueAt).isAfter(dayjs())) return 2; // Active
    if (row.Cleared) return 1; // Claimed
    return 0; // Expired
  };

  const rankA = getRank(rowA.original);
  const rankB = getRank(rowB.original);

  if (rankA !== rankB) return rankA - rankB;

  // If both are active, sort by soonest expiry
  if (rankA === 2) {
    return (
      dayjs(rowA.original.DueAt).valueOf() -
      dayjs(rowB.original.DueAt).valueOf()
    );
  }

  return 0;
};

const prizeSortingFn: SortingFn<Bounty> = (rowA, rowB) => {
  const a = rowA.original;
  const b = rowB.original;

  // 1️⃣ Sort by Table bucket
  if (a.Table !== b.Table) {
    return a.Table - b.Table;
  }

  const prizeA = a.Reward?.toString().trim() ?? "";
  const prizeB = b.Reward?.toString().trim() ?? "";

  const isPureNumber = (val: string) => /^\d+$/.test(val);

  const aIsNumber = isPureNumber(prizeA);
  const bIsNumber = isPureNumber(prizeB);

  // 2️⃣ Pure numbers come before mixed/text prizes
  if (aIsNumber !== bIsNumber) {
    return aIsNumber ? -1 : 1;
  }

  // 3️⃣ Numeric sort if both are pure numbers
  if (aIsNumber && bIsNumber) {
    return Number(prizeA) - Number(prizeB);
  }

  // 4️⃣ Fallback: alphabetical sort for text prizes
  return prizeA.localeCompare(prizeB, undefined, { numeric: true });
};

type DataTableProps = {
  bounties: Bounty[];
  participants: Participant[];
};

export function DataTable({ bounties, participants }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isDesktop = useIsSm();

  // ---------- Dynamic Columns ----------
  const columns: ColumnDef<Bounty>[] = (() => {
    const cols: ColumnDef<Bounty>[] = [
      {
        header: "Title",
        accessorKey: "Title",
        sortingFn: caseInsensitiveStringSort,
        cell: ({ row, getValue }) => {
          const title = getValue<string>();
          return (
            <div className="relative w-full h-full min-h-[2.5rem] flex items-center justify-center px-4 py-3">
              {row.original.isNew && (
                <Image
                  src={NewTag}
                  alt="New bounty tag"
                  className="absolute top-0 left-0"
                  height={20}
                  width={40}
                />
              )}
              <span
                className={`${row.original.isNew ? "mt-4" : ""} w-full text-start`}
              >
                {title}
              </span>
            </div>
          );
        },
        meta: { width: isDesktop ? "15%" : "25%" },
      },
      {
        id: "Prize",
        header: () =>
          isDesktop ? <p className="pt-5">Prize</p> : <p className="pt-5">$</p>,
        accessorKey: "Reward",
        sortingFn: prizeSortingFn,
        sortDescFirst: true,
        meta: { width: isDesktop ? "8%" : "15%" },
        cell: ({ row, getValue }) => {
          const value = getValue<string | number>();
          return (
            <div className={`${row.original.isNew ? "mt-4" : ""} px-4 py-3`}>
              {value}
            </div>
          );
        },
      },
      {
        id: "Description",
        header: () =>
          isDesktop ? (
            <p className="pt-5">Description</p>
          ) : (
            <p className="pt-5">Desc</p>
          ),
        accessorKey: "Text",
        enableSorting: false,
        meta: { width: isDesktop ? "30%" : "40%" },
        cell: ({ row, getValue }) => (
          <div className={`${row.original.isNew ? "mt-4" : ""} px-4 py-3`}>
            {getValue<string>()}
          </div>
        ),
      },
      {
        id: "Status",
        header: () =>
          isDesktop ? (
            <div className="pt-5">Status</div>
          ) : (
            <Image
              src={Status}
              alt="Status icon for mobile"
              width={25}
              height={25}
              className="pt-5"
            />
          ),
        accessorFn: (row) => row,
        sortingFn: statusSortingFn,
        cell: ({ row }) => {
          const r = row.original;
          if (r.Cleared)
            return (
              <div className={`${r.isNew ? "mt-4" : ""} px-4 py-3`}>
                <span style={{ color: "gray" }}>
                  {"Claimed by: " + r.Cleared}
                </span>
              </div>
            );

          if (r.DueAt) {
            const expired = dayjs(r.DueAt).isBefore(dayjs());
            return expired ? (
              <div className={`${r.isNew ? "mt-4" : ""} px-4 py-3`}>
                <span style={{ color: "red" }}>Expired</span>
              </div>
            ) : (
              <div className={`${r.isNew ? "mt-4" : ""} px-4 py-3`}>
                <ExpiryCountdown expiresAt={r.DueAt} />
              </div>
            );
          }

          return (
            <div className={`${r.isNew ? "mt-4" : ""} px-4 py-3`}>
              <span style={{ color: "green" }}>Open</span>
            </div>
          );
        },
        meta: { width: isDesktop ? "10%" : "20%" },
      },
    ];

    // Only add Table & Sponsor on desktop
    if (isDesktop) {
      cols.splice(2, 0, {
        header: "Table",
        accessorKey: "Table",
        sortingFn: (rowA, rowB) => rowA.original.Table - rowB.original.Table,
        cell: ({ row }) => (
          <div className={`${row.original.isNew ? "mt-2" : ""} ml-3 px-4 py-3`}>
            <TableIcon bounty={row.original} />
          </div>
        ),
        meta: { width: "7%" },
      });

      cols.splice(3, 0, {
        header: "Sponsor",
        accessorKey: "Sponsor",
        meta: { width: "10%" },
        cell: ({ row, getValue }) => (
          <div className={`${row.original.isNew ? "mt-4" : ""} px-4 py-3`}>
            {getValue<string>()}
          </div>
        ),
      });
    }

    return cols;
  })();

  const table = useReactTable({
    data: bounties,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full" style={{ perspective: "2000px" }}>
      <div
        className="relative transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)",
        }}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        {/* FRONT — Bounty Table */}
        <div
          className={`relative rounded-xl border-4 ${isDesktop ? "p-4" : "p-2"} min-h-[620px]`}
          style={{
            borderColor: "#381c1e",
            background:
              "radial-gradient(circle at top, #0f2a1f 0%, #0f2a1f 70%)",
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg) translateZ(0)",
            pointerEvents: flipped ? "none" : "auto", // ← Add this
          }}
        >
          {/* FRONT ARROW */}
          {!flipped && !isAnimating && (
            <button
              onClick={() => {
                setIsAnimating(true);
                setFlipped(true);
              }}
              className="absolute top-4 right-4 z-30 flex items-center gap-3 px-4 py-2 rounded-full border-[3px] border-[#381c1e] bg-[#0f2a1f] shadow-lg hover:scale-105 transition-transform"
            >
              {isDesktop ? (
                <span className="text-sm font-semibold tracking-wide text-[#ffd700]">
                  Participants!
                </span>
              ) : null}

              <Image
                src={FrontArrow}
                alt="Flip to back"
                width={24}
                height={24}
              />
            </button>
          )}

          <div className="text-center">
            <h3 className="text-2xl tracking-wider text-white">BOUNTIES</h3>
            <div className="mb-2 text-left text-xs text-[#ffd700]">
              Last updated: {dayjs().format("YYYY-MM-DD HH:mm")}
            </div>
          </div>

          <div className="h-[620px] relative overflow-auto scrollbar-casino">
            <table className="w-full table-fixed border-collapse">
              <thead
                className="sticky top-0 z-20"
                style={{
                  backfaceVisibility: "hidden",
                }}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        className={`px-4 py-3 text-left text-sm uppercase tracking-wider ${
                          header.column.getCanSort() ? "cursor-pointer" : ""
                        }`}
                        style={{
                          width: header.column.columnDef.meta?.width || "auto",
                          background: "#0b1f17",
                          color: "#ffd700",
                          borderBottom: "3px solid #381c1e",
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <span className="ml-1">
                          {header.column.getIsSorted() === "asc"
                            ? " ▲"
                            : header.column.getIsSorted() === "desc"
                              ? " ▼"
                              : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => {
                  const isExpired = dayjs(row.original.DueAt).isBefore(dayjs());
                  return (
                    <tr
                      key={row.id}
                      className={`${isExpired ? "bg-[#2a0000]" : "hover:bg-[#0b0b0b]"}`}
                      style={{ color: "#f5f5f5" }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`align-top ${isDesktop ? "text-sm" : "text-xs"}`}
                          style={{
                            width: cell.column.columnDef.meta?.width || "auto",
                            borderBottom: "1px solid rgba(255,255,255,0.03)",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* BACK — Participants Panel */}
        <div
          className="absolute inset-0 rounded-xl border-4 p-6 flex flex-col"
          style={{
            transform: "rotateY(-180deg)",
            backfaceVisibility: "hidden",
            borderColor: "#381c1e",
            background:
              "radial-gradient(circle at top, #0f2a1f 0%, #0f2a1f 70%)",
            color: "#f5f5f5",
            pointerEvents: flipped ? "auto" : "none", // ← Add this
          }}
        >
          {/* BACK ARROW */}
          {flipped && !isAnimating && (
            <button
              onClick={() => {
                setIsAnimating(true);
                setFlipped(false);
              }}
              className="absolute top-4 right-4 z-30 flex items-center gap-3 px-4 py-2 rounded-full border-[3px] border-[#381c1e] bg-[#0f2a1f] shadow-lg hover:scale-105 transition-transform"
            >
              <Image
                src={BackArrow}
                alt="Flip to front"
                width={24}
                height={24}
              />
              {isDesktop ? (
                <span className="text-sm font-semibold tracking-wide text-[#ffd700]">
                  Bounties!
                </span>
              ) : null}
            </button>
          )}

          <h3 className="text-2xl text-center mb-4">Participants</h3>

          <div className="flex-1 overflow-auto scrollbar-casino">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: isDesktop
                  ? "repeat(3, minmax(0, 1fr))"
                  : "repeat(1, minmax(0, 1fr))",
              }}
            >
              {participants.map((participant) => (
                <div
                  key={participant.Name}
                  className="flex items-center justify-between gap-2 p-2 bg-[#0b1f17] rounded"
                >
                  <div className="flex flex-row gap-4 items-center">
                    <Image
                      src={participant.Icon}
                      alt={participant.Name}
                      width={isDesktop ? 50 : 25}
                      height={isDesktop ? 50 : 25}
                    />
                    <div className="text-md">{participant.Name}</div>
                  </div>

                  <div className="flex flex-row gap-2">
                    <a
                      href={participant.Twitch || undefined}
                      target="_blank"
                      className={participant.Twitch === "" ? "opacity-50" : ""}
                    >
                      <Image
                        src={participant.Twitch === "" ? BWTwitch : Twitch}
                        alt="Twitch link"
                        width={isDesktop ? 50 : 25}
                        height={isDesktop ? 50 : 25}
                      />
                    </a>

                    <a
                      href={participant.YouTube || undefined}
                      target="_blank"
                      className={participant.YouTube === "" ? "opacity-50" : ""}
                    >
                      <Image
                        src={participant.YouTube === "" ? BWYoutube : Youtube}
                        alt="YouTube link"
                        width={isDesktop ? 50 : 25}
                        height={isDesktop ? 50 : 25}
                      />
                    </a>

                    <a
                      href={participant.Twitter || undefined}
                      target="_blank"
                      className={participant.Twitter === "" ? "opacity-50" : ""}
                    >
                      <Image
                        src={participant.Twitter === "" ? BWTwitter : Twitter}
                        alt="Twitter link"
                        width={isDesktop ? 50 : 25}
                        height={isDesktop ? 50 : 25}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TableIconProps {
  bounty: Bounty;
}

const TableIcon: React.FC<TableIconProps> = ({ bounty }) => {
  switch (bounty.Table) {
    case 0:
      return (
        <Image
          src={Cherries}
          alt="Low roller table icon"
          width={30}
          height={30}
        />
      );
    case 1:
      return (
        <Image
          src={GreenChip}
          alt="Low roller table icon"
          width={30}
          height={30}
        />
      );
    case 2:
      return (
        <Image
          src={YellowChip}
          alt="High roller table icon"
          width={30}
          height={30}
        />
      );
    case 3:
      return (
        <Image src={Diamond} alt="VIP table icon" width={30} height={30} />
      );
    default:
      return null;
  }
};
