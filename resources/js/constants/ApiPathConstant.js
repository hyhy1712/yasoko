const API_PATH = {
    LOGIN: "login",
    LOGOUT: "logout",
    ME_INFO: "me",

    ALL_ROLE: 'all/roles',

    ROLE_LIST: 'roles',
    ROLE_CREATE: 'roles',
    ROLE_DETAIL: 'roles/{id}',
    ROLE_UPDATE: 'roles/{id}',
    ROLE_ACTIVE: 'roles/{id}/active',
    ROLE_DEACTIVATE: 'roles/{id}/deactivate',
    MODULE_GROUP_PERMISSION_LIST: 'roles/module-group-permission',

    PERMISSION_LIST: 'permissions',

    USER_LIST: 'users',
    USER_SALE: 'user/sale',
    USER_CREATE: 'users',
    USER_DETAIL: 'users/{id}',
    USER_UPDATE: 'users/{id}',
}
export default API_PATH;
