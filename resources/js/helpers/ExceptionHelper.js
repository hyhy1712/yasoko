import AuthService from "@/services/admin/AuthService.js";
import {translate} from "@/helpers/CommonHelper.js";
import {pushRouterWithMessage} from "@/helpers/RouteHelper.js";
import {messageWarning} from "@/helpers/MessageHelper.js";
import {authStore} from "@/stores/admin/AuthStore.js";
import routeNameConstant from "@/constants/RouteNameConstant.js";

const EXCEPTION_TYPE = {
    AUTHENTICATION: 'AuthenticationException',
    FORBIDDEN: 'ForbiddenException',
    NOT_FOUND_HTTP: 'NotFoundHttp',
    NOT_FOUND_MODEL: 'NotFoundModel'
};

export function throwAuthenticationException() {
    throwException(EXCEPTION_TYPE.AUTHENTICATION)
}

export function throwForbiddenException() {
    throwException(EXCEPTION_TYPE.FORBIDDEN)
}

export function throwNotFoundHttpException() {
    throwException(EXCEPTION_TYPE.NOT_FOUND_HTTP)
}

export function throwNotFoundModelException() {
    throwException(EXCEPTION_TYPE.NOT_FOUND_MODEL)
}

function throwException(exception) {
    switch (exception) {
        case EXCEPTION_TYPE.AUTHENTICATION:
            new AuthService().logout();
            break;
        case EXCEPTION_TYPE.FORBIDDEN:
            pushRouterWithMessage(messageWarning, translate('message.warning.forbidden'));
            break;
        case EXCEPTION_TYPE.NOT_FOUND_MODEL:
            pushRouterWithMessage(messageWarning, translate('message.warning.not_found_model'));
            break;
        case EXCEPTION_TYPE.NOT_FOUND_HTTP:
            pushRouterWithMessage(messageWarning, translate('message.warning.not_found_http'), routeNameConstant.NOT_FOUND);
            break;
    }
    throw new Error(exception);
}
