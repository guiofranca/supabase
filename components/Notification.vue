<script setup lang="ts">
import { useNotification } from '~/stores/NotificationStore';
import NotificationAlert from './Notification/NotificationAlert.vue';

const notificationStore = useNotification();

</script>
<template>
    <div class="absolute top-4 right-1/2 transform translate-x-1/2 flex flex-col gap-2 z-10">
        <NotificationAlert v-for="notification in notificationStore.notifications" :key="notification.id"
            :notification="notification" />
    </div>
</template>