import { defineStore } from "pinia"

export const useCounter = defineStore('counter', {
    persist: true,
    state: () => ({
        n: 2,
    }),

    actions: {
        increment(amount = 1) {
            this.n += amount
        },

        decrement(amount = 1) {
            this.n -= amount
        },
    },
})