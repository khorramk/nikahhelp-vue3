
import Dashboard from "@/views/design/Dashboard.vue";
import Layout from '@/views/design/Layout.vue'

export default [
    {
        path: "/design",
        name: "ui-dashboard",
        component: Layout,
        meta: {
            requiresAuth: true,
        },

        children: [
            {
                path: "dashboard",
                name: "design.dashboard",
                component: Dashboard
            }
        ]
    },
]