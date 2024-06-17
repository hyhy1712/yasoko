import {$t} from "@assets/js/lang/index.js";

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

export function isset(value) {
    return typeof value !== 'undefined';
}

export function getEnv(key) {
    return import.meta.env[`VITE_${key}`] ?? null;
}

export function cloneObject(object, type = 'object') {
    let result = {};
    if (type === 'array') {
        result = [];
    }
    return Object.assign(result, object);
}

