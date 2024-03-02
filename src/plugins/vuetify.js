// src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
// import Vue from 'vue'
import { createVuetify } from 'vuetify'

// Vue.use(Vuetify)

const vuetify = createVuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
})



// export default new Vuetify({
//     icons: {
//         iconfont: 'mdi', // default - only for display purposes
//     },
// })

export default vuetify