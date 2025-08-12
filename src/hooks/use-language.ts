import {create} from "zustand";

const useLanguage = create<{ language: string; changeLanguage: (newLanguage: string) => void }>((set) => ({
    language: "en",
    changeLanguage: (newLanguage: string) => set(() => ({ language: newLanguage })),
}));

export default useLanguage;