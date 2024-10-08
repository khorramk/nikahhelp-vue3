import { createApp } from 'vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-select/dist/vue-select.css";
import Layout from "@/views/design/Layout.vue";
import Loader from "@/plugins/loader/loader.vue";
import AdminLayout from "@/components/admin/layout/AdminLayout.vue";
import MainHeader from "@/views/design/Header.vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import moment from 'moment'
import HighchartsVue from 'highcharts-vue';
// import axios from "axios";
// * This is the vue-web-storage package
// import Storage from "vue-web-storage";
// import TextareaAutosize from 'vue-textarea-autosize';
// * ApiService for the application
import vuetify from "@/plugins/vuetify";
import ApiService from "./services/api.service";
import 'viewerjs/dist/viewer.css';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import VueViewer from 'v-viewer';
import 'vuetify/dist/vuetify.min.css';

const Vue = createApp(App);
Vue.use(VueViewer);
Vue.use(HighchartsVue);
// Vue.use(Storage, {
//   prefix: "",
//   drivers: ["local"],
// });
ApiService.init();


// Vue.filter('formatDate', function (value) {
//   if (value) {
//     return moment(String(value)).format('MM/DD/YYYY hh:mm')
//   }
// });

Vue.config.globalProperties.$filters = {
    formatDate(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY hh:mm')
        }
    }
}


Vue.use(VueTelInput);
Vue.use(Antd);
Vue.component('MainHeader', MainHeader);
Vue.component('Layout', Layout);
Vue.component('Loader', Loader);
Vue.component('AdminLayout', AdminLayout);
// Vue.use(TextareaAutosize)


Vue.config.globalProperties.$webSocket = new WebSocket(`${import.meta.env.VITE_CHAT_SERVER}`);

Vue.config.globalProperties.$webSocket.onopen = function (event) {
    console.log("WebSocket is open now.");
    try {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        Vue.config.globalProperties.$webSocket.send(JSON.stringify({
            action: 'ping',
            user_id: loggedUser.id,
        }));
    } catch (e) {
        console.log(e);
    }
};

Vue.use(vuetify);
Vue.use(router);
Vue.use(store);
Vue.mount("#app");

// new Vue({
//   router,
//   store,
//   vuetify,
//   render: (h) => h(App),
// }).$mount("#app");

