import { memo, useCallback, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { useDebounceCallback } from "@/shared/hooks/use-debounce";
import { Search } from "lucide-react";

interface UserSearchProps {
    onSearch: (term: string) => void;
    initialValue?: string;
}

export const UserSearch = memo(({ onSearch, initialValue = "" }: UserSearchProps) => {
    const [value, setValue] = useState(initialValue);
    const debouncedSearch = useDebounceCallback(onSearch, 300);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        debouncedSearch(newValue);
    }, [debouncedSearch]);

    return (
        <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search users..."
                value={value}
                onChange={handleChange}
                className="pl-8"
            />
        </div>
    );
});

UserSearch.displayName = "UserSearch"; 