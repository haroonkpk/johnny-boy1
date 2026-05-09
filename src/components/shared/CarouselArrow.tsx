import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}

const CarouselArrow = ({ direction, onClick, className = "" }: CarouselArrowProps) => (
  <div className={className}>
    <Button
      variant="secondary"
      onClick={onClick}
      className="!p-4"
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      {direction === "left" ? (
        <ChevronLeft size={18} strokeWidth={2.2} />
      ) : (
        <ChevronRight size={18} strokeWidth={2.2} />
      )}
    </Button>
  </div>
);

export default CarouselArrow;
