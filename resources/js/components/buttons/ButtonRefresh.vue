<template>
    <a-button type="primary" :size="size"
              style="background: var(--button-add-color); border-color: var(--button-add-color)">
        <template #icon>
            <img src="@assets/images/icon/rotate-right.svg" alt="" class="me-1">
        </template>
        {{ $t('common.buttons.refresh') }}
    </a-button>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue";

export default {
    extends: BaseButton
}
</script>
