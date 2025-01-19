import { usePostApiAuthLogin, usePostApiAuthLogout, useGetApiAuthMe } from '../../../api/hooks/api';
import type { LoginRequestDTO, UserProfileResponseDTO } from '../../../api/models';
import { useToast } from '../../../shared/components/ui/use-toast';

// Re-export the generated hooks with simpler names
export const useLogin = usePostApiAuthLogin;
export const useLogout = usePostApiAuthLogout;
export const useGetCurrentUser = useGetApiAuthMe;
export type { LoginRequestDTO, UserProfileResponseDTO };

// Custom hook for handling login with error handling
export const useLoginWithErrorHandling = () => {
    const loginMutation = usePostApiAuthLogin();
    const { toast } = useToast();

    return {
        ...loginMutation,
        login: async (credentials: LoginRequestDTO) => {
            try {
                await loginMutation.mutateAsync({ data: credentials });
                toast({
                    title: "Welcome back!",
                    description: "Successfully signed in.",
                    variant: "default",
                });
                return true;
            } catch {
                toast({
                    title: "Sign in failed",
                    description: "Please check your credentials and try again.",
                    variant: "destructive",
                });
                return false;
            }
        }
    };
}; 