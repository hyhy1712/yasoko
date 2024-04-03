<template>
    <div class="page-title">
        <h2><b>{{ pageTitle }}</b></h2>
    </div>
    <div class="page-search">
        <div class="d-sm-flex justify-content-end row row-cols-sm-auto m-0 mb-sm-3">

            <a-space direction="vertical" style="padding:0px">
                <a-input-search
                    v-model:value="searchData.keyword"
                    enter-button
                    @search="onSearch"
                    :size='sizeButton'
                    :allowClear="true"
                    :placeholder="$t('common.placeholder.quick_search')"
                />
            </a-space>
            <a-dropdown :trigger="['click']" v-if="advancedSearchInput.length > 0"
                        v-model:open="visibleAdvancedSearch" @openChange="handleVisibleChangeAdvancedSearch">
                <template #overlay @click.prevent>
                    <div class="wrapper-advanced-search"
                         style="padding:20px;width:100vh;background-color:#fff; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25); border-radius: 2px;">
                        <div class="advanced-search-input d-flex flex-wrap">
                            <div class="mb-2 col-12 col-sm-3" style="margin: 4%;"
                                 v-for="(input,index) in advancedSearchInput" :key="index">
                                <div>{{ input.name }}</div>
                                <app-input
                                    v-model="searchData[input.key]"
                                    :type="input.type"
                                    :options="input.options ?? []"
                                    :entity="input.entity ?? null"
                                    :multiple="input.multiple ?? false"
                                >
                                </app-input>
                            </div>
                        </div>
                        <div class="advanced-search-button" style="margin-top:100px">
                            <div class="d-flex justify-content-center">
                                <button-search @click="submitAdvancedSearch" class="m-1"></button-search>
                                <button-reset-search @click="resetAdvancedSearch" class="m-1"></button-reset-search>
                            </div>
                        </div>
                    </div>
                </template>
                <a-button type="primary" :size='sizeButton'
                          style="background: var(--button-submit-color);border-color: var(--button-submit-color)">
                    {{ $t('common.buttons.advanced') }}
                </a-button>
            </a-dropdown>
        </div>
    </div>
    <div class="page-button">
        <div class="d-sm-flex justify-content-end row row-cols-sm-auto m-0 mb-sm-3">
            <button-upload @click="actionUpload" v-if="actionUpload" :size="sizeButton"></button-upload>
            <button-download @click="actionDownload" v-if="actionDownload" :size="sizeButton"></button-download>
            <button-add @click="actionAdd" v-if="actionAdd" :size="sizeButton"></button-add>
            <button-refresh @click="actionRefresh"></button-refresh>
        </div>
    </div>
    <div class="page-content">
        <a-card class="mt-3">
            <a-table :columns="columns" :data-source="data.data ?? []" :pagination="false">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'action'">
                        <template v-if="actionEdit">
                            <a-button shape="circle" class="me-1"
                                      @click="clickActionEdit(record)">
                                <template #icon>
                                    <img src="@assets/images/icon/edit.svg" alt="" style="width:18px">
                                </template>
                            </a-button>
                        </template>
                        <template v-if="getActionOther">
                            <a-dropdown :trigger="['click']">
                                <template #overlay @click.prevent>
                                    <a-menu>
                                        <a-menu-item v-for="(action,index) in getActionOther(record)" :key="index"
                                                     @click="tableClickActionOther(record, action.event)">
                                            {{ action.title }}
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                                <a-button shape="circle">
                                    <img src="@assets/images/icon/otheraction.svg" alt="">
                                </a-button>
                            </a-dropdown>
                        </template>
                    </template>
                </template>
            </a-table>
            <div class="mt-4 d-flex flex-row-reverse me-2 mb-2">
                <a-pagination
                    v-model:current="data.current_page"
                    v-model:page-size="data.per_page"
                    :total="data.total"
                    :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
                    @change="onChangePagination"
                />
            </div>
        </a-card>
    </div>
</template>

<script setup>
import {ref, watch, defineProps} from "vue";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import ButtonUpload from "@/components/buttons/ButtonUpload.vue";
import ButtonDownload from "@/components/buttons/ButtonDownload.vue";
import ButtonSearch from "@/components/buttons/ButtonSearch.vue";
import ButtonResetSearch from "@/components/buttons/ButtonResetSearch.vue";
import ButtonRefresh from "@/components/buttons/ButtonRefresh.vue";
import AppInput from "@/components/inputs/AppInput.vue";
import {isEmptyObject, translate, cloneObject, isArray} from "@/helpers/CommonHelper.js";
import router from "@/router/index.js";

