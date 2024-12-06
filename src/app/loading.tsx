'use client'

import { Spinner } from "@/components/ui/spinner";

// loading.tsx
export default function Loading() {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] pointer-events-auto" 
            aria-live="assertive" 
            aria-busy="true"
        >
            <Spinner size='large' />
            <span className="sr-only">Loading...</span>
        </div>
    );
}
