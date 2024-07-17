<template>
    <base-button
        :icon="Icon"
        :title="$t('common.buttons.download')"
        style="background: var(--button-download-color);border-color: var(--button-download-color)"
    />
</template>

<script setup>

import BaseButton from "@/components/buttons/BaseButton.vue";
import Icon from '@assets/images/icon/download.svg';

</script>
