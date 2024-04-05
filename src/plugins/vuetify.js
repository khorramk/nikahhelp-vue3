// src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
// import Vue from 'vue'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vue.use(Vuetify)

const vuetify = createVuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    components,
    directives,
})



// export default new Vuetify({
//     icons: {
//         iconfont: 'mdi', // default - only for display purposes
//     },
// })

export default vuetify;