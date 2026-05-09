interface DotIndicatorsProps {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
  className?: string;
}

const DotIndicators = ({
  total,
  active,
  onDotClick,
  className = "mt-6",
}: DotIndicatorsProps) => (
  <div className={`flex items-center gap-[6px] justify-center ${className}`}>
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDotClick(i)}
        aria-label={`Go to item ${i + 1}`}
        className={`
          rounded-full transition-all duration-300 cursor-pointer border-0 p-0
          ${
            i === active
              ? "w-6 h-2 bg-black"
              : "w-2 h-2 bg-black/20 hover:bg-black/40"
          }
        `}
      />
    ))}
  </div>
);

export default DotIndicators;
