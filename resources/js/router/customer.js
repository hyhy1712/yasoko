import routeNameConstant from "@/constants/RouteNameConstant.js";

const customer = [
    {
        path: "/dat-lich-kham",
        name: routeNameConstant.CUSTOMER_BOOK_APPOINTMENT,
        component: () => import("../views/customer/appointment/create.vue")
    }
];

export default customer;
