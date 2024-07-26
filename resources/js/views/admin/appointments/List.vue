<template>
    <app-page
        :page-title="$t('appointment.title')"
        :advanced-search-input="advancedSearchInput"
        :columns="columns"
        :fetch-data="fetchData"
        :action-add="actionAdd"
        :other-button="otherButton"
    >
    </app-page>
    <a-modal v-model:open="visibleModalCheckAppointment"
             width="1000px"
             title="Kiểm tra lịch khám"
             cancel-text="Đóng"
             ok-text="Tải lại"
             @ok="loadTimeAppointment(dateAppointment)"
    >
        <a-form layout="vertical">
            <a-form-item label="Ngày khám">
                <a-config-provider :locale="locale">
                    <a-calendar :fullscreen="false" :disabled-date="disabledDate"
                                @change="loadTimeAppointment" v-model:value="dateAppointment"/>
                </a-config-provider>
            </a-form-item>
            <a-form-item label="Giờ khám" name="time">
                <div class="row m-0">
                    <div class="col-3 col-sm-2 p-2 text-center"
                         v-for="timeAppointment in listTimeAppointment">
                        <div class="p-2 time"
                             :class="{ 'disabled': !timeAppointment.enable}"
                        >
                            {{ timeAppointment.value }}
                        </div>
                    </div>
                </div>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script lang="jsx" setup>

import {ref, watch} from 'vue';
import AppPage from "@/components/views/AppPage.vue";
import {translate, convertStringTime} from "@/helpers/CommonHelper.js";
import RouteNameConstant from "@/constants/RouteNameConstant.js";
import router from "@/router/index.js";
import AppointmentService from "@/services/customer/AppointmentService.js";
import EntitySelectConstant from "@/constants/EntitySelectConstant.js";
import viVN from "ant-design-vue/es/locale/vi_VN.js";

const dateFormat = 'YYYY-MM-DD';
const locale = viVN;
const visibleModalCheckAppointment = ref(false);
const listTimeAppointment = ref({});
const dateAppointment = ref(dayjs);

const appointmentService = new AppointmentService();

const advancedSearchInput = [
    {
        type: 'text',
        key: 'name',
        name: translate('appointment.columns.name')
    },
    {
        type: 'number',
        key: 'phone',
        name: translate('appointment.columns.phone')
    },
    {
        type: 'date',
        key: 'date',
        name: translate('appointment.columns.date')
    },
    {
        type: 'entity-select',
        multiple: true,
        entity: EntitySelectConstant.TIME_APPOINTMENT,
        key: 'time',
        name: translate('appointment.columns.time'),
        maxTagCount: 5
    },
];

const columns = [
    {
        title: translate('appointment.columns.date'),
        width: '7%',
        dataIndex: 'date',
        key: 'date',
        customRender: ({text}) => {
            return <b style="font-size:18px">{text}</b>;
        },
    },
    {
        title: translate('appointment.columns.time'),
        width: '5%',
        dataIndex: 'time',
        key: 'time',
        customRender: ({text}) => {
            const time = convertStringTime(text);
            return <b style="font-size:18px">{time}</b>;
        },
    },
    {
        title: translate('appointment.columns.name'),
        width: '10%',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: translate('appointment.columns.gender'),
        width: '5%',
        dataIndex: 'gender',
        key: 'gender',
        customRender: ({text}) => {
            return translate(`appointment.column_values.gender.${text}`);
        },
    },
    {
        title: translate('appointment.columns.date_of_birth'),
        width: '7%',
        dataIndex: 'date_of_birth',
        key: 'date_of_birth',
    },
    {
        title: translate('appointment.columns.phone'),
        width: '5%',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: translate('appointment.columns.description'),
        width: '25%',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: translate('appointment.columns.status'),
        width: '5%',
        dataIndex: 'status',
        key: 'status',
        customRender: ({text}) => {
            if (text === appointmentService.CANCEL) {
                return <a-tag color="red">{translate('appointment.column_values.status.0')}</a-tag>;
            } else if (text === appointmentService.ACTIVE) {
                return <a-tag color="green">{translate('appointment.column_values.status.1')}</a-tag>;
            }
        },
    },
    {
        title: translate('appointment.columns.created_at'),
        width: '10%',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    // {
    //     title: translate('appointment.columns.updated_at'),
    //     width: 5,
    //     dataIndex: 'updated_at',
    //     key: 'updated_at',
    // }
];

const otherButton = [
    {
        'title': translate('appointment.buttons.check_appointment'),
        'onClick': () => {
            visibleModalCheckAppointment.value = true;
        },
        'style': 'background: green; border-color: green'
    }
];

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

const fetchData = (params) => {
    return appointmentService.getList(params);
}

const actionAdd = () => {
    const url = router.resolve({name: RouteNameConstant.CUSTOMER_BOOK_APPOINTMENT}).href;
    window.open(url, '_blank');
}

//Modal
const loadTimeAppointment = (date) => {
    const dateString = date.format(dateFormat);
    const params = {date: dateString};
    appointmentService.getTime(params).then((data) => {
        listTimeAppointment.value = data;
    });
}

//watch
watch(visibleModalCheckAppointment, (visible) => {
    if (visible) {
        loadTimeAppointment(dateAppointment.value);
    }
});
</script>


<style lang="scss" scoped>

.time {
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
}

.time.active,
.time:hover {
    background-color: green;
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
</style>
