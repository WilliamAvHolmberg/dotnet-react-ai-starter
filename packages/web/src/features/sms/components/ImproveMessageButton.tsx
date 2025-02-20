import { Button } from "@/shared/components/ui/button";
import { Sparkles } from "lucide-react";

interface ImproveMessageButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const ImproveMessageButton = ({
  onClick,
  disabled = false,
}: ImproveMessageButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="gap-2 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 shadow-sm hover:shadow transition-all duration-300 group disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200"
    >
      <Sparkles className="h-4 w-4 text-purple-500 group-hover:text-purple-600" />
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:from-purple-700 group-hover:to-indigo-700">
        Enhance
      </span>
    </Button>
  );
}; 