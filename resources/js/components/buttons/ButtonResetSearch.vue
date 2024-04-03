<template>
    <a-button type="primary" :size="size" danger ghost>
        {{ $t('common.buttons.reset_search') }}
    </a-button>
</template>

<script>
import BaseButton from "@/components/buttons/BaseButton.vue";

export default {
    extends: BaseButton
}
</script>
