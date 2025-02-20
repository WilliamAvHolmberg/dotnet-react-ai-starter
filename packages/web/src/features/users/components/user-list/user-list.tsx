import { useState, useCallback } from "react";
import { useUsers, useDeleteUser } from "../../api";
import { UserListItem } from "./user-list-item";
import { UserSearch } from "./user-search";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { useToast } from "@/shared/components/ui/use-toast";

export function UserList() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();

    const { data: userList, isLoading, error, refetch } = useUsers({
        Page: page,
        PageSize: 10,
        SearchTerm: searchTerm || undefined
    });

    const deleteUser = useDeleteUser({
        mutation: {
            onSuccess: () => {
                toast({
                    title: "User deleted",
                    description: "The user has been successfully deleted.",
                });
                refetch();
            },
            onError: () => {
                toast({
                    title: "Error",
                    description: "Failed to delete user. Please try again.",
                    variant: "destructive",
                });
            }
        }
    });

    const handleDelete = useCallback(async (id: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser.mutateAsync({ id });
        }
    }, [deleteUser]);

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
        setPage(1); // Reset to first page when searching
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="space-y-3 text-center animate-pulse">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground/50" />
                    <p className="text-lg text-muted-foreground">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="space-y-3 text-center text-destructive">
                    <p className="text-lg">Unable to load users</p>
                    <p className="text-sm text-muted-foreground">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <UserSearch onSearch={handleSearch} initialValue={searchTerm} />
                <Button asChild>
                    <Link to="/users/create" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>Create User</span>
                    </Link>
                </Button>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium">Name</TableHead>
                            <TableHead className="font-medium">Email</TableHead>
                            <TableHead className="font-medium">Status</TableHead>
                            <TableHead className="font-medium">Created</TableHead>
                            <TableHead className="font-medium">Last Login</TableHead>
                            <TableHead className="font-medium text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userList?.items?.map((user) => (
                            <UserListItem
                                key={user.id}
                                user={user}
                                onDelete={handleDelete}
                            />
                        ))}
                        {userList?.items?.length === 0 && (
                            <TableRow>
                                <td colSpan={6} className="h-32 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <Users className="w-8 h-8 text-muted-foreground/50" />
                                        <p className="text-lg text-muted-foreground font-medium">No users found</p>
                                        <p className="text-sm text-muted-foreground">Try adjusting your search</p>
                                    </div>
                                </td>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {userList?.items && (
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium">{userList.items.length}</span> of{" "}
                        <span className="font-medium">{userList.totalCount ?? 0}</span> users
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= (userList.totalPages ?? 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
} 