const API_PATH = {
    //Admin
    ADMIN_LOGIN: "login",
    ADMIN_LOGOUT: "logout",
    ADMIN_ME_INFO: "me",

    ADMIN_ALL_ROLE: 'all/roles',

    ADMIN_ROLE_LIST: 'roles',
    ADMIN_ROLE_CREATE: 'roles',
    ADMIN_ROLE_DETAIL: 'roles/{id}',
    ADMIN_ROLE_UPDATE: 'roles/{id}',
    ADMIN_ROLE_ACTIVE: 'roles/{id}/active',
    ADMIN_ROLE_DEACTIVATE: 'roles/{id}/deactivate',
    ADMIN_MODULE_GROUP_PERMISSION_LIST: 'roles/module-group-permission',

    ADMIN_PERMISSION_LIST: 'permissions',

    ADMIN_USER_LIST: 'users',
    ADMIN_USER_CREATE: 'users',
    ADMIN_USER_DETAIL: 'users/{id}',
    ADMIN_USER_UPDATE: 'users/{id}',

    ADMIN_CATEGORY_LIST: 'categories',
    ADMIN_CATEGORY_CREATE: 'categories',
    ADMIN_CATEGORY_DETAIL: 'categories/{id}',
    ADMIN_CATEGORY_UPDATE: 'categories/{id}',

    //Customer
    APPOINTMENT_GET_TIME: 'appointments/get-time',
    APPOINTMENT_CREATE: 'appointments'

}
export default API_PATH;
