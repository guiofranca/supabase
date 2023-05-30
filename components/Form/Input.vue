<script setup lang="ts">
const props = defineProps<{
    label?: string
    modelValue: any
    errors: string[] | undefined
}>();

let hasError = () => (props.errors != undefined) && props.errors.length > 0;

</script>
<template>
    <div class="form-control">
        <label v-if="label" class="label">
            <span class="label-text"> {{ label }}</span>
        </label>
        <input class="input input-bordered" v-bind:class="{ 'border-error': hasError() }" :value="modelValue"
            v-bind="$attrs" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
        <span class="text-error" v-for="error in errors"> {{ error }} </span>
    </div>
</template>