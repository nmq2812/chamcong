'use client';
import vi from "./vi.json";
import en from "./en.json";
import useLanguage from "@/hooks/use-language";

export function translate(key: string): string {
    const language = useLanguage.getState().language;
    const viTranslation = (vi as Record<string, string>)[key];
    const enTranslation = (en as Record<string, string>)[key];

    if (language === "vi") {
        return viTranslation || key;
    } else if (language === "en") {
        return enTranslation || key;
    } else {
        return key;
    }
}
