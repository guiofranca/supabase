<script setup lang="ts">
import { z, ZodError } from 'zod';
import Input from '../Form/Input.vue';
import { useNotification } from '~/stores/NotificationStore';
import { Database } from '~/libs/types/Supabase.types';

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser().value!;
const notificationStore = useNotification();

interface Form {
    full_name: string | undefined
}

interface FormErrors {
    [key: string]: string[] | undefined
    [key: number]: string[] | undefined
    [key: symbol]: string[] | undefined
}

const loading = ref(true);
let formValues = ref<Form>({ full_name: '' });
let formErrors = ref<FormErrors>({ full_name: [] as string[] });

const validator = z.object({
    full_name: z.string().min(3).max(255)
});

const { data: profile } = await supabase
    .from('profiles')
    .select(`full_name`)
    .eq('id', user.id)
    .single();

formValues.value.full_name = profile?.full_name;

loading.value = false;

async function submit() {
    try {
        formErrors.value.full_name = [];
        loading.value = true;
        let validated = validator.parse(formValues.value);
        let { error } = await supabase.from('profiles').update(validated).eq('id', user.id);
        if(error == null) notificationStore.success('Nome atualizado.');
        else notificationStore.error('Houve um erro.')
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
</script>

<template>
    <form class="form-widget flex flex-col gap-4" @submit.prevent="submit">
        <Input label="Nome" type="text" v-model="formValues.full_name" :errors="formErrors.full_name" />
        <button type="submit" class="btn btn-block" :class="{loading: loading}" :disabled="loading">
            Salvar
        </button>
    </form>
</template>