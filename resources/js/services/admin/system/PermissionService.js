import {axiosGet, axiosPost} from "@/helpers/AxiosHelper.js";
import ApiPathConstant from "@/constants/ApiPathConstant.js";

export default class PermissionService {
    async getList() {
        return await axiosGet(ApiPathConstant.ADMIN_PERMISSION_LIST).then(({data}) => {
            return data ?? {};
        })
    }

}
