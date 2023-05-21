<script setup lang="ts">
import { z, ZodError } from 'zod';
import { useNotification } from '~/stores/NotificationStore';
import InputGroup from '../Form/InputGroup.vue';

const supabase = useSupabaseClient();
const notificationStore = useNotification();

interface Form {
    email: string | undefined
}

interface FormErrors {
    [key: string]: string[] | undefined
    [key: number]: string[] | undefined
    [key: symbol]: string[] | undefined
}

const loading = ref(false);
let formValues = ref<Form>({ email: '' });
let formErrors = ref<FormErrors>({ email: [] as string[] });

const validator = z.object({
    email: z.string().email()
});

async function submit() {
    try {
        formErrors.value.email = [];
        loading.value = true;
        let validated = validator.parse(formValues.value);
        const { error } = await supabase.auth.signInWithOtp(validated)
        if (error != null) notificationStore.error('Houve um erro.')
    } catch (error) {
        if (error instanceof ZodError) {
            notificationStore.error('Erro de validação.')
            formErrors.value = error.flatten().fieldErrors;
        } else {
            notificationStore.error('Houve um erro desconhecido.')
        }
    } finally {
        loading.value = false
    }
}

const handleLogin = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signInWithOtp({ email: formValues.value.email! })
        if (error) throw error
        notificationStore.info('Verifique seu e-mail!');
    } catch (error) {
        notificationStore.error('houve um erro');
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <form class="" @submit.prevent="submit" title="Login com e-mail" >
        <InputGroup type="text" v-model="formValues.email" :errors="formErrors.email"
            placeholder="email@example.com">
            <button type="submit" class="btn btn-secondary" :class="{ loading: loading }" :disabled="loading">
                <IconEmail />
            </button>
        </InputGroup>
    </form>
</template>