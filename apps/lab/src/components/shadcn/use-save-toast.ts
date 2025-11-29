"use client";

import { toast } from "sonner";

type SaveToastMessages = {
    pending?: string;
    success?: string;
    error?: string;
};

/**
 * Wrap a promise with toast.promise for consistent pending/success/error messaging.
 * Returns the original promise so callers can await as usual.
 */
export function withSaveToast<T>(promise: Promise<T>, messages: SaveToastMessages) {
    toast.promise(promise, {
        loading: messages.pending ?? "Saving…",
        success: messages.success ?? "Saved",
        error: messages.error ?? "Unable to save",
    });
    return promise;
}
