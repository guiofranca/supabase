<script setup lang="ts">

interface MeuErro {
    statusCode: number,
    message: string
}

defineProps<{
    error: MeuErro
}>();

const router = useRouter();

clearError();

const handleError = () => {
    router.go(-1);
}
</script>
<template>
    <div class="hero bg-base-300 py-10 mt-5 rounded-2xl shadow-2xl max-w-5xl m-auto">
        <div class="hero-content text-center">
            <div class="">
                <h1 class="text-5xl font-bold">{{ error.statusCode }}</h1>
                <p class="py-6">{{ error.message }}</p>
                <button class="btn btn-secondary" @click="handleError">Voltar</button>
            </div>
        </div>
    </div>
</template>
  
