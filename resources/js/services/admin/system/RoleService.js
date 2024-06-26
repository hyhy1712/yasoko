import {axiosGet, axiosPatch, axiosPost} from "@/helpers/AxiosHelper.js";
import ApiPathConstant from "@/constants/ApiPathConstant.js";
import {buildApiPathWithParams} from "@/helpers/CommonHelper.js";

export default class RoleService {
    ACTIVE = 1;
    DEACTIVATE = 0;

    async getAll() {
        return await axiosGet(ApiPathConstant.ADMIN_ALL_ROLE).then(({data}) => {
            return data;
        })
    }

    async getList(params = {}) {
        return await axiosGet(ApiPathConstant.ADMIN_ROLE_LIST, params).then(({data}) => {
            return data;
        })
    }

    async getListModuleGroupPermission() {
        return await axiosGet(ApiPathConstant.ADMIN_MODULE_GROUP_PERMISSION_LIST).then(({data}) => {
            return data ?? {};
        })
    }

    async create(params) {
        return await axiosPost(ApiPathConstant.ADMIN_ROLE_CREATE, params).then((data) => {
            return data;
        })
    }

    async detail($id) {
        return await axiosGet(buildApiPathWithParams(ApiPathConstant.ADMIN_ROLE_DETAIL, {id: $id})).then(({data}) => {
            return data ?? {};
        })
    }

    async update(id, params) {
        return await axiosPatch(buildApiPathWithParams(ApiPathConstant.ADMIN_ROLE_UPDATE, {id: id}), params).then((data) => {
            return data;
        })
    }

    async active(id) {
        return await axiosPatch(buildApiPathWithParams(ApiPathConstant.ADMIN_ROLE_ACTIVE, {id: id})).then((data) => {
            return data;
        })
    }

    async deactivate(id) {
        return await axiosPatch(buildApiPathWithParams(ApiPathConstant.ADMIN_ROLE_DEACTIVATE, {id: id})).then((data) => {
            return data;
        })
    }


}
