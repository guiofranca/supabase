<script setup lang="ts">
import { z, ZodError } from "zod";
import Input from "../Form/Input.vue";
import { useNotification } from "~/stores/NotificationStore";
import { useUser } from "~/stores/UserStore";

const user = useUser();
const notificationStore = useNotification();

interface Form {
    full_name: string | undefined;
}

interface FormErrors {
    [key: string]: string[] | undefined;
    [key: number]: string[] | undefined;
    [key: symbol]: string[] | undefined;
}

const loading = ref(false);
let formValues = ref<Form>({ full_name: "" });
let formErrors = ref<FormErrors>({ full_name: [] as string[] });

const validator = z.object({
    full_name: z.string().min(3).max(255),
});

formValues.value.full_name = user.profile?.full_name ?? "";

async function submit() {
    try {
        loading.value = true;
        formErrors.value.full_name = [];
        let validated = validator.parse(formValues.value);
        await user.setFullName(validated.full_name);
    } catch (error: any) {
        if (error instanceof ZodError) {
            notificationStore.error("Erro de validação.");
            formErrors.value = error.flatten().fieldErrors;
        } else {
            notificationStore.error(error.message ?? "Erro desconhecido");
        }
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <form class="form-widget flex flex-col gap-4" @submit.prevent="submit">
        <Input
            label="Nome"
            type="text"
            v-model="formValues.full_name"
            :errors="formErrors.full_name"
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
