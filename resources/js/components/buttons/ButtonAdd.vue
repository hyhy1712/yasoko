<template>
    <base-button
        :icon="Icon"
        :title="$t('common.buttons.add')"
        style="background: var(--button-add-color); border-color: var(--button-add-color)"
    />
</template>

<script setup>

import BaseButton from "@/components/buttons/BaseButton.vue";
import Icon from '@assets/images/icon/create.svg';

</script>
