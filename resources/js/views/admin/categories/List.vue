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
import PermissionConstant from "@/constants/PermissionConstant.js";
import RouteNameConstant from "@/constants/RouteNameConstant.js";
import router from "@/router/index.js";
import CategoryService from "@/services/admin/CategoryService.js";
import {hasPermissions} from "@/helpers/AuthHelper.js";

const categoryService = new CategoryService();

const advancedSearchInput = [
    {
        type: 'text',
        key: 'name',
        name: translate('category.columns.name')
    },
    {
        type: 'text',
        key: 'slug',
        name: translate('category.columns.slug')
    }
];
const columns = [
    {
        title: translate('category.columns.name'),
        width: 5,
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: translate('category.columns.slug'),
        width: 5,
        dataIndex: 'slug',
        key: 'slug',
    }
];

const hasPermissionCreate = hasPermissions(PermissionConstant.CATEGORY_CREATE);
const hasPermissionEdit = hasPermissions(PermissionConstant.CATEGORY_EDIT);

const fetchData = (params) => {
    return categoryService.getList(params);
}

//Action
const actionAdd = () => {
    router.push({name: RouteNameConstant.ADMIN_CATEGORY_CREATE});
}
const actionEdit = ({id}) => {
    router.push({name: RouteNameConstant.ADMIN_CATEGORY_EDIT, params: {id: id}});
}

</script>
