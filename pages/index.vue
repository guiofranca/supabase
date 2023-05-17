<template>
    <div class="p-4">
        <button class="btn" @click="notificationStore.info(`let's bora!`)">Hello daisyUI</button>
    </div>
</template>
<script setup lang="ts">
import { useNotification } from '~/stores/NotificationStore';

const notificationStore = useNotification();

</script>