import router from "@/router/index.js";

export function reloadCurrentRoute() {
    const currentRoute = router.currentRoute.value;
    const routeParams = currentRoute.params;
    const routeQuery = currentRoute.query;
    const routeName = currentRoute.name;

    router.push({name: routeName, params: routeParams, query: routeQuery});
}
