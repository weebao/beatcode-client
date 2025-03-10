import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "svelte-sonner";
import type { ActionResult } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { Ranks } from "$assets/config/game";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const announce = (result: ActionResult, successMsg: string, customErrorMsg?: string) => {
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
};

export const log = (message?: any, ...optionalParams: any[]) => {
    if (dev) {
        console.log(message, ...optionalParams);
    }
};

export const getRank = (rating: number) => {
    for (let i = 0; i < Ranks.length; i++) {
        if (rating < Ranks[i].nextRating) {
            return Ranks[i];
        }
    }
    return Ranks[0];
};
