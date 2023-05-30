<script setup lang="ts">
import { useNotification } from "~/stores/NotificationStore";

const notificationStore = useNotification();
</script>
<template>
    <div class="toast toast-top toast-center z-10">
        <NotificationAlert
            v-for="notification in notificationStore.notifications"
            :key="notification.id"
            :notification="notification"
        />
    </div>
</template>
