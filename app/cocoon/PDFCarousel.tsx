import { useEffect, useState } from "react";

const pdfFiles = [
  "Version 5_Draft-1.pdf",
  "Version 5_Draft-2.pdf",
  "Version 5_Draft-3.pdf",
  "Version 5_Draft-4.pdf",
  "Version 5_Draft-5.pdf",
  "Version 5_Draft-6.pdf",
  "Version 5_Draft-7.pdf",
  "Version 5_Draft-8.pdf",
  "Version 5_Draft-9.pdf",
  "Version 5_Draft-10.pdf",
  "Version 5_Draft-11.pdf",
  "Version 5_Draft-12.pdf",
  "Version 5_Draft-13.pdf",
  "Version 5_Draft-14.pdf",
  "Version 5_Draft-15.pdf",
  "Version 5_Draft-16.pdf",
  "Version 5_Draft-17.pdf",
  "Version 5_Draft-18.pdf",
  "Version 5_Draft-19.pdf",
  "Version 5_Draft-20.pdf",
  "Version 5_Draft-21.pdf",
  "Version 5_Draft-22.pdf",
  "Version 5_Draft-23.pdf",
  "Version 5_Draft-24.pdf",
  "Version 5_Draft-25.pdf",
  "Version 5_Draft-26.pdf",
  "Version 5_Draft-27.pdf",
  "Version 5_Draft-28.pdf"
];

export default function PDFCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % pdfFiles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((current - 1 + pdfFiles.length) % pdfFiles.length);
  const next = () => setCurrent((current + 1) % pdfFiles.length);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-[600px] h-[800px] flex items-center justify-center bg-white rounded shadow-lg">
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-orange-900 rounded-full w-10 h-10 flex items-center justify-center shadow"
          onClick={prev}
          aria-label="Previous PDF"
        >
          &#8592;
        </button>
        <iframe
          src={`/cocoon/${pdfFiles[current]}`}
          width="550"
          height="750"
          className="rounded"
          title={pdfFiles[current]}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-orange-900 rounded-full w-10 h-10 flex items-center justify-center shadow"
          onClick={next}
          aria-label="Next PDF"
        >
          &#8594;
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {pdfFiles.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full border border-white bg-white ${current === idx ? "opacity-100" : "opacity-40"}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
