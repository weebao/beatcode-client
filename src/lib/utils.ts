import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "svelte-sonner";
import type { ActionResult } from "@sveltejs/kit";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function announce(result: ActionResult, successMsg: string, customErrorMsg?: string) {
    if (result.type === "success" || result.type === "redirect") {
        toast.success(successMsg);
    } else if (customErrorMsg) {
        toast.error(customErrorMsg);
    } else if (result.type === "error") {
        toast.error(`${result.status}: ${result.error?.message}`);
    } else if (result.type === "failure") {
        toast.error(`${result.status}: ${result.data?.message}`);
    }
}
