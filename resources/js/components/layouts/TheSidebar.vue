<template>
    <div id="sidebar">
        <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            style="width: 100%"
            mode="vertical"
            @click="handleClick"
        >
            <menuRecursive :tree="menu"></menuRecursive>
        </a-menu>
    </div>
</template>

<script setup>
import router from "@/router/index.js";
import {translate} from "@/helpers/CommonHelper.js";
import {authStore} from "@/stores/admin/AuthStore.js";
import {menuStore} from "@/stores/admin/MenuStore.js";
import MenuRecursive from "@/components/layouts/MenuRecursive.vue";
import {storeToRefs} from "pinia";
import permissionConstant from "@/constants/PermissionConstant.js";
import routeNameConstant from "@/constants/RouteNameConstant.js";
import SidebarKeyConstant from "@/constants/SidebarKeyConstant.js";
import {useRoute} from "vue-router";

const route = useRoute();
const currentUser = authStore();

const menu = [
    {
        name: translate('sidebar.dashboard'),
        isVisible: true,
        route: routeNameConstant.ADMIN_DASHBOARD,
        sidebarKey: SidebarKeyConstant.DASHBOARD,
        icon: 'dashboard'
    },
    // {
    //     name: translate('sidebar.category'),
    //     isVisible: currentUser.hasPermissions(permissionConstant.CATEGORY_VIEW),
    //     route: routeNameConstant.ADMIN_CATEGORY_VIEW,
    //     sidebarKey: SidebarKeyConstant.CATEGORY,
    //     icon: 'dashboard'
    // },
    {
        name: translate('sidebar.appointment'),
        isVisible: currentUser.hasPermissions(permissionConstant.APPOINTMENT_VIEW),
        route: routeNameConstant.ADMIN_APPOINTMENT_VIEW,
        sidebarKey: SidebarKeyConstant.APPOINTMENT,
        icon: 'dashboard'
    },
    // {
    //     name: translate('sidebar.admin'),
    //     children: [
    //         {
    //             name: translate('sidebar.role'),
    //             isVisible: currentUser.hasPermissions(permissionConstant.ROLE_VIEW),
    //             route: routeNameConstant.ROLE_VIEW,
    //             sidebarKey: SidebarKeyConstant.ROLE,
    //         },
    //         {
    //             name: translate('sidebar.user'),
    //             isVisible: currentUser.hasPermissions(permissionConstant.USER_VIEW),
    //             route: routeNameConstant.USER_VIEW,
    //             sidebarKey: SidebarKeyConstant.USER,
    //         }
    //     ],
    //     isVisible: currentUser.hasAnyPermission([
    //         permissionConstant.ROLE_VIEW
    //     ]),
    //     icon: 'system'
    // }
];

const handleClick = menuInfo => {
    let routeName = menuInfo.item.to;
    if (route.name === routeName){
        router.go(0);
    }
    router.push({name: routeName});
};
const {selectedKeys, openKeys} = storeToRefs(menuStore())

</script>

<style lang="scss" scoped>

#sidebar {
    :deep(ul.ant-menu) {
        background: var(--sidebar-color);
        border-right: revert;
    }

    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu-title),
    :deep(.ant-menu-submenu-arrow) {
        color: #fff;
        font-weight: bold;
    }

    :deep(.ant-menu-item-active),
    :deep(.ant-menu-submenu-active) {
        background: var(--hover-button);
    }

    :deep(.ant-menu-submenu-selected) {
        background-color: var(--hover-button);
    }


    :deep(.ant-menu-item-selected),
    :deep(.ant-menu-submenu-selected > .ant-menu-submenu-title),
    :deep(.ant-menu-submenu-selected .ant-menu-submenu-arrow) {
        background: var(--hover-button);
    }

    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu),
    :deep(.ant-menu-submenu-title) {
        font-size: 16px;
        height: 58px;
        line-height: 58px;
    }

    :deep(.ant-menu.ant-menu-inline-collapsed > .ant-menu-item) {
        padding: 0 calc(50% - 20px / 2);
    }

    :deep(.ant-menu-vertical .ant-menu-submenu-title) {
        margin-bottom: 0px;
    }

}

</style>
