<template>
    <a-button type="primary" :size="size" style="background: var(--button-download-color);border-color: var(--button-download-color)">
        <template #icon>
            <img src="@assets/images/icon/download.svg" alt="" class="me-1">
        </template>
        {{ $t('common.buttons.download') }}
    </a-button>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue";

export default {
    extends: BaseButton
}
</script>
