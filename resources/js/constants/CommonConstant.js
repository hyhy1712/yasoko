const USER_STATUS_ACTIVE = "1";
const USER_STATUS_DEACTIVATE = "0";
const USER_STATUS = {
    [USER_STATUS_ACTIVE]: 'Kích hoạt',
    [USER_STATUS_DEACTIVATE]: 'Hủy kích hoạt'
};

const CALL_CENTER = {
    1: 'ccsip.educa.vn',
    2: 'ccsip02.educa.vn',
    3: 'ccgw01.educa.vn',
    4: 'ccgw02.educa.vn',
};

const convertToDataSelect = (data) => {
    return Object.entries(data).map(([key, value]) => ({
        label: value,
        value: key,
    }))
}

export default {
    USER_STATUS_ACTIVE,
    USER_STATUS_DEACTIVATE,
    USER_STATUS,
    CALL_CENTER,
    convertToDataSelect
};
