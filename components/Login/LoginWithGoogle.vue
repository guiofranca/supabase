<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()
const loading = ref(false);
const supabase = useSupabaseAuthClient();

async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: runtimeConfig.public.OauthRedirectUrl
        }
    });
}

</script>
<template>
    <button class="btn btn-secondary flex-grow" type="button" @click="signInWithGoogle" title="Login com google"
        :disabled="loading">
        <IconGoogle class="w-7 h-7" />
    </button>
</template>