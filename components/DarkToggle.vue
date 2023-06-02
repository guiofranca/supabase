<script setup lang="ts">
import { useTheme } from "~/stores/ThemeStore";

const themeStore = useTheme();
</script>
<template>
    <label class="swap swap-rotate btn btn-ghost btn-circle">
        <!-- this hidden checkbox controls the state -->
        <input
            type="checkbox"
            :checked="themeStore.dark"
            @click="themeStore.toggle()"
        />

        <!-- moon icon -->
        <IconMoon class="swap-off fill-current w-7 h-7" />

        <!-- sun icon -->
        <IconSun class="swap-on fill-current w-7 h-7" />
    </label>
</template>
