<template>
    <a-button
        :type="type"
        :size="size"
        :style="style"
    >
        <template #icon>
            <img :src="icon" alt="" class="me-1">
        </template>
        {{ title }}
    </a-button>
</template>
<script setup>
import {defineProps} from "vue";

defineProps({
    size: {
        type: String,
        default: 'large'
    },
    type: {
        type: String,
        default: 'primary'
    },
    style: {
        type: [String, Object],
    },
    icon: {
        type: String
    },
    title: {
        type: String
    }
});
</script>
