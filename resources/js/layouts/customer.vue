<template>
    <a-layout class="wrapper">

        <a-layout-header class="header text-white">
            <div class="row">
                <div class="col-12 col-sm-4">
                    <b>NHÀ THUỐC YASOKO</b>
                </div>
                <div class="col-12 col-sm-4 d-flex align-items-center">
                    <a-input-search placeholder="Nhập tên thuốc bạn muốn tìm kiếm" style="width: 100%"/>
                </div>
                <div class="col-12 col-sm-4 text-sm-end">
                    <b>Liên hệ: 049123123123</b>
                </div>
            </div>
        </a-layout-header>

        <a-layout-content class="body">
            <router-view></router-view>
        </a-layout-content>

        <a-layout-footer class="footer text-center text-white">
            <p>© 2024 - 2024 nhà thuốc Yasoko</p>
            <p>Địa chỉ: Oceanpark xxxx</p>
        </a-layout-footer>

    </a-layout>
</template>

<script setup>
import HeaderBackground from '@assets/images/header.png';
import {computed} from 'vue';

const headerStyle = computed(() => ({
    backgroundImage: `url(${HeaderBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
}));
</script>


<style lang="scss" scoped>
.wrapper {
    min-height: 100vh;
}

.header, .footer {
    background-color: #f8f9fa;
    padding: 1rem;
}

.header {
    font-size: 20px;
    background-color: #008000;
    height: 100%;
    width: 100%;
    padding-right: 10%;
    padding-left: 10%;
}

.footer {
    background: linear-gradient(0deg, #008000 15.10%, #008000 55.47%, #008000 100%);
}

</style>
