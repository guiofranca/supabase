<script setup lang="ts">
import MedidorChartCard from '~/components/Medidores/MedidorChartCard.vue';
import MedidorViewCard from '~/components/Medidores/MedidorViewCard.vue';
import { useMedidor } from '~/stores/MedidorStore';

const router = useRoute();
const medidorStore = useMedidor();
const id = parseInt(router.params.id as string);
const medidor = medidorStore.getById(id);

</script>
<template>
    <div class="card bg-base-100 shadow">
        <div class="card-body">
            <h2 class="card-title">Medidor</h2>
            <div class="flex flex-col gap-4">
                <MedidorViewCard :medidor="medidor" />
                <MedidorChartCard :medidor="medidor" />
            </div>
        </div>
    </div>
</template>