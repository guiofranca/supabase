<script setup lang="ts">
</script>
<template>
    <div>
        <div class="card bg-base-100 shadow m-auto max-w-md">
            <div class="card-body">
                <div class="card-title flex justify-center prose pb-4">
                    <h2>Login</h2>
                </div>
                <div class="flex gap-2">
                    <LoginWithGoogle />
                    <LoginWithEmailForm />
                </div>
            </div>
        </div>

    </div>
</template>