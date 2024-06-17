<template>
    <create-user-component
        :page-title="$t('user.title_edit')"
        :user="user"
        :errors="errors"
        :update-user="submit"
        :disabled-field="disabledField"
        v-if="isLoadingComplete()"
    ></create-user-component>
</template>

<script setup>
import {ref} from "vue";
import CreateUserComponent from '@/views/admin/system/users/Create.vue';
import {translate} from "@/helpers/CommonHelper.js";
import {getCurrentRouteParams} from "@/helpers/RouteHelper.js";
import {throwNotFoundModelException} from "@/helpers/ExceptionHelper.js";
import {isEmptyObject} from "@/helpers/CommonHelper.js";
import {isSuccessRequest} from "@/helpers/AxiosHelper.js";
import {messageError, messageSuccess} from "@/helpers/MessageHelper.js";
import router from "@/router/index.js";
import {useLoading} from "@/composables/loading.js";
import UserService from "@/services/admin/system/UserService.js";

const {isLoadingComplete, setLoading, setLoadingComplete} = useLoading();
const userId = getCurrentRouteParams('id');
const user = ref({});
const errors = ref({});
const disabledField = ['username'];

const userService = new UserService();
const getDetailUser = () => {
    setLoading();
    userService.detail(userId).then((data) => {
        if (isEmptyObject(data)) {
            throwNotFoundModelException();
        }
        data.call_center = data.call_center.toString();
        data.role = data.roles.map(item => item.id);
        data.department = data.groups[0].id ?? null;
        user.value = data;
        setLoadingComplete();
    })
}
getDetailUser();

const submit = (formData) => {
    setLoading();
    userService.update(userId, formData).then((data) => {
        if (isSuccessRequest(data)) {
            messageSuccess(translate('user.messages.update_success'));
            router.back();
            return;
        }
        messageError(translate('user.messages.update_fail'));
        errors.value = data.data ?? {};
        setLoadingComplete();
    })
}
</script>
