import { usePostApiSmsSend } from "@/api/hooks/api";
import { SendSmsRequestDtoDTO } from "@/api/models";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { toast } from "@/shared/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { SmsForm } from "./SmsForm";
import { SmsHistory } from "./SmsHistory";
import { MessageSquareText } from "lucide-react";

export const SmsPage = () => {
  const queryClient = useQueryClient();
  const { mutate: sendSms, isPending } = usePostApiSmsSend({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Message sent successfully! 🚀",
          description: "Your SMS has been delivered to our sending queue.",
          className: "bg-white border-gray-200",
        });
        // Invalidate the history query to show the new message
        queryClient.invalidateQueries({ queryKey: ["/api/Sms/history"] });
      },
      onError: (error) => {
        toast({
          title: "Failed to send message",
          description: error.message,
          variant: "destructive",
        });
      },
    },
  });

  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card className="border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
        <div className="relative">
          <CardHeader className="pb-8">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500">
                <MessageSquareText className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-medium text-gray-900">
                  Send SMS
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Send an SMS message using 46elks. The phone number must be in E.164
                  format (e.g., +46700000000).
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SmsForm 
              onSubmit={(data: SendSmsRequestDtoDTO) => sendSms({ data })} 
              isLoading={isPending} 
            />
          </CardContent>
        </div>
      </Card>

      <SmsHistory />
    </div>
  );
}; 