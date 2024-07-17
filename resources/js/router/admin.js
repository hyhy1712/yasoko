import auth from "@/middleware/admin/auth.js";
import notAllowLoggedIn from "@/middleware/admin/not_allow_logged_in.js";
import abilities from "@/middleware/admin/abilities.js";
import menuSelected from "@/middleware/admin/menu_selected.js";
import routeNameConstant from "@/constants/RouteNameConstant.js";
import permissionConstant from "@/constants/PermissionConstant.js";
import SidebarKeyConstant from "@/constants/SidebarKeyConstant.js";

const admin = [
    {
        path: '/admin',
        children: [
            {
                path: "login",
                name: routeNameConstant.ADMIN_LOGIN,
                component: () => import("../views/admin/Login.vue"),
                meta: {
                    middleware: notAllowLoggedIn
                }
            },
            {
                path: "",
                component: () => import("../layouts/admin.vue"),
                meta: {
                    middleware: [auth, menuSelected]
                },
                children: [
                    {
                        path: "",
                        name: routeNameConstant.ADMIN_HOME_PAGE,
                        component: () => import("../views/admin/HomePage.vue"),
                        meta: {
                            middleware: {function: abilities, abilities: permissionConstant.DASHBOARD}
                        }
                    },
                    {
                        path: "dashboard",
                        name: routeNameConstant.ADMIN_DASHBOARD,
                        component: () => import("../views/admin/Dashboard.vue"),
                        meta: {
                            middleware: {function: abilities, abilities: permissionConstant.DASHBOARD},
                            sidebarKey: SidebarKeyConstant.DASHBOARD
                        }
                    },
                    {
                        path: "categories",
                        children: [
                            {
                                path: "",
                                name: routeNameConstant.ADMIN_CATEGORY_VIEW,
                                component: () => import("../views/admin/categories/List.vue"),
                                meta: {
                                    middleware: {function: abilities, abilities: permissionConstant.CATEGORY_VIEW},
                                    sidebarKey: SidebarKeyConstant.CATEGORY
                                }
                            },
                            // {
                            //     path: "create",
                            //     name: routeNameConstant.ROLE_CREATE,
                            //     component: () => import("../views/system/roles/Create.vue"),
                            //     meta: {
                            //         middleware: {function: abilities, abilities: permissionConstant.ROLE_CREATE},
                            //         sidebarKey: SidebarKeyConstant.ROLE
                            //     }
                            // },
                            // {
                            //     path: ":id/edit",
                            //     name: routeNameConstant.ROLE_EDIT,
                            //     component: () => import("../views/system/roles/Edit.vue"),
                            //     meta: {
                            //         middleware: {function: abilities, abilities: permissionConstant.ROLE_EDIT},
                            //         sidebarKey: SidebarKeyConstant.ROLE
                            //     }
                            // }
                        ]
                    },
                    {
                        path: "appointments",
                        children: [
                            {
                                path: "",
                                name: routeNameConstant.ADMIN_APPOINTMENT_VIEW,
                                component: () => import("../views/admin/appointments/List.vue"),
                                meta: {
                                    middleware: {function: abilities, abilities: permissionConstant.APPOINTMENT_VIEW},
                                    sidebarKey: SidebarKeyConstant.APPOINTMENT
                                }
                            }
                        ]
                    },
                    {
                        path: "roles",
                        children: [
                            {
                                path: "",
                                name: routeNameConstant.ADMIN_ROLE_VIEW,
                                component: () => import("../views/admin/system/roles/List.vue"),
                                meta: {
                                    middleware: {function: abilities, abilities: permissionConstant.ROLE_VIEW},
                                    sidebarKey: SidebarKeyConstant.ROLE
                                }
                            },
                            {
                                path: "create",
                                name: routeNameConstant.ADMIN_ROLE_CREATE,
                                component: () => import("../views/admin/system/roles/Create.vue"),
                                meta: {
                                    middleware: {function: abilities, abilities: permissionConstant.ROLE_CREATE},
                                    sidebarKey: SidebarKeyConstant.ROLE
                                }
                            },
                            {
                                path: ":id/edit",
                                name: routeNameConstant.ADMIN_ROLE_EDIT,
                                component: () => import("../views/admin/system/roles/Edit.vue"),
                                meta: {
                                    middleware: {function: abilities, abilities: permissionConstant.ROLE_EDIT},
                                    sidebarKey: SidebarKeyConstant.ROLE
                                }
                            }
                        ]
                    },
                    {
                        path: "users",
                        children: [
                            {
                                path: "",
                                name: routeNameConstant.ADMIN_USER_VIEW,
                                component: () => import("../views/admin/system/users/List.vue"),
                                meta: {
                                    middleware: {function: abilities, abilities: permissionConstant.USER_VIEW},
                                    sidebarKey: SidebarKeyConstant.USER
                                }
                            },
                            {
                                path: "create",
                                name: routeNameConstant.ADMIN_USER_CREATE,
                                component: () => import("../views/admin/system/users/Create.vue"),
                                meta: {
                                    middleware: {function: abilities, abilities: permissionConstant.USER_CREATE},
                                    sidebarKey: SidebarKeyConstant.USER
                                }
                            },
                            {
                                path: ":id/edit",
                                name: routeNameConstant.ADMIN_USER_EDIT,
                                component: () => import("../views/admin/system/users/Edit.vue"),
                                meta: {
                                    middleware: {function: abilities, abilities: permissionConstant.USER_EDIT},
                                    sidebarKey: SidebarKeyConstant.USER
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

export default admin;
