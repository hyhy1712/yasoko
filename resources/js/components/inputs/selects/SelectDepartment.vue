<template>
    <base-select :fetch-options="fetchOptions"></base-select>
</template>

<script setup>

import BaseSelect from "@/components/inputs/selects/BaseSelect.vue";
import GroupService from "@/services/GroupService.js";

function fetchOptions() {
    return new GroupService().getAll();
}

</script>
