import routeNameConstant from "@/constants/RouteNameConstant.js";

const customer = [
    {
        path: "",
        component: () => import("../layouts/customer.vue"),
        children: [
            {
                path: "/dat-lich-kham",
                name: routeNameConstant.CUSTOMER_BOOK_APPOINTMENT,
                component: () => import("../views/customer/appointment/Create.vue")
            },
            {
                path: "/thong-tin-lich-kham",
                name: routeNameConstant.CUSTOMER_DETAIL_APPOINTMENT,
                component: () => import("../views/customer/appointment/Detail.vue")
            }
        ]
    }
];

export default customer;
