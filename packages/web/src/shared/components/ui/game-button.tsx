import { cn } from '@/shared/utils/utils';

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'score' | 'highlight';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    glow?: boolean;
}

export function GameButton({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    glow = false,
    className,
    children,
    ...props
}: GameButtonProps) {
    return (
        <button
            className={cn(
                "relative rounded-xl font-bold tracking-wide transition-all duration-300",
                // Base styles
                "backdrop-blur-sm shadow-lg",
                // Variants
                variant === 'primary' && "bg-blue-500/80 hover:bg-blue-500/90 text-white",
                variant === 'secondary' && "bg-white/10 hover:bg-white/20 text-white",
                variant === 'score' && "bg-purple-500/80 hover:bg-purple-500/90 text-white",
                variant === 'highlight' && "bg-yellow-500/80 hover:bg-yellow-500/90 text-white",
                // Sizes
                size === 'sm' && "px-4 py-2 text-sm",
                size === 'md' && "px-6 py-3 text-base",
                size === 'lg' && "px-8 py-4 text-lg",
                // Glow effect
                glow && variant === 'primary' && "shadow-blue-500/50",
                glow && variant === 'score' && "shadow-purple-500/50",
                glow && variant === 'highlight' && "shadow-yellow-500/50",
                // Full width
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {/* Hover glow effect */}
            <span className={cn(
                "absolute inset-0 rounded-xl transition-opacity duration-300",
                "opacity-0 group-hover:opacity-100",
                variant === 'primary' && "bg-blue-400/20",
                variant === 'score' && "bg-purple-400/20",
                variant === 'highlight' && "bg-yellow-400/20"
            )} />
            
            {/* Content */}
            <span className="relative">
                {children}
            </span>
        </button>
    );
} 