<template>
    <a-button type="primary" :size="size"
              style="background-color: var(--button-search-color);border-color: var(--button-search-color)">
        {{ $t('common.buttons.search') }}
    </a-button>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue";

export default {
    extends: BaseButton
}
</script>
