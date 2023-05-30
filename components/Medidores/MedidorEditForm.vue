<script setup lang="ts">
import { z, ZodError } from "zod";
import Input from "../Form/Input.vue";
import MultipleSelect from "../Form/MultipleSelect.vue";
import { useNotification } from "~/stores/NotificationStore";
import { Medidor, useMedidor } from "~/stores/MedidorStore";
import { useGrandeza } from "~/stores/GrandezaStore";

const props = defineProps<{
    medidor: Medidor;
}>();

interface Form {
    nome: string | undefined;
    descricao: string | undefined;
    grandezas: number[];
}

const notificationStore = useNotification();
const medidorStore = useMedidor();
const grandezaStore = useGrandeza();
const loading = ref(true);
await grandezaStore.refreshAll();
const options = grandezaStore.grandezas.map((grandeza) => ({
    id: grandeza.id,
    value: grandeza.nome,
}));
const medidorInicial = {
    nome: props.medidor.nome,
    descricao: props.medidor.descricao,
    grandezas: props.medidor.grandezas?.map((g) => g.id) ?? [],
};
const erroInicial = { nome: [] as string[], descricao: [] as string[] };
let formValues = ref<Form>(medidorInicial);
let formErrors = ref<FormErrors>(erroInicial);
const validator = z.object({
    nome: z.string().min(3).max(255),
    descricao: z.string().min(3).max(255),
    grandezas: z.number().array().nonempty(),
});

interface FormErrors {
    [key: string]: string[] | undefined;
    [key: number]: string[] | undefined;
    [key: symbol]: string[] | undefined;
}

loading.value = false;

async function submit() {
    try {
        formErrors.value = erroInicial;
        loading.value = true;
        let validated = validator.parse(formValues.value);
        await medidorStore.edit(validated, props.medidor);
        navigateTo("/medidores");
    } catch (error: any) {
        if (error instanceof ZodError) {
            notificationStore.error("Erro de validação.");
            formErrors.value = error.flatten().fieldErrors;
        } else {
            notificationStore.error(
                error.message ?? "Houve um erro desconhecido.",
            );
        }
    } finally {
        loading.value = false;
    }
}
const value = ref([]);
</script>

<template>
    <form class="form-widget flex flex-col gap-4" @submit.prevent="submit">
        <Input
            label="Nome"
            type="text"
            v-model="formValues.nome"
            :errors="formErrors.nome"
        />
        <Input
            label="Descrição"
            type="text"
            v-model="formValues.descricao"
            :errors="formErrors.descricao"
        />

        <MultipleSelect
            label="Grandezas"
            v-model="formValues.grandezas"
            :errors="formErrors.grandezas"
            :options="options"
        />

        <button
            type="submit"
            class="btn btn-block"
            :class="{ loading: loading }"
            :disabled="loading"
        >
            Salvar
        </button>
    </form>
</template>
