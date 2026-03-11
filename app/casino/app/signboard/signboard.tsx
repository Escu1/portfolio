import React, { useState } from "react";
import { Twitter, Discord, FrontArrow, BackArrow } from "@/assets";
import Image from "next/image";
import useIsSm from "../check-view";

export const CasinoSignboard: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  const isMobile = useIsSm();

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full max-w-3xl min-h-[360px] transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : undefined,
        }}
      >
        <button
          onClick={() => setFlipped(!flipped)}
          className={`
    absolute top-1/2 right-0 
    z-30 flex items-center justify-center 
    rounded-full border-[3px] border-[#381c1e] 
    bg-[#0f2a1f] cursor-pointer 
    hover:scale-110 transition-transform shadow-lg
    -translate-y-1/2 translate-x-1/2
    ${isMobile ? "w-[56px] h-[56px]" : "w-[64px] h-[64px]"}
  `}
        >
          <Image
            src={flipped ? BackArrow : FrontArrow}
            alt="Flip signboard"
            width={28}
            height={28}
            className={flipped ? "scale-x-[-1]" : ""}
          />
        </button>

        {/* FRONT */}
        <div
          className="inset-0 rounded-[16px] px-4 py-4 md:px-6 md:py-5"
          style={{
            background:
              "radial-gradient(circle at top, #0f2a1f 0%, #0f2a1f 70%)",
            backfaceVisibility: "hidden",
            border: "4px solid #381c1e",
          }}
        >
          <h2
            className="text-center text-2xl sm:text-3xl md:text-4xl tracking-[1.5px] md:tracking-[2px] text-[#ff3333]"
            style={{
              color: "#ffffff",
            }}
          >
            What is Casino Royale?
          </h2>

          <div className="rounded-[8px] p-3 sm:p-4 md:p-5 text-[#f5f5f5] text-left text-sm sm:text-base md:text-base">
            <div className="flex flex-col gap-4">
              <div>
                <p>
                  Casino Royale is the Season 10 Early Launch Bounty Hunting
                  Event, where Content Creators will be tasked with exciting
                  missions by both the Organizers and the community to win a
                  variety of prizes.
                </p>
              </div>
              <div>
                <p>
                  This event is designed to highlight content creators of all
                  sizes while pushing for greater exposure of the NA Eternal
                  Return scene.
                </p>
              </div>
              <div>
                <p>
                  Bounties will be released throughout the week, with select
                  bounties featuring expiration timers, so be sure to claim them
                  before time runs out. Expired bounties will be recycled into
                  new ones, keeping the competition fresh and ongoing.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-center tracking-[1.5px] md:tracking-[2px] text-[#ffffff] text-2xl sm:text-3xl md:text-4xl mt-6">
            Socials
          </h2>

          <div className="flex flex-row w-full gap-4 justify-center items-center mt-2">
            <a
              href="https://discord.gg/Zvr2X3QAFZ"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={Discord}
                alt="Event discord icon"
                className="w-[24px] h-[24px] sm:w-[36px] sm:h-[36px] md:w-[48px] md:h-[48px]"
              />
            </a>
            <a
              href="https://x.com/S10CasinoRoyale"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={Twitter}
                alt="Event twitter icon"
                className="w-[24px] h-[24px] sm:w-[36px] sm:h-[36px] md:w-[48px] md:h-[48px]"
              />
            </a>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 min-h-[360px] rounded-[16px] px-4 py-4 md:px-6 md:py-5"
          style={{
            background:
              "radial-gradient(circle at top, #0f2a1f 0%, #0f2a1f 70%)",
            backfaceVisibility: "hidden",
            border: "4px solid #381c1e",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative">
            <h2
              className="text-center text-2xl sm:text-3xl md:text-4xl tracking-[1.5px] md:tracking-[2px] text-[#ff3333]"
              style={{
                color: "#ffffff",
              }}
            >
              Donations
            </h2>

            <div className="rounded-[8px] p-3 sm:p-4 md:p-5 text-[#f5f5f5] text-left text-sm sm:text-base md:text-base">
              <div className="flex flex-col gap-4">
                <div>
                  <p>
                    If you would like to curate a tailored bounty for the
                    participants, you can do so with a minimum donation of $5
                    USD! Details regarding bounty guidelines can be found in the
                    server!
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <strong>How to Submit</strong>
                  <p>1️⃣ Join our Discord</p>
                  <p>2️⃣ Head to #Add-Bounty</p>
                  <p>3️⃣ Submit your idea for review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
