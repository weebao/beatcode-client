import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "svelte-sonner";
import type { ActionResult } from "@sveltejs/kit";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function announce(result: ActionResult, successMsg: string, customErrorMsg?: string) {
    const findErrorMsg = (data: Record<string, any> | undefined) => {
        console.log(data);
        if (!data) {
            return "An unknown error occurred";
        }
        if (data.error) {
            return data.error.message || data.error.detail;
        }

        for (const key in data) {
            if (data[key]?.errors) {
                for (const errorKey in data[key].errors) {
                    const errorMessage = data[key].errors[errorKey];
                    if (errorMessage !== undefined) {
                        return errorMessage[0];
                    }
                }
            }
        }
        return data?.message;
    };

    if (result.type === "success" || result.type === "redirect") {
        toast.success(successMsg);
    } else if (customErrorMsg) {
        toast.error(customErrorMsg);
    } else if (result.type === "error") {
        toast.error(`${result.status}: ${findErrorMsg(result)}`);
    } else if (result.type === "failure") {
        toast.error(`${result.status}: ${findErrorMsg(result.data)}`);
    }
}
