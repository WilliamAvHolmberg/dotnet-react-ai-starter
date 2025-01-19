import { Star } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

interface GameLayoutProps {
    title: string;
    stars?: number;
    maxStars?: number;
    layout?: "default" | "split";
    className?: string;
    children: React.ReactNode;
    action?: React.ReactNode;
}

export function GameLayout({
    title,
    stars = 0,
    maxStars = 0,
    className,
    children,
    action
}: GameLayoutProps) {
    return (
        <div className={cn(
            "min-h-screen grid grid-rows-[auto_1fr]",
            "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white",
            className
        )}>
            {/* Compact Header with dramatic lighting */}
            <header className="relative p-4 border-b border-white/10 bg-blue-900/50 backdrop-blur">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 -top-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl" />
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl" />
                </div>

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold tracking-wider">{title}</h1>
                        {maxStars > 0 && (
                            <div className="flex items-center gap-2">
                                {Array.from({ length: maxStars }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-6 h-6 drop-shadow-lg transition-all duration-300",
                                            i < stars
                                                ? "fill-yellow-400 text-yellow-400 animate-pulse"
                                                : "text-yellow-400/30"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    {action}
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4 overflow-auto">
                {children}
            </main>
        </div>
    );
} 