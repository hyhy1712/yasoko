<template>
    <div class="page-title">
        <h2><b>{{ pageTitle }}</b></h2>
    </div>

    <div class="page-content mt-3">
        <div class="page-content mt-3">
            <a-card class="p-2">
                <app-form
                    :fields="fields"
                    :errors="errors"
                    :source-data="role"
                    classWrapperFormItem="col-12 col-sm-4"
                    :submit="submit"
                    :cancel="cancel"
                >
                    <template v-slot:more-field>
                        <a-card class="mt-2 p-2">
                            <div class="permission_header fw-bold">
                                <div class="row">
                                    <div class="col-12">
                                        {{ $t('role.columns.permission') }}
                                    </div>
                                </div>
                            </div>
                            <div class="permission_content mt-3">
                                <div class="row">
                                    <div class="col-12">
                                        <a-tree
                                            :tree-data="treeData"
                                            v-model:checkedKeys="checkedKeys"
                                            v-model:expandedKeys="expandedKeys"
                                            checkable
                                        >
                                            <template #title="{ title, key }">
                                                <span>{{ title }}</span>
                                            </template>
                                        </a-tree>
                                    </div>
                                </div>
                            </div>
                        </a-card>
                    </template>
                </app-form>
            </a-card>
        </div>
    </div>
</template>

<script setup>
import {ref, defineProps} from "vue";
import RoleService from "@/services/admin/system/RoleService.js";
import PermissionService from "@/services/admin/system/PermissionService.js";
import router from "@/router/index.js";
import RouteNameConstant from "@/constants/RouteNameConstant.js";
import {isSuccessRequest} from "@/helpers/AxiosHelper.js";
import {messageSuccess, messageError} from "@/helpers/MessageHelper.js";
import {translate} from "@/helpers/CommonHelper.js";
import {cloneObject} from "@/helpers/CommonHelper.js";
import AppForm from "@/components/views/AppForm.vue";

const props = defineProps({
    pageTitle: {
        type: String,
        default: translate('role.title_create')
    },
    role: {
        type: Object,
        default: {}
    },
    errors: {
        type: Object,
        default: {}
    },
    updateRole: {
        type: Function,
        default: null
    }
});

const checkedKeys = ref(cloneObject(props.role.permissions ?? [], 'array'));
const expandedKeys = ref([]);
const treeData = ref([]);
const errors = ref(cloneObject(props.errors));
const fields = [
    {
        type: 'text',
        key: 'name',
        name: translate('role.columns.name'),
        required: true
    },
    {
        type: 'text',
        key: 'display_name',
        name: translate('role.columns.display_name'),
        required: true
    },
    {
        type: 'text-area',
        key: 'description',
        name: translate('role.columns.description'),
        required: false
    }
];
const roleService = new RoleService();

const buildTreeData = async () => {
    const permissions = await new PermissionService().getList();
    const moduleGroupPermission = await roleService.getListModuleGroupPermission();

    let permissionTree = [];
    for (const [key, value] of Object.entries(moduleGroupPermission)) {
        expandedKeys.value.push(key);
        let module = {
            title: key,
            key: key,
            children: []
        };

        value.forEach(function (value) {
            expandedKeys.value.push(value);
            module.children.push({
                title: value,
                key: value,
                children: permissions[value]
            });
        });
        permissionTree.push(module);
    }
    treeData.value = permissionTree;

};
buildTreeData();

const getOnlyPermissionId = () => {
    return checkedKeys.value.filter(function (item) {
        return typeof item === 'number';
    });
}

const submit = (formData) => {
    formData.permissions = getOnlyPermissionId();

    if (props.updateRole) {
        props.updateRole(formData);
        return;
    }

    roleService.create(formData).then((data) => {
        if (isSuccessRequest(data)) {
            messageSuccess(translate('role.messages.create_success'));
            router.push({name: RouteNameConstant.ADMIN_ROLE_VIEW});
            return;
        }
        messageError(translate('role.messages.create_fail'));
        errors.value = data.data ?? {};
    })
}

const cancel = () => {
    router.push({name: RouteNameConstant.ADMIN_ROLE_VIEW});
}
</script>
