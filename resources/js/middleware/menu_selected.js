import {menuStore} from "@/stores/MenuStore.js";

export default function menuSelected({to, next}) {
    //TODO, nhiều cấp
    const sidebarKey = to.meta.sidebarKey;
    if (sidebarKey) {
        menuStore().onSelectedKeys([sidebarKey]);
    }
    return next();
}