const props = defineProps({
    sizeButton: {
        type: String,
        default: 'large'
    },
    pageTitle: {
        type: String,
        required: true
    },
    columns: {
        type: Array,
        default: []
    },
    advancedSearchInput: {
        type: Array,
        default: []
    },
    fetchData: {
        type: Function,
        required: true
    },
    triggerFetchData: {
        type: null,
        default: null
    },
    actionAdd: {
        type: Function,
        default: null
    },
    actionEdit: {
        type: Function,
        default: null
    },
    actionDownload: {
        type: Function,
        default: null
    },
    actionUpload: {
        type: Function,
        default: null
    },
    getActionOther: {
        type: Function,
        default: null
    },
    clickActionOther: {
        type: Function,
        default: null
    }
});
const columns = cloneObject(props.columns, 'array');
columns.unshift({
    title: '#',
    width: 2,
    key: 'index',
    customRender: ({index}) => {
        return ++index;
    },
});

if (props.actionEdit || props.getActionOther) {
    columns.push({
        title: translate('common.columns.action'),
        key: 'action',
        fixed: 'right',
        width: 3,
    });
}

const defaultSearchData = {
    page: 1,
    limit: 10
};
const searchData = ref(cloneObject(defaultSearchData));
const visibleAdvancedSearch = ref(false);
const data = ref({});

const fetchData = async () => {
    router.push({query: searchData.value});
    const dataSource = await props.fetchData(searchData.value);

    if (!dataSource) {
        const defaultSearch = cloneObject(defaultSearchData);
        data.value.current_page = defaultSearch.page;
        data.value.per_page = defaultSearch.limit;
        data.value.total = 0;
    } else {
        data.value = dataSource;
    }
    visibleAdvancedSearch.value = false;
}
const firstFetchData = () => {
    const routeQuery = router.currentRoute.value.query;
    if (!isEmptyObject(routeQuery)) {
        searchData.value = routeQuery;
    }
    fetchData();
}
firstFetchData();

//Pagination
const onChangePagination = (currentPage, pageSize) => {
    searchData.value.page = currentPage;
    searchData.value.limit = pageSize;
    fetchData();
};

//Search
const onSearch = () => {
    removeSearchDataAdvanced();
    fetchData();
}
const submitAdvancedSearch = () => {
    delete searchData.value.keyword;
    searchData.value = {...searchData.value, ...cloneObject(defaultSearchData)};
    fetchData();
}
const resetAdvancedSearch = () => {
    removeSearchDataAdvanced();
    fetchData();
}
const removeSearchDataAdvanced = () => {
    const keyword = searchData.value.keyword;
    setDefaultSearchData();
    if (keyword) {
        searchData.value.keyword = keyword;
    }
//    TODO xem lại phần này, reset xong nhưng option vẫn giữ giá trị đã chọn
}
const setDefaultSearchData = () => {
    searchData.value = cloneObject(defaultSearchData);
}
const handleVisibleChangeAdvancedSearch = (visible) => {
    if (visible === false) {
        // TODO set lại advanced search bằng giá trị từ url, tránh trường hợp nhập xong không submit thì ẩn đi vẫn giữ giá trị cũ
    }
}

//action
const tableClickActionOther = (record, event) => {
    props.clickActionOther({
        id: record.id,
        record: record,
        event: event,
        pageParams: searchData.value
    });
}
const clickActionEdit = (record) => {
    props.actionEdit({id: record.id, record: record, pageParams: searchData.value});
}
const actionRefresh = () => {
    fetchData();
}

//watch
watch(
    () => props.triggerFetchData,
    () => {
        fetchData();
    }
)
</script>

<style lang="scss" scoped>
:deep(.ant-pagination li) {
    margin-top: 5px;
}

:deep(.ant-input-search-button) {
    background: var(--button-search-color);
}

:deep(.ant-table-body) {
    min-height: 50vh;
}

:deep(.ant-space-align-center) {
    padding-left: 0px !important;
    padding-right: 0px !important;
}

.page-button button.ant-btn {
    margin-left: 5px;
}

@media (max-width: 575px) {
    .fillter-left {
        justify-content: flex-end !important;
    }
    .carousel {
        width: 100% !important;
    }
}
</style>
