<script setup lang="ts">
import NotificationHolder from '~/components/Notification/NotificationHolder.vue';
import { useTheme } from '~/stores/ThemeStore';

const themeStore = useTheme();
const route = useRoute();
const config = useRuntimeConfig();
</script>
<template>
    <div class="min-h-screen min-w-full" :data-theme="themeStore.theme">
        <Head>
            <Title>Supabase | {{ route.name }}</Title>
            <Link rel="shortcut icon" :href="`${config.public.SiteUrl}favicon.ico`" />
         </Head>
        <div class="max-w-5xl m-auto bg-base-200 min-h-screen relative">
            <div class="mx-2">
                <Navbar />
            </div>
            <NotificationHolder />
            <div class="container h-full min-w-full px-2 pt-10">
                <slot />
            </div>
        </div>
    </div>
</template>
