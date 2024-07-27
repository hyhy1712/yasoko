<template>
    <div class="container-fluid w-100" id="wrapper-book-appointment">
        <div class="form-container">
            <div class="header text-center">
                <div class="row mt-3">
                    <div class="col-12">
                        <h1 class="font-weight-bold">ĐĂNG KÝ LỊCH KHÁM</h1>
                    </div>
                </div>

            </div>
            <a-form layout="vertical"
                    :model="formData"
                    @finish="submit"
            >

                <div class="body p-3">

                    <div class="row">
                        <div class="col-sm-6 col-12">
                            <div class="col-first">
                                <a-form-item
                                    label="Họ tên"
                                    name="name"
                                    :rules="[{ required: true, message: 'Vui lòng nhập họ tên' }]"
                                >
                                    <a-input v-model:value="formData.name" size="large" placeholder="Nhập họ tên"/>
                                </a-form-item>

                                <a-form-item
                                    label="Giới tính"
                                    name="gender"
                                    :rules="[{ required: true, message: 'Vui lòng chọn giới tính' }]"
                                >
                                    <a-radio-group v-model:value="formData.gender" size="large">
                                        <a-radio value="male">Nam</a-radio>
                                        <a-radio value="female">Nữ</a-radio>
                                    </a-radio-group>
                                </a-form-item>

                                <a-form-item
                                    label="Ngày sinh"
                                    name="date_of_birth"
                                    :rules="[{ required: true, message: 'Vui lòng chọn ngày sinh' }]"
                                >
                                    <a-date-picker v-model:value="formData.date_of_birth" :value-format="dateFormat"
                                                   format="DD-MM-YYYY " size="large" class="w-100"/>
                                </a-form-item>

                                <a-form-item
                                    label="Số điện thoại"
                                    name="phone"
                                    :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại' }]"
                                >
                                    <a-input v-model:value="formData.phone" size="large"
                                             placeholder="Nhập số điện thoại"
                                             type="number"/>
                                </a-form-item>

                                <a-form-item
                                    label="Vấn đề gặp phải"
                                    name="description"
                                    :rules="[{ required: true, message: 'Vui lòng nhập vấn đề gặp phải' }]"
                                >
                                    <a-textarea v-model:value="formData.description" placeholder="Nhập vấn đề gặp phải"
                                                :rows="6"/>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="col-sm-6 col-12 mt-2 mt-sm-0">
                            <div class="col-second">
                                <a-form-item label="Ngày khám">
                                    <a-config-provider :locale="locale">
                                        <a-calendar :fullscreen="false" :disabled-date="disabledDate"
                                                    @change="changeDateAppointment"/>
                                    </a-config-provider>
                                    <div class="text-center mt-1">
                                        <h3>{{ dateString }}</h3>
                                    </div>
                                </a-form-item>
                                <a-form-item label="Giờ khám"
                                             name="time"
                                             :rules="[{ required: true, message: 'Vui lòng chọn giờ khám' }]"
                                >
                                    <div class="row m-0">
                                        <div class="col-3 col-sm-2 p-2 text-center"
                                             v-for="timeAppointment in listTimeAppointment">
                                            <div class="p-2 time"
                                                 :class="{ 'disabled': !timeAppointment.enable, 'active': formData.time === timeAppointment.id }"
                                                 @click="timeAppointment.enable && changeTimeAppointment(timeAppointment.id)"
                                            >
                                                {{ timeAppointment.value }}
                                            </div>
                                        </div>
                                    </div>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer text-center">
                    <div class="row">
                        <div class="col-12">
                            <a-form-item>
                                <a-button type="primary" size="large" class="ps-5 pe-5" html-type="submit">Đăng ký
                                </a-button>
                            </a-form-item>
                        </div>
                    </div>
                </div>
            </a-form>

        </div>
    </div>
</template>

<script setup>
import {reactive, ref,} from 'vue';
import AppointmentService from "@/services/customer/AppointmentService.js";
import viVN from 'ant-design-vue/es/locale/vi_VN';
import {capitalizeFirstLetter, translate} from "@/helpers/CommonHelper.js";
import {isSuccessRequest} from "@/helpers/AxiosHelper.js";
import {messageError, messageSuccess} from "@/helpers/MessageHelper.js";
import {modalConfirm} from "@/helpers/ModalHelper.js";
import router from "@/router/index.js";
import RouteNameConstant from "@/constants/RouteNameConstant.js";
import {appointmentStore} from "@/stores/customer/Appointment.js";


const formData = reactive({
    name: null,
    gender: null,
    date_of_birth: null,
    phone: null,
    date: null,
    time: null,
    description: null
});

const disabledDate = (current) => {
    const today = new Date();
    const currentDate = new Date(current);
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 3);

    today.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    futureDate.setHours(23, 59, 59, 999);

    return currentDate < today || currentDate > futureDate;
}

const dateFormat = 'YYYY-MM-DD';
const locale = viVN;
const dateString = ref();
const listTimeAppointment = ref({});
const appointmentService = new AppointmentService();

const submit = () => {
    const title = translate('appointment.modal.create.title');
    let content = `Bạn có chắc chắc muốn đặt lịch vào khám ${convertTimeToString(formData.time)} - ngày ${dateString.value} không?`;

    const onOk = () => {
        appointmentService.create(formData).then((data) => {
            if (isSuccessRequest(data)) {
                messageSuccess(translate('appointment.messages.create_success'));
                appointmentStore().setAppointment(data.data);
                router.push({name: RouteNameConstant.CUSTOMER_DETAIL_APPOINTMENT});
                return;
            }
            messageError(translate('appointment.messages.create_fail'));
        });
    }
    modalConfirm(title, content, onOk, 600);
};

const convertTimeToString = (time) => {
    const hour = time.slice(0, 2);
    const minute = time.slice(2, 4);
    return `${hour} Giờ ${minute} Phút`;
}

const changeDateAppointment = (dateObject) => {
    formData.date = dateObject.format(dateFormat);
    loadTimeAppointment(dateObject)
}
const changeTimeAppointment = (timeId) => {
    formData.time = timeId;
}

const loadTimeAppointment = (date) => {
    const dateString = date.format(dateFormat);
    const params = {date: dateString};
    formData.date = dateString;
    appointmentService.getTime(params).then((data) => {
        listTimeAppointment.value = data;
    });
    setDateString(date);
}
const setDateString = (date) => {
    dateString.value = capitalizeFirstLetter(date.format('dddd, DD MMMM YYYY'));
}

loadTimeAppointment(dayjs);

</script>

<style lang="scss" scoped>

#wrapper-book-appointment {
    .col-first,
    .col-second {
        padding: 10px;
        border: 1px solid black;
        border-radius: 10px;
        height: 100%;
    }

    .time {
        border: 1px solid black;
        border-radius: 10px;
        cursor: pointer;
    }

    .time.active,
    .time:hover {
        background-color: gray;
    }

    .time.disabled {
        background-color: #f5f5f5;
        color: #ccc;
        cursor: not-allowed;
    }

    :deep(.ant-form-item-label > label),
    :deep(.ant-radio-wrapper-in-form-item > span) {
        font-weight: bold;
        font-size: 15px;
    }

    :deep(.ant-picker-calendar-mode-switch) {
        display: none;
    }

    :deep(.ant-picker-calendar-year-select),
    :deep(.ant-picker-calendar-month-select) {
        pointer-events: none;
    }
}


</style>
