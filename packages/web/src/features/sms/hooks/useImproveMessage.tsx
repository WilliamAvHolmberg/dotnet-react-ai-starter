import { usePostApiSmsImprove } from "@/api/hooks/api";
import { useToast } from "@/shared/components/ui/use-toast";

export const useImproveMessage = () => {
  const { toast } = useToast();
  const { mutateAsync, isPending } = usePostApiSmsImprove({
    mutation: {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error improving message",
          description: error.message || "Something went wrong. Please try again.",
        });
      },
    },
  });

  const improveMessage = async (message: string) => {
    try {
      const result = await mutateAsync({
        data: {
          currentMessage: message,
        },
      });
      return result;
    } catch (error) {
      // Error is handled by the onError callback
      return null;
    }
  };

  return {
    improveMessage,
    isImproving: isPending,
  };
}; 