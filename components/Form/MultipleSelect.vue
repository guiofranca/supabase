<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

interface Option {
    id: number;
    value: string;
}

const props = defineProps<{
    label?: string;
    modelValue: any;
    errors: string[] | undefined;
    options: Option[];
}>();

const search = ref("");
let filteredOptions = props.options;

watch(search, (search) => {
    filteredOptions = props.options.filter((option) =>
        search == ""
            ? true
            : option.value
                  .toLocaleLowerCase()
                  .search(search.toLocaleLowerCase()) >= 0,
    );
});

let value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const hasError = () => props.errors != undefined && props.errors.length > 0;
const isSelected = (id: number) => (props.modelValue as number[]).includes(id);
const toggleSelection = (id: number) => {
    if (isSelected(id))
        value.value = (props.modelValue as number[]).filter((m) => m != id);
    else (props.modelValue as number[]).push(id);
};
</script>
<template>
    <div class="form-control">
        <div class="flex items-center gap-2">
            <label v-if="label" class="label">
                <span class="label-text"> {{ label }} </span>
            </label>
            <div class="flex gap-1 flex-wrap">
                <div
                    class="badge hover:badge-error hover:cursor-pointer"
                    title="Remover"
                    v-for="option in options.filter((o) => isSelected(o.id))"
                    :key="option.id"
                    @click="toggleSelection(option.id)"
                >
                    {{ option.value }}
                </div>
            </div>
        </div>
        <div class="dropdown">
            <label
                tabindex="0"
                class="btn btn-block btn-outline"
                v-bind:class="{
                    'border-error': hasError(),
                    'text-error': hasError(),
                }"
                >Selecionar</label
            >
            <ul
                tabindex="0"
                class="dropdown-content menu p-2 gap-2 shadow bg-base-100 rounded-box w-full"
            >
                <input
                    class="input input-bordered"
                    v-model="search"
                    v-bind="$attrs"
                    placeholder="Buscar"
                />
                <li
                    v-for="option in filteredOptions"
                    :key="option.id"
                    @click="toggleSelection(option.id)"
                >
                    <a v-bind:class="{ active: isSelected(option.id) }">
                        {{ option.value }}
                    </a>
                </li>
                <li v-if="filteredOptions.length == 0" @click="search = ''">
                    <a> Nenhum resultado. Clique para apagar a busca </a>
                </li>
            </ul>
        </div>
        <span class="text-error" v-for="error in errors"> {{ error }} </span>
    </div>
</template>
