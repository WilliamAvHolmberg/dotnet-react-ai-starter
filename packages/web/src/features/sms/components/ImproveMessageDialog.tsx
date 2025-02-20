import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useImproveMessage } from "../hooks/useImproveMessage";
import { SmsImproveResponseDTODTO } from "@/api/models";
import { Check, Copy, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useToast } from "@/shared/components/ui/use-toast";
import { cn } from "@/shared/utils/utils";

interface ImproveMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export const ImproveMessageDialog = ({
  open,
  onOpenChange,
  message,
}: ImproveMessageDialogProps) => {
  const { toast } = useToast();
  const { improveMessage, isImproving } = useImproveMessage();
  const [improvements, setImprovements] = useState<SmsImproveResponseDTODTO | null>(
    null
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleImprove = async () => {
    const result = await improveMessage(message);
    if (result) {
      setImprovements(result);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: "Copied to clipboard",
      description: "The improved message has been copied to your clipboard.",
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Reset improvements when dialog closes
  useEffect(() => {
    if (!open) {
      setImprovements(null);
    }
  }, [open]);

  // Fetch improvements when dialog opens
  useEffect(() => {
    if (open && message && !improvements && !isImproving) {
      handleImprove();
    }
  }, [open, message]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-white to-indigo-50/50">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center gap-2 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            Message Enhancements
          </DialogTitle>
          <p className="text-sm text-muted-foreground font-normal">
            We've crafted three unique variations of your message, each designed to maximize impact while maintaining your intent.
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <h4 className="text-sm font-medium mb-2 text-indigo-700">Original Message</h4>
            <p className="text-sm text-indigo-900">{message}</p>
          </div>

          {isImproving ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-sm text-indigo-600 animate-pulse">Crafting your enhancements...</p>
            </div>
          ) : (
            improvements?.improvements?.map((improvement, index) => (
              <div
                key={index}
                className="group p-6 border border-indigo-100 rounded-lg space-y-3 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100 bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2 text-indigo-700 flex items-center gap-2">
                      Enhancement {index + 1}
                      <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
                        Version {String.fromCharCode(65 + index)}
                      </span>
                    </p>
                    <p className="text-base text-indigo-900">{improvement.improvedText}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(improvement.improvedText || "", index)}
                    className={cn(
                      "shrink-0 transition-all duration-300",
                      copiedIndex === index 
                        ? "bg-green-100 text-green-600 hover:bg-green-200" 
                        : "hover:bg-indigo-100 text-indigo-600"
                    )}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {improvement.explanation && (
                  <div className="p-3 rounded-md bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border border-indigo-100">
                    <p className="text-sm text-indigo-700">{improvement.explanation}</p>
                  </div>
                )}
              </div>
            ))
          )}

          <div className="flex justify-end pt-4">
            <Button
              variant="ghost"
              onClick={handleImprove}
              disabled={isImproving}
              className="gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 hover:text-indigo-800 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {isImproving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Regenerate Enhancements
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 