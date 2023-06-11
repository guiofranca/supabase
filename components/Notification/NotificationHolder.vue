<script setup lang="ts">
import { useNotification } from "~/stores/NotificationStore";

const notificationStore = useNotification();
</script>
<template>
    <div
        v-if="notificationStore.possuiNotificacoes"
        class="toast toast-top toast-center z-10 w-full sm:w-96 items-center"
    >
        <NotificationAlert
            v-for="notification in notificationStore.notifications"
            :key="notification.id"
            :notification="notification"
        />
    </div>
</template>
