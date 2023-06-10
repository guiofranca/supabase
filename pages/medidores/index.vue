<script setup lang="ts">
import MedidorIndexCard from "~/components/Medidores/MedidorIndexCard.vue";
import { useMedidor } from "~/stores/MedidorStore";

const loading = ref(false);
const medidorStore = useMedidor();

const refresh = async (force = false) => {
    loading.value = true;
    await medidorStore.refreshAll(force).finally(() => (loading.value = false));
};

refresh();
</script>

<template>
    <div class="card bg-base-100 shadow">
        <div class="card-body">
            <div class="card-title">
                <h2>Medidores</h2>
                <div v-if="loading">
                    <button type="button" disabled class="btn btn-sm loading">
                        Carregando
                    </button>
                </div>
                <div v-else class="flex gap-2">
                    <button type="button" @click="refresh(true)" title="Atualizar">
                        <IconRefresh />
                    </button>
                    <NuxtLink to="medidores/criar" title="Criar medidor"
                        ><IconSquarePlus
                    /></NuxtLink>
                </div>
            </div>
            <div
                class="flex flex-col gap-4"
                :class="{ 'animate-pulse': loading }"
            >
                <MedidorIndexCard
                    v-for="medidor in medidorStore.medidores"
                    :key="medidor.id"
                    :medidor="medidor"
                />
            </div>
        </div>
    </div>
</template>
