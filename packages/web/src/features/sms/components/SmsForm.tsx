import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { SendSmsRequestDtoDTO } from "@/api/models";
import { useState } from "react";
import { ImproveMessageButton } from "./ImproveMessageButton";
import { ImproveMessageDialog } from "./ImproveMessageDialog";
import { Send } from "lucide-react";

const formSchema = z.object({
    from: z
        .string()
        .min(1, "From is required")
        .max(11, "From cannot be longer than 11 characters"),
    to: z
        .string()
        .min(1, "To is required")
        .regex(/^\+[1-9]\d{1,14}$/, "Must be in E.164 format (e.g., +46700000000)"),
    message: z
        .string()
        .min(1, "Message is required")
        .max(160, "Message cannot be longer than 160 characters"),
});

interface SmsFormProps {
    onSubmit: (data: SendSmsRequestDtoDTO) => void;
    isLoading: boolean;
}

export const SmsForm = ({ onSubmit, isLoading }: SmsFormProps) => {
    const [improveDialogOpen, setImproveDialogOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from: "",
            to: "",
            message: "",
        },
    });

    const currentMessage = form.watch("message");
    const canImprove = Boolean(currentMessage?.trim());

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-medium">From</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="YourCompany" 
                                        {...field} 
                                        className="border-gray-200 focus:border-gray-300 focus:ring-gray-100 transition-all duration-300 shadow-sm"
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500">
                                    Your sender ID (max 11 characters)
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-medium">To</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="+46700000000" 
                                        {...field} 
                                        className="border-gray-200 focus:border-gray-300 focus:ring-gray-100 transition-all duration-300 shadow-sm"
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500">
                                    Recipient's phone number in E.164 format
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center justify-between text-gray-700 font-medium">
                                <span>Message</span>
                                <ImproveMessageButton
                                    onClick={() => setImproveDialogOpen(true)}
                                    disabled={!canImprove}
                                />
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Type your message here..."
                                    className="min-h-[120px] resize-none border-gray-200 focus:border-gray-300 focus:ring-gray-100 transition-all duration-300 shadow-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                                Your message (max 160 characters)
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm hover:shadow transition-all duration-300 disabled:opacity-50"
                    >
                        <Send className="h-4 w-4" />
                        {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                </div>

                <ImproveMessageDialog
                    open={improveDialogOpen}
                    onOpenChange={setImproveDialogOpen}
                    message={currentMessage}
                />
            </form>
        </Form>
    );
}; 