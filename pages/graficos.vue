<script setup lang="ts">
import dayjs from "dayjs";
import apexchart from "vue3-apexcharts";
import Input from "~/components/Form/Input.vue";
import {
    BuscarMedidas,
    ConsultaMedidas,
    Intervalo,
    intervalos,
    milisegundosNoIntervalo,
} from "~/services/MedidasService";
import { useMedidor } from "~/stores/MedidorStore";
import { useNotification } from "~/stores/NotificationStore";
import { useTheme } from "~/stores/ThemeStore";

const medidorStore = useMedidor();
medidorStore.refreshAll();
const notificacao = useNotification();
const themeStore = useTheme();

const loading = ref(false);
const expandirGrandezas = ref(false);

const chartOptions = ref(useApexChartOptions());

themeStore.$subscribe(temaGrafico);

function temaGrafico() {
    chartOptions.value = useApexChartOptions();
}

const consultas = ref<{
    dados: ConsultaMedidas[];
}>({ dados: [] });

const formData = ref<{
    medidas: {
        medidor: number;
        grandeza: number;
    }[];
    intervalo: Intervalo;
    inicio: string;
    fim: string;
}>({
    medidas: [],
    intervalo: "1 hour",
    inicio: dayjs().format("YYYY-MM-DD"),
    fim: dayjs().format("YYYY-MM-DD"),
});

const intervaloOptions = intervalos;

function submit() {
    const inicio = dayjs(formData.value.inicio);
    const fim = dayjs(formData.value.fim);
    const diff = fim.diff(inicio);
    if (diff < 0) {
        notificacao.error("Início maior que fim!");
        return;
    }

    if (formData.value.medidas.length == 0) {
        notificacao.error("Escolha pelo menos uma grandeza!");
        return;
    }

    const limiteDeDados = 5000;
    const quantidadeDeConsultas = formData.value.medidas.length;
    const dadosNoGrafico =
        quantidadeDeConsultas *
        (diff / milisegundosNoIntervalo(formData.value.intervalo));
    if (dadosNoGrafico > limiteDeDados) {
        notificacao.error(
            "Muito dado, vai travar o gráfico! Diminua o período, número de grandezas ou aumente a integralização",
        );
        return;
    }

    loading.value = true;
    expandirGrandezas.value = false;
    consultas.value.dados = [];
    formData.value.medidas.forEach((m) => {
        BuscarMedidas({
            medidor: m.medidor,
            grandeza: m.grandeza,
            intervalo: formData.value.intervalo,
            inicio: formData.value.inicio,
            fim: dayjs(formData.value.fim).add(1, "day").format("YYYY-MM-DD"),
        })
            .then((consulta) => {
                consultas.value.dados.push(consulta);
            })
            .finally(() => {
                loading.value = false;
            });
    });
}

function toggleGrandeza(medidor: number, grandeza: number) {
    if (grandezaEstaSelecionada(medidor, grandeza))
        formData.value.medidas = formData.value.medidas.filter(
            (m) => !(m.medidor == medidor && m.grandeza == grandeza),
        );
    else formData.value.medidas.push({ medidor, grandeza });
}

function grandezaEstaSelecionada(medidor: number, grandeza: number): boolean {
    return (
        formData.value.medidas.filter(
            (m) => m.medidor == medidor && m.grandeza == grandeza,
        ).length >= 1
    );
}
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="card bg-base-100">
            <div class="card-body">
                <div class="card-title">Filtro</div>
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
                            >
                                <option
                                    v-for="option in intervaloOptions"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="form-control md:col-span-3">
                            <div class="collapse collapse-arrow bg-base-200">
                                <input
                                    type="checkbox"
                                    class="peer"
                                    v-model="expandirGrandezas"
                                />
                                <div
                                    class="flex justify-between collapse-title bg-base-200 [input:checked~&]:bg-base-100"
                                >
                                    <span class=""
                                        >Selecione as Grandezas ({{
                                            formData.medidas.length
                                        }}
                                        selecionada(s)):</span
                                    >
                                </div>
                                <div class="collapse-content bg-base-100">
                                    <div class="grid md:grid-cols-6 gap-2">
                                        <template
                                            v-for="medidor in medidorStore.medidores"
                                            :key="medidor.id"
                                        >
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
                                                        medidor.id!,
                                                        grandeza.id,
                                                    ),
                                                'btn-outline':
                                                    !grandezaEstaSelecionada(
                                                        medidor.id!,
                                                        grandeza.id,
                                                    ),
                                            }"
                                                    @click="
                                                        toggleGrandeza(
                                                            medidor.id!,
                                                            grandeza.id,
                                                        )
                                                    "
                                                >
                                                    {{
                                                        `${medidor.nome} ${grandeza.nome}`
                                                    }}
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-3">
                            <button
                                type="submit"
                                class="btn btn-neutral btn-block"
                                :disabled="
                                    formData.medidas.length == 0 || loading
                                "
                            >
                                <span
                                    :class="{
                                        loading: loading,
                                        'loading-dots': loading,
                                    }"
                                ></span>
                                Gerar Gráfico
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card bg-base-100">
            <div class="card-body">
                <apexchart
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
            </div>
        </div>
    </div>
</template>
