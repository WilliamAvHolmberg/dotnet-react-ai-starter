import { useGetApiSmsHistory } from "@/api/hooks/api";
import { SmsMessageResponseDtoDTO } from "@/api/models";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { format } from "date-fns";
import { CheckCircle2, History, Loader2, MessageSquare, XCircle } from "lucide-react";
import { memo } from "react";

// Memoized empty state
const EmptyState = memo(() => (
  <TableRow>
    <TableCell colSpan={4} className="h-32">
      <div className="flex flex-col items-center justify-center space-y-3">
        <MessageSquare className="h-8 w-8 text-gray-300" />
        <p className="text-sm text-gray-500">No messages sent yet</p>
      </div>
    </TableCell>
  </TableRow>
));
EmptyState.displayName = "EmptyState";

// Memoized error state
const ErrorState = memo(() => (
  <div className="py-8 text-center text-red-500 space-y-3">
    <XCircle className="h-8 w-8 mx-auto" />
    <p className="text-sm">Failed to load message history</p>
  </div>
));
ErrorState.displayName = "ErrorState";

// Memoized loading state
const LoadingState = memo(() => (
  <TableRow>
    <TableCell colSpan={4} className="h-32">
      <div className="flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <p className="text-sm text-gray-500">Loading messages...</p>
      </div>
    </TableCell>
  </TableRow>
));
LoadingState.displayName = "LoadingState";

const MessageRow = memo(({ message }: { message: SmsMessageResponseDtoDTO }) => (
  <TableRow className="group transition-all duration-200 hover:bg-gray-50">
    <TableCell className="font-medium">
      <div className="flex items-center gap-2">
        {message.sent ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        ) : (
          <XCircle className="h-4 w-4 text-red-500" />
        )}
        <span className={message.sent ? "text-emerald-700" : "text-red-700"}>
          {message.sent ? "Sent" : "Failed"}
        </span>
      </div>
    </TableCell>
    <TableCell className="text-gray-700">{message.to}</TableCell>
    <TableCell className="max-w-md truncate text-gray-600">{message.message}</TableCell>
    <TableCell className="text-right text-gray-500 tabular-nums">
      {message.createdAt ? format(new Date(message.createdAt), "PPp") : "N/A"}
    </TableCell>
  </TableRow>
));
MessageRow.displayName = "MessageRow";

export const SmsHistory = () => {
  const { data: messages, isLoading, error } = useGetApiSmsHistory();

  if (error) return <ErrorState />;

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-gray-400" />
          <div>
            <CardTitle className="text-gray-700">Message History</CardTitle>
            <CardDescription className="text-gray-500">
              View all your sent messages
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-100">
                <TableHead className="text-gray-600 font-medium">Status</TableHead>
                <TableHead className="text-gray-600 font-medium">To</TableHead>
                <TableHead className="text-gray-600 font-medium">Message</TableHead>
                <TableHead className="text-right text-gray-600 font-medium">Sent At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LoadingState />
              ) : messages?.length ? (
                messages.map((message) => (
                  <MessageRow key={message.id} message={message} />
                ))
              ) : (
                <EmptyState />
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}; 