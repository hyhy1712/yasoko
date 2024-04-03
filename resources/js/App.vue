<template>
    <div class="vl-parent">
        <loading :is-full-page="true"/>
    </div>
    <router-view></router-view>
</template>

<script setup>
import Loading from 'vue-loading-overlay';

</script>
