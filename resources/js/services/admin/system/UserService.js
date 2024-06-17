import {axiosGet, axiosPatch, axiosPost} from "@/helpers/AxiosHelper.js";
import ApiPathConstant from "@/constants/ApiPathConstant.js";
import {buildApiPathWithParams} from "@/helpers/CommonHelper.js";

export default class UserService {
    async getList(params = {}) {
        return await axiosGet(ApiPathConstant.USER_LIST, params).then(({data}) => {
            return data;
        })
    }
    async getUserSale(params = {}) {
        return await axiosGet(ApiPathConstant.USER_SALE, params).then(({data}) => {
            return data;
        })
    }

    async create(params) {
        return await axiosPost(ApiPathConstant.USER_CREATE, params).then((data) => {
            return data;
        })
    }

    async detail($id) {
        return await axiosGet(buildApiPathWithParams(ApiPathConstant.USER_DETAIL, {id: $id})).then(({data}) => {
            return data ?? {};
        })
    }

    async update(id, params) {
        return await axiosPatch(buildApiPathWithParams(ApiPathConstant.USER_UPDATE, {id: id}), params).then((data) => {
            return data;
        })
    }


}
