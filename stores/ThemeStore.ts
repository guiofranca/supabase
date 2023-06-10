import { defineStore } from "pinia";

export const useTheme = defineStore('theme', {
    persist: true,
    state: () => ({
        dark: true,
    }),

    actions: {
        toggle() {
            this.dark = !this.dark;
        },
    },
    getters: {
        theme: (state) => state.dark ? 'dark' : 'light',
    }
})