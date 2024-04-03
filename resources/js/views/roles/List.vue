<template>
    <app-page
        :page-title="$t('role.title')"
        :advanced-search-input="advancedSearchInput"
        :columns="columns"
        :fetch-data="fetchData"
        :action-add="hasPermissionCreate ? actionAdd : null"
        :action-edit="hasPermissionEdit ? actionEdit : null"
        :get-action-other="hasPermissionEdit ? getActionOther : null"
        :click-action-other="hasPermissionEdit ?clickActionOther : null"
        :trigger-fetch-data="timeFetchData"
    >
    </app-page>
</template>

<script lang="jsx" setup>
import {ref} from 'vue';
import RoleService from "@/services/system/RoleService.js";
import AppPage from "@/components/views/AppPage.vue";
import {translate, hasPermissions} from "@/helpers/CommonHelper.js";
import PermissionConstant from "@/constants/PermissionConstant.js";
import RouteNameConstant from "@/constants/RouteNameConstant.js";
import router from "@/router/index.js";
import {modalConfirm} from "@/helpers/ModalHelper.js";
import {isSuccessRequest} from "@/helpers/AxiosHelper.js";
import {messageError, messageSuccess} from "@/helpers/MessageHelper.js";

const roleService = new RoleService();

const advancedSearchInput = [
    {
        type: 'text',
        key: 'name',
        name: translate('role.columns.name')
    },
    {
        type: 'text',
        key: 'display_name',
        name: translate('role.columns.display_name')
    }
];
const columns = [
    {
        title: translate('role.columns.name'),
        width: 5,
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: translate('role.columns.display_name'),
        width: 5,
        dataIndex: 'display_name',
        key: 'display_name',
    },
    {
        title: translate('role.columns.description'),
        width: 5,
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: translate('role.columns.is_active'),
        width: 5,
        dataIndex: 'is_active',
        key: 'is_active',
        customRender: ({text}) => {
            if (text === roleService.DEACTIVATE) {
                return <a-tag color="default">{translate('role.column_values.is_active.false')}</a-tag>;
            } else if (text === roleService.ACTIVE) {
                return <a-tag color="processing">{translate('role.column_values.is_active.true')}</a-tag>;
            }
        },
    },
    {
        title: translate('role.columns.created_at'),
        width: 5,
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: translate('role.columns.updated_at'),
        width: 5,
        dataIndex: 'updated_at',
        key: 'updated_at',
    }
];

const hasPermissionCreate = hasPermissions(PermissionConstant.ROLE_CREATE);
const hasPermissionEdit = hasPermissions(PermissionConstant.ROLE_EDIT);

const fetchData = (params) => {
    return roleService.getList(params);
}

//Action
const actionAdd = () => {
    router.push({name: RouteNameConstant.ROLE_CREATE});
}
const actionEdit = ({id}) => {
    router.push({name: RouteNameConstant.ROLE_EDIT, params: {id: id}});
}
const getActionOther = (record) => {
    let otherAction = [];
    if (record.is_active === roleService.DEACTIVATE) {
        otherAction.push({
            title: translate('role.other_actions.active'),
            event: otherActionEvent.ACTIVE
        });
    } else if (record.is_active === roleService.ACTIVE) {
        otherAction.push({
            title: translate('role.other_actions.deactivate'),
            event: otherActionEvent.DEACTIVATE
        });
    }
    return otherAction;
}

const otherActionEvent = {
    ACTIVE: "active",
    DEACTIVATE: "deactivate"
};
const timeFetchData = ref(Date.now());
const clickActionOther = ({id, event}) => {
    let title = '';
    let content = '';
    let onOk = null;

    if (event === otherActionEvent.DEACTIVATE) {
        title = translate('role.modal.deactivate.title');
        content = translate('role.modal.deactivate.content');
        onOk = () => {
            roleService.deactivate(id).then((result) => {
                messageAndRerenderAppTable(
                    result,
                    translate('role.messages.deactivate_success'),
                    translate('role.messages.deactivate_fail')
                )
            });
        }
    } else if (event === otherActionEvent.ACTIVE) {
        title = translate('role.modal.active.title');
        content = translate('role.modal.active.content');
        onOk = () => {
            roleService.active(id).then((result) => {
                messageAndRerenderAppTable(
                    result,
                    translate('role.messages.active_success'),
                    translate('role.messages.active_fail')
                )
            });
        }
    }
    modalConfirm(title, content, onOk);
}
const messageAndRerenderAppTable = (resultRequestHttp, success, fail) => {
    if (isSuccessRequest(resultRequestHttp)) {
        messageSuccess(success);
    } else {
        messageError(fail);
    }
    timeFetchData.value = Date.now();
}

</script>
