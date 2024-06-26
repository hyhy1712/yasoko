<template>
    <app-page
        :page-title="$t('user.title')"
        :advanced-search-input="advancedSearchInput"
        :columns="columns"
        :fetch-data="fetchData"
        :action-add="hasPermissionCreate ? actionAdd : null"
        :action-edit="hasPermissionEdit ? actionEdit : null"
    >
    </app-page>
</template>

<script lang="jsx" setup>

import AppPage from "@/components/views/AppPage.vue";
import {translate} from "@/helpers/CommonHelper.js";
import {hasPermissions} from "@/helpers/AuthHelper.js";
import PermissionConstant from "@/constants/PermissionConstant.js";
import RouteNameConstant from "@/constants/RouteNameConstant.js";
import router from "@/router/index.js";
import UserService from "@/services/admin/system/UserService.js";
import EntitySelectConstant from "@/constants/EntitySelectConstant.js";
import CommonConstant from "@/constants/CommonConstant.js";

const userService = new UserService();

const advancedSearchInput = [
    {
        type: 'text',
        key: 'name',
        name: translate('user.columns.name')
    },
    {
        type: 'text',
        key: 'username',
        name: translate('user.columns.username')
    },
    {
        type: 'number',
        key: 'gtc_extension',
        name: translate('user.columns.gtc_extension')
    },
    {
        type: 'multi-select',
        key: 'call_center',
        name: translate('user.columns.call_center'),
        options: CommonConstant.convertToDataSelect(CommonConstant.CALL_CENTER)
    },
    {
        type: 'entity-select',
        multiple: true,
        entity: EntitySelectConstant.DEPARTMENT,
        key: 'department',
        name: translate('user.columns.department'),
    },
    {
        type: 'text',
        key: 'email',
        name: translate('user.columns.email')
    },
    {
        type: 'entity-select',
        multiple: true,
        entity: EntitySelectConstant.ROLE,
        key: 'role',
        name: translate('user.columns.role'),
    },
    {
        type: 'select',
        key: 'status',
        name: translate('user.columns.status'),
        options: CommonConstant.convertToDataSelect(CommonConstant.USER_STATUS)
    }
];
const columns = [
    {
        title: translate('user.columns.name'),
        width: 5,
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: translate('user.columns.email'),
        width: 5,
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: translate('user.columns.created_at'),
        width: 5,
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: translate('user.columns.updated_at'),
        width: 5,
        dataIndex: 'updated_at',
        key: 'updated_at',
    }
];

const hasPermissionCreate = hasPermissions(PermissionConstant.USER_CREATE);
const hasPermissionEdit = hasPermissions(PermissionConstant.USER_EDIT);

const fetchData = (params) => {
    return userService.getList(params);
}

//Action
const actionAdd = () => {
    router.push({name: RouteNameConstant.ADMIN_USER_CREATE});
}
const actionEdit = ({id}) => {
    router.push({name: RouteNameConstant.ADMIN_USER_EDIT, params: {id: id}});
}

</script>
