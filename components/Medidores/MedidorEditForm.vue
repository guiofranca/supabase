<script setup lang="ts">
import { z, ZodError } from 'zod';
import Input from '../Form/Input.vue';
import { useNotification } from '~/stores/NotificationStore';
import { Medidor, useMedidor } from '~/stores/MedidorStore';

const props = defineProps<{
    medidor: Medidor
}>();

const notificationStore = useNotification();
const medidorStore = useMedidor();
const loading = ref(true);
const medidorInicial = { nome: props.medidor.nome, descricao: props.medidor.descricao };
const erroInicial = { nome: [] as string[], descricao: [] as string[] };
let formValues = ref<Form>(medidorInicial);
let formErrors = ref<FormErrors>(erroInicial);
const validator = z.object({
    nome: z.string().min(3).max(255),
    descricao: z.string().min(3).max(255),
});

interface Form {
    nome: string | undefined,
    descricao: string | undefined
}

interface FormErrors {
    [key: string]: string[] | undefined
    [key: number]: string[] | undefined
    [key: symbol]: string[] | undefined
}

loading.value = false;

async function submit() {
    try {
        formErrors.value = erroInicial;
        loading.value = true;
        let validated = validator.parse(formValues.value);
        await medidorStore.edit(validated, props.medidor);
        navigateTo('/medidores');
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
        <Input label="Nome" type="text" v-model="formValues.nome" :errors="formErrors.nome" />
        <Input label="Descrição" type="text" v-model="formValues.descricao" :errors="formErrors.descricao" />
        <button type="submit" class="btn btn-block" :class="{loading: loading}" :disabled="loading">
            Salvar
        </button>
    </form>
</template>