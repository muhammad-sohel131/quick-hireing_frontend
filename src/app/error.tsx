"use client";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="text-center py-20 flex justify-center items-center h-[100vh]">
            <div>
                <h2 className="text-xl font-bold">Something went wrong!</h2>
                <p>{error.message}</p>

                <div className="flex gap-5 justify-center">
                    <button
                        onClick={() => reset()}
                        className="mt-4 px-4 py-2 bg-[var(--brandColor)] text-white rounded"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="mt-4 px-4 py-2 text-[var(--brandColor)] bg-white rounded border border-[var(--brandColor)]"
                    >
                       Home
                    </Link>
                </div>
            </div>
        </div>
    );
}