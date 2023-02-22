import FormView from "@/views/FormView.vue";
import HomeView from "@/views/HomeView.vue";
import InspectorView from "@/views/InspectorView.vue";
import RemoteInspectorView from "@/views/RemoteInspectorView.vue";
import UploadView from "@/views/UploadView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/form",
            name: "form",
            component: FormView,
        },
        {
            path: "/inspector",
            name: "inspector",
            component: InspectorView,
        },
        { path: "/upload", name: "upload", component: UploadView },
        {
            path: "/remoteInspector",
            name: "remoteInspector",
            component: RemoteInspectorView,
        },
    ],
});

export default router;
