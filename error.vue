<script setup lang="ts">
import { useTheme } from "./stores/ThemeStore";

interface MeuErro {
    statusCode: number;
    message: string;
}

defineProps<{
    error: MeuErro;
}>();

const layout = "error-layout";

const handleError = () => {
    clearError({ redirect: "/" });
};
</script>
<template>
    <NuxtLayout :name="layout">
        <div class="hero bg-base-300 py-10 mt-5 rounded-2xl shadow-2xl">
            <div class="hero-content text-center">
                <div class="">
                    <h1 class="text-5xl font-bold">{{ error.statusCode }}</h1>
                    <p class="py-6">{{ error.message }}</p>
                    <button class="btn" @click="handleError">Voltar</button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
