"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";

export default function Home() {
  // Add override class to body to disable casino background
  useEffect(() => {
    document.body.classList.add("main-override");
    return () => {
      document.body.classList.remove("main-override");
    };
  }, []);
  const [hoveredLeft, setHoveredLeft] = useState<string | null>(null);
  const [hoveredRight, setHoveredRight] = useState<string | null>(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const casinoImageRef = useRef<HTMLImageElement | null>(null);
  const [panTrigger, setPanTrigger] = useState(0);
  const [prevClipIndex, setPrevClipIndex] = useState<number | null>(null);
  const [crossfade, setCrossfade] = useState(false);
  const casinoImages = useMemo(() => [
    "/casino-image.jpg",
    "/casino-image2.jpg"
  ], []);
  const hanabiImages = useMemo(() => [
    "/hanabi-image.jpg",
    "/hanabi-image2.jpg"
  ], []);
  const [nextClipIndex, setNextClipIndex] = useState<number | null>(null);
  const [fadeBlack, setFadeBlack] = useState(false);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Seek to 4 seconds for subsequent clips
  useEffect(() => {
    if (videoRef.current && currentClipIndex !== 0) {
      videoRef.current.currentTime = 4;
    }
  }, [currentClipIndex]);

  const leftItems = [
    { label: "Casino Royale", href: "/casino-royale" },
    { label: "Hanabi Cup", href: "/hanabi-cup" },
    { label: "Twitch", href: "https://www.twitch.tv/magecraftlol" },
    { label: "YouTube", href: "https://www.youtube.com/@magecraftlol" },
  ];

  const rightItems = [
    { label: "After", href: "/after" },
    { label: "420s Album Cover", href: "/420s" },
    { label: "Cocoon", href: "/cocoon" },
    { label: "Beyond Ambitious", href: "/beyond-ambitious" },
  ];

  const allClips = [
    "/twitch-clip1.mp4",
    "/twitch-clip2.mp4",
    "/twitch-clip4.mp4",
    "/youtube-clip1.mp4",
    "/youtube-clip2.mp4",
  ];

  const clips = useMemo(
    () =>
      hoveredLeft
        ? allClips.filter((clip) =>
            clip.toLowerCase().startsWith(`/${hoveredLeft.toLowerCase()}`)
          )
        : [],
    [hoveredLeft]
  );

  useEffect(() => {
    setCurrentClipIndex(0);
    setNextClipIndex(null);
  }, [hoveredLeft]);

  // Image cycling for Casino Royale
  useEffect(() => {
    function handleAnimationEnd() {
      setCurrentClipIndex((prev) => (prev + 1) % casinoImages.length);
      setPanTrigger((prev) => prev + 1);
    }
    const img = casinoImageRef.current;
    if (hoveredLeft === "Casino Royale" && img) {
      img.addEventListener("animationend", handleAnimationEnd);
      return () => {
        img.removeEventListener("animationend", handleAnimationEnd);
      };
    } else if (hoveredLeft === "Hanabi Cup") {
      const interval = setInterval(() => {
        setFadeBlack(true);
        fadeTimeoutRef.current = setTimeout(() => {
          setCurrentClipIndex((prev) => (prev + 1) % hanabiImages.length);
          setTimeout(() => setFadeBlack(false), 150);
        }, 150);
      }, 8000);
      return () => {
        clearInterval(interval);
        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      };
    }
  }, [hoveredLeft, casinoImages.length, hanabiImages.length, panTrigger]);

  // Clip cycling for Twitch/YouTube
  useEffect(() => {
    if (!hoveredLeft || clips.length === 0) return;

    const interval = setInterval(() => {
      setFadeBlack(true);
      fadeTimeoutRef.current = setTimeout(() => {
        setNextClipIndex((currentClipIndex + 1) % clips.length);
      }, 150);
    }, 8000);

    return () => {
      clearInterval(interval);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [hoveredLeft, clips, currentClipIndex]);

  useEffect(() => {
    if (nextClipIndex === null) return;

    const timeout = setTimeout(() => {
      setCurrentClipIndex(nextClipIndex);
      setNextClipIndex(null);
      setTimeout(() => setFadeBlack(false), 150);
    }, 100);

    return () => clearTimeout(timeout);
  }, [nextClipIndex]);

  // Background gradients
  let currentGradient = "bg-black";
  const rightGradients: Record<string, string> = {
    "Casino Royale": "from-[#b71c1c] to-[#ff5252]",
    "Hanabi Cup": "from-[#ad1457] to-[#ff80ab]",
    After: "from-[#1b5e20] to-[#69f0ae]",
    "420s Album Cover": "from-[#311b92] to-[#ea80fc]",
    Cocoon: "from-[#ff6f00] to-[#ffe082]",
    "Beyond Ambitious": "from-[#4a148c] to-[#7b1fa2]",
  };

  const leftGradients: Record<string, string> = {
    Twitch: "from-[#6f2dcf] to-[#3d0f6b]",
    YouTube: "from-red-800 to-red-950",
    "Casino Royale": "from-[#b71c1c] to-[#ff5252]",
    "Hanabi Cup": "from-[#ad1457] to-[#ff80ab]",
  };

  if (hoveredLeft)
    currentGradient = `bg-gradient-to-br ${
      leftGradients[hoveredLeft] || "from-purple-800 to-purple-900"
    }`;
  if (hoveredRight)
    currentGradient = `bg-gradient-to-br ${
      rightGradients[hoveredRight] || "from-gray-700 to-gray-900"
    }`;

  return (
    <div
      className={`min-h-screen text-white flex flex-col transition-colors duration-500 ${currentGradient}`}
    >
      {/* Header */}
      <header className="w-full py-6 text-center border-b border-white/10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
          Dan Diaconescu
        </h1>
        <div className="mt-2 flex flex-row flex-wrap items-center justify-center gap-4 text-base md:text-lg text-white/80">
          <span>Email: <a href="mailto:dan.cristi.diaconescu@gmail.com" className="underline hover:text-white">dan.cristi.diaconescu@gmail.com</a></span>
          <span>|</span>
          <span>Phone: <a href="tel:+16476362030" className="underline hover:text-white">+1 (647) 636-2030</a></span>
          <span>|</span>
          <span>GitHub: <a href="https://github.com/Escu1" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">github.com/Escu1</a></span>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <aside className="absolute left-0 top-[4rem] bottom-0 flex flex-col w-[45%] z-0">
          <div className="mb-1">
              <div className="w-full flex justify-center">
              <span className="text-2xl font-bold text-center">Personal Projects</span>
            </div>
            <div className="w-full border-b border-white/10 mt-1"></div>
          </div>
          <div className="flex-1 flex flex-col">
            {leftItems.map((item) => {
              let gradient = leftGradients[item.label] || "from-purple-800 to-purple-900";

              if (item.label === "Twitch" || item.label === "YouTube") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredLeft(item.label)}
                    onMouseLeave={() => setHoveredLeft(null)}
                    className={`flex-1 flex items-center justify-center text-xl font-semibold border-b border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      hoveredLeft === item.label ? `bg-gradient-to-br ${gradient}` : "bg-white/10"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              }

              return item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredLeft(item.label)}
                  onMouseLeave={() => setHoveredLeft(null)}
                  className={`flex-1 flex items-center justify-center text-xl font-semibold border-b border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    hoveredLeft === item.label ? `bg-gradient-to-br ${gradient}` : "bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.label}
                  onMouseEnter={() => setHoveredLeft(item.label)}
                  onMouseLeave={() => setHoveredLeft(null)}
                  className={`flex-1 flex items-center justify-center text-xl font-semibold border-b border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    hoveredLeft === item.label ? `bg-gradient-to-br ${gradient}` : "bg-white/10"
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Sidebar */}
        <aside className="absolute right-0 top-[4rem] bottom-0 flex flex-col w-[45%] z-0">
          <div className="mb-1">
              <div className="w-full flex justify-center">
              <span className="text-2xl font-bold text-center">Design Examples</span>
            </div>
            <div className="w-full border-b border-white/10 mt-1"></div>
          </div>
          <div className="flex-1 flex flex-col">
            {rightItems.map((item) => {
              // Make Twitch and YouTube hyperlinks
              if (item.label === "Twitch" || item.label === "YouTube") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center justify-center text-xl font-semibold border-b border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/10"
                  >
                    {item.label}
                  </a>
                );
              }
              return item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredRight(item.label)}
                  onMouseLeave={() => setHoveredRight(null)}
                  className={`flex-1 flex flex-col items-center justify-center text-xl font-semibold border-b border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/10`}
                >
                  {item.label}
                  {item.label === "After" && <span className="block w-full text-xs text-white/60 mt-1 text-center">&lt;under construction&gt;</span>}
                  {item.label === "420s Album Cover" && <span className="block w-full text-xs text-white/60 mt-1 text-center">&lt;under construction&gt;</span>}
                  {item.label === "Beyond Ambitious" && <span className="block w-full text-xs text-white/60 mt-1 text-center">&lt;under construction&gt;</span>}
                </Link>
              ) : (
                <div
                  key={item.label}
                  onMouseEnter={() => setHoveredRight(item.label)}
                  onMouseLeave={() => setHoveredRight(null)}
                  className="flex-1 flex items-center justify-center text-xl font-semibold border-b border-white/10 transition-all duration-300"
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center */}
        <main className="flex-1 flex items-center justify-center relative z-10 pointer-events-none">
          {/* Hide preview box on mobile */}
          <div className="border-4 border-white p-2 rounded-2xl shadow-2xl w-[350px] h-[630px] overflow-hidden relative flex items-center justify-center hidden sm:flex">
            {hoveredLeft && clips.length > 0 ? (
              <>
                {/* Video for Twitch/YouTube */}
                <video
                  key={currentClipIndex}
                  ref={videoRef}
                  src={clips[currentClipIndex]}
                  autoPlay
                  muted
                  loop
                  className="absolute w-full h-full object-cover rounded-xl"
                />
                <div
                  className={`absolute w-full h-full bg-black rounded-xl transition-opacity duration-200 ${
                    fadeBlack ? "opacity-100" : "opacity-0"
                  }`}
                />
              </>
            ) : hoveredLeft === "Casino Royale" || hoveredLeft === "Hanabi Cup" ? (
              // Cycle images for Casino Royale and Hanabi Cup
              hoveredLeft === "Casino Royale" ? (
                <>
                  <img
                    ref={casinoImageRef}
                    key={`current-${currentClipIndex}-${panTrigger}`}
                    src={casinoImages[currentClipIndex % casinoImages.length]}
                    className="absolute w-full h-full object-cover rounded-xl animate-pan-left-right"
                    style={{ zIndex: 2 }}
                  />
                </>
              ) : (
                <img
                  key={currentClipIndex}
                  src={hanabiImages[currentClipIndex % hanabiImages.length]}
                  className={`absolute w-full h-full object-cover rounded-xl transform transition-transform duration-[8000ms] ${
                    fadeBlack ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
                  }`}
                />
              )
            ) : hoveredRight ? (
              <span className="text-3xl font-bold">{hoveredRight}</span>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/40">
                Add profile image
              </div>
            )}
          </div>
        </main>
      {/* Add pan animation styles */}
      <style jsx>{`
        .animate-pan-left-right {
          animation: panLeftRight 8s linear infinite;
        }
        @keyframes panLeftRight {
          0% { object-position: left center; }
          100% { object-position: right center; }
        }
      `}</style>
      </div>
    </div>
  );
}