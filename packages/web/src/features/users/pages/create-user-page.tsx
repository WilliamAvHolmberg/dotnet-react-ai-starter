import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../api";
import { useToast } from "@/shared/components/ui/use-toast";
import { Button } from "@/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AxiosError } from "axios";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ErrorResponse {
    message: string;
    errors?: string[];
}

export function CreateUserPage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { mutateAsync, isPending } = useCreateUser();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await mutateAsync({
                data: {
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }
            });

            toast({
                title: "User created",
                description: "The user has been created successfully.",
            });

            navigate("/users");
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data) {
                const data = error.response.data as ErrorResponse;
                const description = data.errors?.join('\n') || data.message || "Failed to create user. Please try again.";
                
                toast({
                    title: "Error",
                    description,
                    variant: "destructive",
                });

                // If we have specific field errors, set them in the form
                if (data.errors) {
                    form.setError('root', {
                        type: 'server',
                        message: description
                    });
                }
            } else {
                toast({
                    title: "Error",
                    description: "An unexpected error occurred. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <div className="container py-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create User</h1>
                <p className="text-muted-foreground">
                    Add a new user to the system.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                    <CardDescription>
                        Enter the details for the new user.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {form.formState.errors.root && (
                                <div className="text-sm font-medium text-destructive">
                                    {form.formState.errors.root.message}
                                </div>
                            )}
                            
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/users")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                >
                                    {isPending ? "Creating..." : "Create User"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
} 