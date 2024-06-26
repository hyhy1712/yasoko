import {axiosGet, axiosPatch, axiosPost} from "@/helpers/AxiosHelper.js";
import ApiPathConstant from "@/constants/ApiPathConstant.js";
import {buildApiPathWithParams} from "@/helpers/CommonHelper.js";

export default class CategoryService {
    async getList(params = {}) {
        return await axiosGet(ApiPathConstant.ADMIN_CATEGORY_LIST, params).then(({data}) => {
            return data;
        })
    }

    async create(params) {
        return await axiosPost(ApiPathConstant.ADMIN_CATEGORY_CREATE, params).then((data) => {
            return data;
        })
    }

    async detail($id) {
        return await axiosGet(buildApiPathWithParams(ApiPathConstant.ADMIN_CATEGORY_DETAIL, {id: $id})).then(({data}) => {
            return data ?? {};
        })
    }

    async update(id, params) {
        return await axiosPatch(buildApiPathWithParams(ApiPathConstant.ADMIN_CATEGORY_UPDATE, {id: id}), params).then((data) => {
            return data;
        })
    }


}
