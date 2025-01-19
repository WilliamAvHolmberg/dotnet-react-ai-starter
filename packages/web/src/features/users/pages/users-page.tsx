import { UserList } from "../components/user-list/user-list";

export function UsersPage() {
    return (
        <div className="container py-10 space-y-8">
            <div className="flex flex-col space-y-1.5">
                <h1 className="text-4xl font-semibold tracking-tight">Users</h1>
                <p className="text-muted-foreground">
                    Manage your system users here.
                </p>
            </div>
            <UserList />
        </div>
    );
} 