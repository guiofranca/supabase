<script setup lang="ts">
import {
    BuscarMedidas,
    ConsultaMedidas,
    Intervalo,
    intervalos,
milisegundosNoIntervalo,
} from "~/services/MedidasService";
import Input from "../Form/Input.vue";
import { Medidor } from "~/stores/MedidorStore";
import dayjs from "dayjs";
import apexchart from "vue3-apexcharts";
import { useTheme } from "~/stores/ThemeStore";
import { useNotification } from "~/stores/NotificationStore";

const props = defineProps<{
    medidor: Medidor;
}>();

const notificacao = useNotification();
const themeStore = useTheme();
const chartOptions = ref(useApexChartOptions());
themeStore.$subscribe(temaGrafico);
function temaGrafico() {
    chartOptions.value = useApexChartOptions();
}

const formData = ref<{
    grandezas: number[];
    intervalo: Intervalo;
    inicio: string;
    fim: string;
}>({
    grandezas: [],
    intervalo: "1 hour",
    inicio: dayjs().format("YYYY-MM-DD"),
    fim: dayjs().format("YYYY-MM-DD"),
});

const consultas = ref<{
    dados: ConsultaMedidas[];
}>({ dados: [] });

const tabAtiva = ref(1);
const loading = ref(false);

const submit = () => {
    const inicio = dayjs(formData.value.inicio);
    const fim = dayjs(formData.value.fim);
    const diff = fim.diff(inicio);
    if (diff < 0) {
        notificacao.error("Início maior que fim!");
        return;
    }

    if (formData.value.grandezas.length == 0) {
        notificacao.error("Escolha pelo menos uma grandeza!");
        return;
    }

    const limiteDeDados = 5000;
    const quantidadeDeConsultas = formData.value.grandezas.length;
    const dadosNoGrafico =
        quantidadeDeConsultas *
        (diff / milisegundosNoIntervalo(formData.value.intervalo));
    if (dadosNoGrafico > limiteDeDados) {
        notificacao.error(
            "Muito dado, vai travar o gráfico! Diminua o período, número de grandezas ou aumente a integralização",
        );
        return;
    }
    
    consultas.value.dados = [];
    loading.value = true;
    formData.value.grandezas.map(async (grandeza) => {
        BuscarMedidas({
            grandeza,
            medidor: props.medidor.id!,
            intervalo: formData.value.intervalo,
            inicio: formData.value.inicio,
            fim: dayjs(formData.value.fim).add(1, "day").format("YYYY-MM-DD"),
        })
            .then((medidas) => consultas.value.dados.push(medidas))
            .finally(() => (loading.value = false));
    });
    tabAtiva.value = 2;
};

function fodase() {
    const ultimo = consultas.value.dados[0].dados?.length! - 1;
    const ultimaData = consultas.value.dados[0].dados![ultimo].x;
    consultas.value.dados[0].dados?.push({
        x: dayjs(ultimaData).add(1, "day").format("YYYY-MM-DD"),
        y: Math.random() * 300,
    });
}

function toggleGrandeza(id: number) {
    if (grandezaEstaSelecionada(id))
        formData.value.grandezas = formData.value.grandezas.filter(
            (g) => g != id,
        );
    else formData.value.grandezas.push(id);
}

function grandezaEstaSelecionada(id: number): boolean {
    return formData.value.grandezas.filter((g) => g == id).length >= 1;
}
</script>
<template>
    <div class="flex flex-col">
        <div class="tabs drop-shadow-xl">
            <div
                type="button"
                class="tab tab-lifted cursor-default"
                @click="fodase"
            ></div>
            <button
                type="button"
                class="tab tab-lifted"
                :class="{
                    'tab-active': tabAtiva == 1,
                    '[--tab-bg:hsl(var(--b2))]': tabAtiva == 1,
                }"
                @click="tabAtiva = 1"
            >
                Configuração
            </button>
            <button
                type="button"
                class="tab tab-lifted"
                :class="{
                    'tab-active': tabAtiva == 2,
                    '[--tab-bg:hsl(var(--b2))]': tabAtiva == 2,
                }"
                :disabled="consultas.dados.length == 0"
                @click="tabAtiva = 2"
            >
                Gráfico
            </button>
            <div class="tab tab-lifted flex-grow cursor-default"></div>
        </div>
        <div
            class="card drop-shadow-xl bg-base-200 rounded-t-none border-base-300 border border-t-0"
        >
            <div class="card-body" v-if="tabAtiva == 1">
                <div class="card-title flex justify-between">
                    Parâmetros de consulta
                </div>
                <form @submit.prevent="submit">
                    <div class="grid md:grid-cols-3 grid-cols-1 gap-2">
                        <Input
                            :errors="[]"
                            label="Início"
                            type="date"
                            v-model="formData.inicio"
                            required
                        />
                        <Input
                            :errors="[]"
                            label="Fim"
                            type="date"
                            v-model="formData.fim"
                            required
                        />
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Intervalo</span>
                            </label>
                            <select
                                class="select select-bordered w-full"
                                v-model="formData.intervalo"
                                required
                            >
                                <option
                                    v-for="option in intervalos"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="form-control md:col-span-3">
                            <label class="label">Grandezas</label>
                            <div class="flex gap-2">
                                <div
                                    v-for="grandeza in medidor.grandezas"
                                    :key="grandeza.id"
                                >
                                    <div
                                        type="button"
                                        class="btn"
                                        :class="{
                                            'btn-primary':
                                                grandezaEstaSelecionada(
                                                    grandeza.id,
                                                ),
                                            'btn-outline':
                                                !grandezaEstaSelecionada(
                                                    grandeza.id,
                                                ),
                                        }"
                                        @click="toggleGrandeza(grandeza.id)"
                                    >
                                        {{ grandeza.nome }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-3">
                            <button
                                type="submit"
                                class="btn btn-neutral btn-block"
                                :disabled="formData.grandezas.length == 0"
                            >
                                Gerar Gráfico
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="card-body" v-if="tabAtiva == 2">
                <apexchart
                    v-if="consultas.dados.length > 0"
                    height="400"
                    :options="chartOptions"
                    :series="
                        consultas.dados.map((d) => {
                            return {
                                data: d.dados,
                                name: `${d.medidor} ${d.unidade}`,
                            };
                        })
                    "
                ></apexchart>
                <div
                    v-else
                    v-if="loading"
                    class="loading loading-dots loading-lg m-auto h-64"
                ></div>
            </div>
        </div>
    </div>
</template>
