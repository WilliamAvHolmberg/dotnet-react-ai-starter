import { 
    useGetApiUsers,
    useGetApiUsersId,
    usePostApiUsers,
    usePutApiUsersId,
    useDeleteApiUsersId
} from '../../../api/hooks/api';

import type {
    UserListResponseDTO,
    UserResponseDTO,
    CreateUserRequestDTO,
    UpdateUserRequestDTO
} from '../../../api/models';

// Re-export types for convenience
export type {
    UserListResponseDTO,
    UserResponseDTO,
    CreateUserRequestDTO,
    UpdateUserRequestDTO
};

// Re-export hooks with better names
export const useUsers = useGetApiUsers;
export const useUser = useGetApiUsersId;
export const useCreateUser = usePostApiUsers;
export const useUpdateUser = usePutApiUsersId;
export const useDeleteUser = useDeleteApiUsersId; 