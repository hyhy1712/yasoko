<template>
    <base-button
        :icon="Icon"
        :title="$t('common.buttons.upload')"
        style="background: var(--button-upload-color);border-color: var(--button-upload-color)"
    />
</template>

<script setup>

import BaseButton from "@/components/buttons/BaseButton.vue";
import Icon from '@assets/images/icon/upload.svg';

</script>
