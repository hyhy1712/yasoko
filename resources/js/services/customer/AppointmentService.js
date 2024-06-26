import {axiosGet, axiosPatch, axiosPost} from "@/helpers/AxiosHelper.js";
import ApiPathConstant from "@/constants/ApiPathConstant.js";

export default class AppointmentService {
    async getTime(params = {}) {
        return await axiosGet(ApiPathConstant.APPOINTMENT_GET_TIME, params).then(({data}) => {
            return data;
        })
    }

    async create(params) {
        return await axiosPost(ApiPathConstant.APPOINTMENT_CREATE, params).then((data) => {
            return data;
        })
    }

}
