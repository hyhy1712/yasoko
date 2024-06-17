const USER_STATUS_ACTIVE = 1;
const USER_STATUS_DEACTIVATE = 0;
const USER_STATUS = new Map([
    [USER_STATUS_ACTIVE, 'Kích hoạt'],
    [USER_STATUS_DEACTIVATE, 'Hủy kích hoạt']
]);

const CALL_CENTER = new Map([
    [1, 'ccsip.educa.vn'],
    [2, 'ccsip02.educa.vn'],
    [3, 'ccgw01.educa.vn'],
    [4, 'ccgw02.educa.vn']
]);

const convertToDataSelect = (data) => {
    let result = [];
    data.forEach((value, key) => {
        result.push({label: value, value: key})
    });
    return result;
}

export default {
    USER_STATUS_ACTIVE,
    USER_STATUS_DEACTIVATE,
    USER_STATUS,
    CALL_CENTER,
    convertToDataSelect
};
