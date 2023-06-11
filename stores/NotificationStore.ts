import { defineStore } from "pinia"

export interface Notification {
    id: string,
    message: string,
    type: string,
}

export const useNotification = defineStore('notification', {
    persist: true,
    state: () => ({
        notifications: [] as Notification[]
    }),

    actions: {
        info(message: string) {
            this.notifications.push({
                id: Math.floor(Math.random() * 100000).toString(),
                message: message,
                type: 'border-info'
            });
        },
        success(message: string) {
            this.notifications.push({
                id: Math.floor(Math.random() * 100000).toString(),
                message: message,
                type: 'border-success'
            });
        },
        warning(message: string) {
            this.notifications.push({
                id: Math.floor(Math.random() * 100000).toString(),
                message: message,
                type: 'border-warning'
            });
        },
        error(message: string) {
            this.notifications.push({
                id: Math.floor(Math.random() * 100000).toString(),
                message: message,
                type: 'border-error'
            });
        },
        dismiss(id: string) {
            this.notifications = this.notifications.filter((notification) => notification.id != id);
        }
    },
    getters: {
        possuiNotificacoes: (state) => state.notifications.length > 0,
    }
})