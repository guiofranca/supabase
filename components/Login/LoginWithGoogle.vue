<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const loading = ref(false);
const supabase = useSupabaseClient();

async function signInWithGoogle() {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: runtimeConfig.public.SiteUrl
        }
    });
    loading.value = false;
}
</script>
<template>
    <button
        class="btn btn-neutral btn-circle flex-grow"
        type="button"
        @click="signInWithGoogle"
        title="Login com google"
        :class="{ loading }"
        :disabled="loading"
    >
        <IconGoogle class="w-7 h-7" />
    </button>
</template>
