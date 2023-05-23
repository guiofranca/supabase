<script setup lang="ts">
import MedidorEditForm from '~/components/Medidores/MedidorEditForm.vue';
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
            <div>
                <MedidorEditForm :medidor="medidor" />
            </div>
        </div>
    </div>
</template>