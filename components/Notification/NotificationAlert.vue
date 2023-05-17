<script setup lang="ts">
import { Notification, useNotification } from '~/stores/NotificationStore';

const props = defineProps<{
    notification: Notification
}>();

const count = ref(3);
const notificationStore = useNotification();
const timeout = setTimeout(() => notificationStore.dismiss(props.notification.id), 4000);
const countdown = setInterval(() => count.value--, 1000);

function abortAutoDismiss() {
    clearInterval(countdown);
    clearTimeout(timeout);
}
</script>
<template>
    <div class="alert shadow-lg w-96 animate-in fade-in zoom-in slide-in-from-top slide-in-from-right"
        v-on:mouseover="abortAutoDismiss"
        :class="[notification.type]">
        <div class="w-full flex flex-row justify-between">
            <span class="countdown font-mono">
                <span :style="`--value:${count};`"></span>
            </span>
            <span> {{ notification.message }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"
                fill="none" @click="notificationStore.dismiss(notification.id)">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
    </div>
</template>