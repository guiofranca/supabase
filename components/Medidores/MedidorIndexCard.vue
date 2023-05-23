<script setup lang="ts">
import { Medidor, useMedidor } from '~/stores/MedidorStore';
const props = defineProps<{
    medidor: Medidor
}>();


async function remover() {
    if(!confirm('Tem certeza?')) return;
    const medidorStore = useMedidor();
    await medidorStore.remove(props.medidor);
}

</script>
<template>
    <div class="card bg-base-200 shadow" >
        <div class="card-body">
            <div class="card-title flex justify-between">
                <h2>{{ medidor.nome }}</h2>
                <div>
                    <div class="flex gap-2">
                        <NuxtLink class="btn btn-primary btn-square btn-sm" title="Visualizar" :to="`/medidores/${medidor.id}`">
                            <IconEye />
                        </NuxtLink>
                        <NuxtLink class="btn btn-primary btn-square btn-sm" title="Editar" :to="`/medidores/${medidor.id}/editar`">
                            <IconPencilSquare />
                        </NuxtLink>
                        <button class="btn btn-error btn-square btn-sm" title="Excluir" @click="remover">
                            <IconCross />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {{ medidor.descricao }}
            </div>
        </div>
    </div>
</template>
