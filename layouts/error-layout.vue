<script setup lang="ts">
import NotificationHolder from '~/components/Notification/NotificationHolder.vue';
import { useTheme } from '~/stores/ThemeStore';

const themeStore = useTheme();
const route = useRoute();
</script>
<template>
    <div class="min-h-screen min-w-full" :data-theme="themeStore.theme">
        <Head>
            <Title>Supabase | Erro</Title>
         </Head>
        <div class="max-w-5xl m-auto bg-base-200 min-h-screen relative">
            <div class="container h-full min-w-full px-8 py-10">
                <slot />
            </div>
        </div>
    </div>
</template>
