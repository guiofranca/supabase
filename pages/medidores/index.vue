<script setup lang="ts">
import MedidorIndexCard from '~/components/Medidores/MedidorIndexCard.vue';
import { useMedidor } from '~/stores/MedidorStore';

const medidorStore = useMedidor();

const refresh = async () => await medidorStore.refreshAll();
</script>

<template>
    <div class="card bg-base-100 shadow">
        <div class="card-body">
            <div class="card-title">
                <h2>
                    Medidores
                </h2>
                <button type="button" @click="refresh" title="Atualizar"><IconRefresh /></button>
                <NuxtLink to="medidores/criar" title="Criar medidor"><IconSquarePlus /></NuxtLink>
            </div>
            <div class="flex flex-col gap-4">
                <MedidorIndexCard v-for="medidor in medidorStore.medidores" :key="medidor.id" :medidor="medidor" />
            </div>
        </div>
    </div>
</template>