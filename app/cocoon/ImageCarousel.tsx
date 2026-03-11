import { useEffect, useState } from "react";

const imageFiles = [
  "Version 5_Draft-1.pdf.jpg",
  "Version 5_Draft-2.pdf.jpg",
  "Version 5_Draft-3.pdf.jpg",
  "Version 5_Draft-4.pdf.jpg",
  "Version 5_Draft-5.pdf.jpg",
  "Version 5_Draft-6.pdf.jpg",
  "Version 5_Draft-7.pdf.jpg",
  "Version 5_Draft-8.pdf.jpg",
  "Version 5_Draft-9.pdf.jpg",
  "Version 5_Draft-10.pdf.jpg",
  "Version 5_Draft-11.pdf.jpg",
  "Version 5_Draft-12.pdf.jpg",
  "Version 5_Draft-13.pdf.jpg",
  "Version 5_Draft-14.pdf.jpg",
  "Version 5_Draft-15.pdf.jpg",
  "Version 5_Draft-16.pdf.jpg",
  "Version 5_Draft-17.pdf.jpg",
  "Version 5_Draft-18.pdf.jpg",
  "Version 5_Draft-19.pdf.jpg",
  "Version 5_Draft-20.pdf.jpg",
  "Version 5_Draft-21.pdf.jpg",
  "Version 5_Draft-22.pdf.jpg",
  "Version 5_Draft-23.pdf.jpg",
  "Version 5_Draft-24.pdf.jpg",
  "Version 5_Draft-25.pdf.jpg",
  "Version 5_Draft-26.pdf.jpg"
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageFiles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((current - 1 + imageFiles.length) % imageFiles.length);
  const next = () => setCurrent((current + 1) % imageFiles.length);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-center w-full">
        <button
          className="mr-8 bg-white text-orange-900 rounded-full w-16 h-16 flex items-center justify-center shadow transition-colors duration-200 hover:bg-orange-900 hover:text-white cursor-pointer"
          onClick={prev}
          aria-label="Previous Image"
        >
          &#8592;
        </button>
        <img
          src={`/cocoon/images/${imageFiles[current]}`}
          alt={imageFiles[current]}
          className="rounded border max-w-[1400px] w-auto h-auto max-h-[1600px]"
        />
        <button
          className="ml-8 bg-white text-orange-900 rounded-full w-16 h-16 flex items-center justify-center shadow transition-colors duration-200 hover:bg-orange-900 hover:text-white cursor-pointer"
          onClick={next}
          aria-label="Next Image"
        >
          &#8594;
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {imageFiles.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full border border-white bg-white transition-colors duration-200 cursor-pointer ${current === idx ? "opacity-100" : "opacity-40"} hover:bg-orange-900 hover:border-orange-900 hover:opacity-100`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
