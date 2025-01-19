import { cn } from '@/shared/utils/utils';

interface GameCardProps {
    title: string;
    score?: number;
    isActive?: boolean;
    color?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'score' | 'highlight';
}

export function GameCard({
    title,
    score,
    isActive,
    color,
    icon,
    children,
    className,
    variant = 'default'
}: GameCardProps) {
    return (
        <div className={cn(
            "rounded-2xl border-0 transition-all duration-300",
            // Base styles by variant
            variant === 'default' && "bg-white/10 backdrop-blur-sm",
            variant === 'score' && "bg-white/20 backdrop-blur-sm",
            variant === 'highlight' && "bg-blue-500/20 backdrop-blur-sm",
            // Active state
            isActive && "ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20",
            className
        )}
        style={color ? {
            background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)`
        } : undefined}>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div className="text-white/80">
                                {icon}
                            </div>
                        )}
                        <h2 className="text-2xl font-bold tracking-wide">
                            {title}
                        </h2>
                    </div>
                    {typeof score === 'number' && (
                        <div className="text-4xl font-bold text-yellow-400 drop-shadow-glow">
                            {score}
                        </div>
                    )}
                </div>
                {children && (
                    <div className="mt-4">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
} 