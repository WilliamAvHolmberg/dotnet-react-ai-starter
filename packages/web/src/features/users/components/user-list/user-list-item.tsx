import { UserResponseDTO } from '../../api';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

interface UserListItemProps {
    user: UserResponseDTO;
    onDelete: (id: string) => void;
}

export function UserListItem({ user, onDelete }: UserListItemProps) {
    if (!user.id) return null;

    return (
        <tr className="border-b transition-colors hover:bg-muted/50 group">
            <td className="p-4 align-middle">
                <div className="flex flex-col">
                    <span className="font-medium">{user.firstName} {user.lastName}</span>
                </div>
            </td>
            <td className="p-4 align-middle">
                <span className="text-muted-foreground">{user.email}</span>
            </td>
            <td className="p-4 align-middle">
                <Badge 
                    variant={user.isActive ? "default" : "destructive"}
                    className={user.isActive ? "bg-emerald-500" : ""}
                >
                    {user.isActive ? "Active" : "Inactive"}
                </Badge>
            </td>
            <td className="p-4 align-middle">
                <span className="text-sm text-muted-foreground">
                    {user.createdAt && format(new Date(user.createdAt), 'PPP')}
                </span>
            </td>
            <td className="p-4 align-middle">
                <span className="text-sm text-muted-foreground">
                    {user.lastLoginAt && format(new Date(user.lastLoginAt), 'PPP')}
                </span>
            </td>
            <td className="p-4 align-middle text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        asChild
                    >
                        <Link to={`/users/${user.id}/edit`}>
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Link>
                    </Button> */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:text-destructive"
                        onClick={() => onDelete(user.id!)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </td>
        </tr>
    );
} 