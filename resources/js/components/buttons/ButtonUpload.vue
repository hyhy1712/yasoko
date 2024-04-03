<template>
    <a-button type="primary" :size="size"
              style="background: var(--button-upload-color);border-color: var(--button-upload-color)">
        <template #icon>
            <img src="@assets/images/icon/upload.svg" alt="" class="me-1">
        </template>
        {{ $t('common.buttons.upload') }}
    </a-button>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue";

export default {
    extends: BaseButton
}
</script>
