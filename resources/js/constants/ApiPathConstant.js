const API_PATH = {
    //Admin
    ADMIN_LOGIN: "admin/login",
    ADMIN_LOGOUT: "admin/logout",
    ADMIN_ME_INFO: "admin/me",

    ADMIN_ALL_ROLE: 'admin/all/roles',

    ADMIN_ROLE_LIST: 'admin/roles',
    ADMIN_ROLE_CREATE: 'admin/roles',
    ADMIN_ROLE_DETAIL: 'admin/roles/{id}',
    ADMIN_ROLE_UPDATE: 'admin/roles/{id}',
    ADMIN_ROLE_ACTIVE: 'admin/roles/{id}/active',
    ADMIN_ROLE_DEACTIVATE: 'admin/roles/{id}/deactivate',
    ADMIN_MODULE_GROUP_PERMISSION_LIST: 'admin/roles/module-group-permission',

    ADMIN_PERMISSION_LIST: 'admin/permissions',

    ADMIN_USER_LIST: 'admin/users',
    ADMIN_USER_CREATE: 'admin/users',
    ADMIN_USER_DETAIL: 'admin/users/{id}',
    ADMIN_USER_UPDATE: 'admin/users/{id}',

    ADMIN_CATEGORY_LIST: 'admin/categories',
    ADMIN_CATEGORY_CREATE: 'admin/categories',
    ADMIN_CATEGORY_DETAIL: 'admin/categories/{id}',
    ADMIN_CATEGORY_UPDATE: 'admin/categories/{id}',

    ADMIN_APPOINTMENT_VIEW: 'admin/appointments',

    //Customer
    APPOINTMENT_GET_TIME: 'appointments/get-time',
    APPOINTMENT_CREATE: 'appointments'

}
export default API_PATH;
