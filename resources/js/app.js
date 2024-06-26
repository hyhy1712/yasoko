import '@/bootstrap';
import App from '@/App.vue';
import {createApp} from "vue";
import {createPinia} from 'pinia';
import {languages} from "@assets/js/lang/index.js";
import router from "@/router/index.js";
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import Antd, {
    message
} from 'ant-design-vue';
import axios from "axios";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');
window.dayjs = dayjs();
window.axios = axios;

const pinia = createPinia();

const app = createApp(App);

app.use(Antd);
app.use(router);
app.use(pinia);
app.use(languages);
app.use(LoadingPlugin);

app.mount("#app");

app.config.globalProperties.$message = message;


