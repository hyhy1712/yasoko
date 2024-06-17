import {authStore} from "@/stores/admin/AuthStore.js";

export function hasPermissions(permissions) {
    return authStore().hasPermissions(permissions);
}

export function hasAnyPermissions(permissions) {
    return authStore().hasAnyPermission(permissions);
}


