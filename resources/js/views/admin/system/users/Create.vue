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
                    :source-data="user"
                    :submit="submit"
                    :cancel="cancel"
                    classWrapperFormItem="col-12 col-sm-8 d-flex flex-wrap"
                    classFormItem="col-12 col-sm-5 me-5"
                >
                </app-form>
            </a-card>
        </div>
    </div>
</template>

<script setup>
import {ref, defineProps} from "vue";
import router from "@/router/index.js";
import RouteNameConstant from "@/constants/RouteNameConstant.js";
import {isSuccessRequest} from "@/helpers/AxiosHelper.js";
import {messageSuccess, messageError} from "@/helpers/MessageHelper.js";
import {translate} from "@/helpers/CommonHelper.js";
import {cloneObject} from "@/helpers/CommonHelper.js";
import AppForm from "@/components/views/AppForm.vue";
import UserService from "@/services/admin/system/UserService.js";
import CommonConstant from "@/constants/CommonConstant.js";
import EntitySelectConstant from "@/constants/EntitySelectConstant.js";

const props = defineProps({
    pageTitle: {
        type: String,
        default: translate('user.title_create')
    },
    user: {
        type: Object,
        default: {}
    },
    errors: {
        type: Object,
        default: {}
    },
    updateUser: {
        type: Function,
        default: null
    },
    disabledField: {
        type: Array,
        default: []
    }
});

const errors = ref(cloneObject(props.errors));
let fields = [
    {
        type: 'text',
        key: 'name',
        name: translate('user.columns.name'),
        required: true
    },
    {
        type: 'text',
        key: 'username',
        name: translate('user.columns.username'),
        required: true
    },
    {
        type: 'password',
        key: 'password',
        name: translate('user.columns.password'),
        required: true
    },
    {
        type: 'password',
        key: 'password_confirmation',
        name: translate('user.columns.password_confirmation'),
        required: true
    },
    {
        type: 'number',
        key: 'gtc_extension',
        name: translate('user.columns.gtc_extension')
    },
    {
        type: 'select',
        key: 'call_center',
        name: translate('user.columns.call_center'),
        options: CommonConstant.convertToDataSelect(CommonConstant.CALL_CENTER)
    },
    {
        type: 'text',
        key: 'email',
        name: translate('user.columns.email')
    },
    {
        type: 'entity-select',
        entity: EntitySelectConstant.DEPARTMENT,
        key: 'department',
        name: translate('user.columns.department'),
        required: true
    },
    {
        type: 'entity-select',
        entity: EntitySelectConstant.ROLE,
        multiple: true,
        key: 'role',
        name: translate('user.columns.role'),
    },
    {
        type: 'select',
        key: 'status',
        name: translate('user.columns.status'),
        options: CommonConstant.convertToDataSelect(CommonConstant.USER_STATUS),
        default_value: CommonConstant.USER_STATUS_ACTIVE
    },
];

const prepareFields = () => {
    fields = fields.map(field => {
        if (props.disabledField.includes(field.key)) {
            return { ...field, disabled: true };
        }
        return field;
    });
}
prepareFields();

const userService = new UserService();

const submit = (formData) => {
    if (props.updateUser) {
        props.updateUser(formData);
        return;
    }

    userService.create(formData).then((data) => {
        if (isSuccessRequest(data)) {
            messageSuccess(translate('user.messages.create_success'));
            router.push({name: RouteNameConstant.USER_VIEW});
            return;
        }
        messageError(translate('user.messages.create_fail'));
        errors.value = data.data ?? {};
    })
}

const cancel = () => {
    router.push({name: RouteNameConstant.USER_VIEW});
}
</script>
