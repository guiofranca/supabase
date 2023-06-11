<script setup lang="ts">
import { Notification, useNotification } from "~/stores/NotificationStore";

const props = defineProps<{
    notification: Notification;
}>();

const count = ref(3);
const autoDismiss = ref(true);
const notificationStore = useNotification();
const countdown = setInterval(() => count.value--, 1000);
const timeout = setTimeout(() => {
    notificationStore.dismiss(props.notification.id);
    clearInterval(countdown);
}, 4000);

function abortAutoDismiss() {
    clearInterval(countdown);
    clearTimeout(timeout);
    autoDismiss.value = false;
}
</script>
<template>
    <div
        class="alert flex justify-between shadow-lg animate-in fade-in zoom-in slide-in-from-top slide-in-from-right"
        v-on:mouseover="abortAutoDismiss"
        :class="[notification.type]"
    >
        <span class="countdown font-mono" v-if="autoDismiss">
            <span :style="`--value:${count};`"></span>
        </span>
        <span class="font-mono whitespace-nowrap" v-else>
            <span>--</span>
        </span>

        <span class="whitespace-pre-wrap"> {{ notification.message }}</span>
        <IconCross @click="notificationStore.dismiss(notification.id)" />
    </div>
</template>
