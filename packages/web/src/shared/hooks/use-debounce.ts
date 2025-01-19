import { useEffect, useCallback, useState, useRef } from 'react';

// For debouncing values
export function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

// For debouncing callbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounceCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
): (...args: Parameters<T>) => void {
    // Keep the timeout reference stable across renders
    const timeoutRef = useRef<NodeJS.Timeout>();
    // Keep the callback stable across renders
    const callbackRef = useRef(callback);

    // Update the callback ref when it changes
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return useCallback((...args: Parameters<T>) => {
        // Clear the previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set the new timeout
        timeoutRef.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    }, [delay]); // Only delay affects the callback identity
}

// Alias for backward compatibility
export const useDebounce = useDebounceCallback; 