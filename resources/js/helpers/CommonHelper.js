import {$t} from "@assets/js/lang/index.js";
import router from "@/router/index.js";
import routeNameConstant from "@/constants/RouteNameConstant.js";
import {useRoute} from 'vue-router';
import {authStore} from "@/stores/AuthStore.js";

export function isEmptyObject(object) {
    return !object || Object.keys(object).length === 0;
}

export function isObject(value) {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}

export function isArray(value) {
    return Array.isArray(value);
}

export function buildApiUrl(path) {
    return `/api/${path}`;
}

export function buildApiPathWithParams(path, params) {
    for (const [key, value] of Object.entries(params)) {
        let param = `{${key}}`;
        path = path.replaceAll(param, value);
    }
    return path;
}

export function translate(key) {
    return $t(key);
}

export function pushRouterWithMessage(messageFunction, message, routeName = routeNameConstant.HOME_PAGE) {
    messageFunction(message);
    router.push({name: routeName});
}

export function isset(value) {
    return typeof value !== 'undefined';
}

export function getEnv(key) {
    return import.meta.env[`VITE_${key}`] ?? null;
}

export function getRouteParams(params = null) {
    const route = useRoute();
    const routeParams = route.params;

    if (!params) {
        return routeParams;
    }
    if (typeof params === 'string') {
        return routeParams[params];
    }
    if (isArray(params)) {
        var result = {};
        params.forEach(function (key) {
            if (routeParams.hasOwnProperty(key)) {
                result[key] = routeParams[key];
            }
        });
        return result;
    }

    return {};
}

export function hasPermissions(permissions) {
    return authStore().hasPermissions(permissions);
}

export function hasAnyPermissions(permissions) {
    return authStore().hasAnyPermission(permissions);
}

export function cloneObject(object, type = 'object') {
    let result = {};
    if (type === 'array') {
        result = [];
    }
    return Object.assign(result, object);
}

