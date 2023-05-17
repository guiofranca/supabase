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
                type: 'alert-info'
            });
        },
        success(message: string) {
            this.notifications.push({
                id: Math.floor(Math.random() * 100000).toString(),
                message: message,
                type: 'alert-success'
            });
        },
        warning(message: string) {
            this.notifications.push({
                id: Math.floor(Math.random() * 100000).toString(),
                message: message,
                type: 'alert-warning'
            });
        },
        error(message: string) {
            this.notifications.push({
                id: Math.floor(Math.random() * 100000).toString(),
                message: message,
                type: 'alert-error'
            });
        },
        dismiss(id: string) {
            this.notifications = this.notifications.filter((notification) => notification.id != id);
        }
    }
})