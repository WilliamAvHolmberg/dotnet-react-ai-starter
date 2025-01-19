import { Timer } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

interface GameTimerProps {
    seconds: number;
    label?: string;
    isPaused?: boolean;
    className?: string;
}

export function GameTimer({ seconds, label, isPaused, className }: GameTimerProps) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div className={cn(
            "text-center p-4 rounded-lg",
            isPaused && "opacity-50",
            className
        )}>
            <div className="relative flex flex-col items-center">
                <Timer className={cn(
                    "text-blue-300 mb-1",
                    "w-8 h-8"
                )} />
                <div className={cn(
                    "font-bold text-white tracking-tight leading-none",
                    "text-4xl"
                )}>
                    {minutes}:{remainingSeconds.toString().padStart(2, '0')}
                </div>
                {label && (
                    <div className={cn(
                        "mt-1 text-blue-300 text-center",
                        "text-sm max-w-[100px]"
                    )}>
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
} 