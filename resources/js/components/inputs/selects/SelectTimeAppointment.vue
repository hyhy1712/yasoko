<template>
    <base-select :fetch-options="fetchOptions" :field-name="fieldName"></base-select>
</template>

<script setup>

import BaseSelect from "@/components/inputs/selects/BaseSelect.vue";
import AppointmentService from "@/services/customer/AppointmentService";

const fieldName = {label: 'value', value: 'id'};

function fetchOptions() {
    return new AppointmentService().getTime();
}

</script>
