<script setup lang="ts">
import { Grandeza, Medidor, useMedidor } from "~/stores/MedidorStore";
const props = defineProps<{
    medidor: Medidor;
}>();

async function remover() {
    if (!confirm("Tem certeza?")) return;
    const medidorStore = useMedidor();
    await medidorStore.remove(props.medidor);
}
</script>
<template>
    <div class="card bg-base-200 shadow">
        <div class="card-body">
            <div class="card-title flex justify-between">
                <h2>{{ medidor.nome }}</h2>
                <div>
                    <div class="flex gap-2">
                        <NuxtLink
                            class="btn btn-primary btn-square btn-sm"
                            title="Editar"
                            :to="`/medidores/${medidor.id}/editar`"
                        >
                            <IconPencilSquare />
                        </NuxtLink>
                        <button
                            class="btn btn-error btn-square btn-sm"
                            title="Excluir"
                            @click="remover"
                            disabled
                        >
                            <IconCross />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {{ medidor.descricao }}
            </div>
            <div class="flex flex-wrap gap-2 items-center">
                <span>Grandezas:</span>
                <div
                    class="badge badge-neutral"
                    v-for="grandeza in medidor.grandezas"
                    :key="grandeza.id"
                >
                    {{ grandeza.nome }}
                </div>
            </div>
        </div>
    </div>
</template>
