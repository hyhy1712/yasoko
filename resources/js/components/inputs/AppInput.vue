<template>
    <template v-if="type ==='text'">
        <a-input :value="modelValue" :size="size" :disabled="disabled" @input="handleChangeInput"/>
    </template>
    <template v-if="type ==='password'">
        <a-input-password :value="modelValue" :size="size" :disabled="disabled" @input="handleChangeInput"/>
    </template>
    <template v-if="type ==='number'">
        <a-input :value="modelValue" :size="size" :disabled="disabled" type="number" @input="handleChangeInput"/>
    </template>
    <template v-if="type === 'text-area'">
        <a-textarea :rows="textAreaRow" :value="modelValue" :size="size" :disabled="disabled" @input="handleChangeInput"
                    allow-clear/>
    </template>
    <template v-if="type ==='datetime-local'">
        <a-input :value="modelValue" type="datetime-local" :size="size" :disabled="disabled"
                 @input="handleChangeInput"/>
    </template>
    <template v-if="type ==='date'">
        <a-input :value="modelValue" type="date" :size="size" :disabled="disabled" @input="handleChangeInput"/>
    </template>
    <template v-if="type ==='range-picker'">
        <a-range-picker :value="modelValue" :size="size" :disabled="disabled" @change="handleChangeRangePicker"/>
    </template>
    <template v-if="type ==='phone'">
        <a-input :value="modelValue" type="phone" :size="size" :disabled="disabled" @input="handleChangeInput"/>
    </template>
    <template v-if="type ==='select'">
        <a-select :value="modelValue" :size="size" :disabled="disabled" :options="options" @change="handleChangeSelect"
                  style="width: 100%"/>
    </template>
    <template v-if="type ==='multi-select'">
        <a-select :value="modelValue ?? []" :size="size" :disabled="disabled" :max-tag-count="maxTagCount"
                  :options="options"
                  @change="handleChangeSelect" mode="multiple" style="width: 100%"/>
    </template>
    <template v-if="type === 'entity-select'">
        <component :is="entitySelectMapComponent[entity]" :value="modelValue" :multiple="multiple" :size="size"
                   :max-tag-count="maxTagCount"
                   @update:value="handleChangeSelect"></component>
    </template>
</template>

<script setup>

import {defineProps, defineEmits} from "vue";
import EntitySelectConstant from "@/constants/EntitySelectConstant.js";
import SelectRole from "@/components/inputs/selects/SelectRole.vue";

defineProps({
    size: {
        type: String,
        default: 'large'
    },
    type: {
        type: String,
        required: true
    },
    textAreaRow: {
        type: Number,
        default: 5
    },
    modelValue: {
        type: [String, Number, Array, Object],
        default: null
    },
    options: {
        type: Array,
        default: null
    },
    maxTagCount: {
        type: Number,
        default: 1
    },
    multiple: {
        default: false
    },
    disabled: {
        default: false
    },
    entity: {
        type: String,
        required: false
    }
});

const entitySelectMapComponent = {
    [EntitySelectConstant.ROLE]: SelectRole
};

const emit = defineEmits(['update:modelValue']);
const handleChangeRangePicker = (value) => {
    emit('update:modelValue', value);
};
const handleChangeSelect = (value) => {
    emit('update:modelValue', value);
};
const handleChangeInput = (event) => {
    emit('update:modelValue', event.target.value);
}
</script>
