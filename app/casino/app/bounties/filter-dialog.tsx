import { useState } from "react";
import { BoardFilters } from "../casino.types";
import { BountyFilterPanel } from "./filter";

type FilterDialogProps = {
  filters: BoardFilters;
  onChange: (filters: BoardFilters) => void;
};
export function BountyFilterDialog({ filters, onChange }: FilterDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open dialog */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded bg-[#381c1e] text-[#ffd700] font-semibold shadow hover:bg-[#b30000] transition"
      >
        Open Filters
      </button>
      {/* Dialog overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)", // dimmed black, not fully black
          }}
          onClick={() => setIsOpen(false)}
        >
          {/* Prevent click inside panel from closing */}
          <div onClick={(e) => e.stopPropagation()}>
            <BountyFilterPanel filters={filters} onChange={onChange} />
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full px-4 py-2 rounded bg-[#381c1e] text-[#ffd700] font-semibold shadow hover:bg-[#b30000] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
