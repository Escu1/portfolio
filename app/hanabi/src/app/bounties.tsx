import { BountyListProps } from "./leaderboard.types";

export const BountyList: React.FC<BountyListProps> = ({ Bounties }) => {
  return (
    <div className="flex flex-col gap-8">
      {Bounties.map((bounty, idx) => {
        return (
          <div
            key={idx}
            className={`flex flex-col text-neutral-500 ${
              bounty.Cleared ? "line-through bg-neutral-300" : "bg-rose-200"
            } rounded-lg text-neutral-800 p-4 justify-items-center items-center text-center`}
          >
            <div>{bounty.Title}</div>
            <div>{`$${bounty.Money} USD`}</div>
            <div>{bounty.Sponsor}</div>
            <div
              className="mt-6"
              dangerouslySetInnerHTML={{ __html: bounty.Text }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
