type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-48 
                   bg-[#1a3a2b] text-[#ffd700] text-xs p-2 rounded-lg opacity-0 
                   pointer-events-none group-hover:opacity-100 transition-opacity z-50
                   shadow-lg"
      >
        {content}
      </div>
    </div>
  );
}
