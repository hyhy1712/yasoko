<template>

    <div class="d-flex justify-content-center mt-sm-5">
        <div class="row">
            <div class="col-12 col-sm-6 mx-auto">
                <div class="text-center wrapper p-5">
                    <div v-if="!isEmptyObject(appointment)">
                        <div class="mb-4">
                            <h1 class="mt-3">Đặt lịch khám thành công</h1>
                        </div>
                        <h4>Thông tin liên hệ của phòng khám</h4>
                        <h4>SDT: xxxxx</h4>
                        <h4>Địa chỉ: xxxxx</h4>
                        <div class="mt-4 text-start">
                            <p><strong>Họ và tên:</strong> <span>{{ appointment.name }}</span></p>
                            <p><strong>Giới tính:</strong> <span>{{ appointment.gender }}</span></p>
                            <p><strong>Ngày sinh:</strong> <span>{{ appointment.date_of_birth }}</span></p>
                            <p><strong>Số điện thoại:</strong> <span>{{ appointment.phone }}</span></p>
                            <p><strong>Vấn đề gặp phải:</strong> <span>{{ appointment.description }}</span></p>
                            <p class="text-danger"><strong>Ngày khám:</strong> <span>{{ appointment.date }}</span></p>
                            <p class="text-danger"><strong>Giờ khám:</strong> <span>{{
                                    convertStringTime(appointment.time)
                                }}</span></p>
                        </div>
                    </div>
                    <a-button type="primary" size="large" class="mt-2"
                              @click="router.push({name: routeNameConstant.CUSTOMER_BOOK_APPOINTMENT})">Đặt lịch khám mới
                    </a-button>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.wrapper {
    font-size: 20px;
}
</style>
<script setup>
import {appointmentStore} from "@/stores/customer/Appointment.js";
import {isEmptyObject, convertStringTime} from "@/helpers/CommonHelper.js";
import router from "@/router/index.js";
import routeNameConstant from "@/constants/RouteNameConstant.js";

const appointment = appointmentStore().getAppointment;
</script>
