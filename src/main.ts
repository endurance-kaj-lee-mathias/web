import app from "@/app.vue";
import { config } from "@/config/idp";
import router from "@/router/router";
import "@/styles.css";
import { vueKeycloak } from "@josempgon/vue-keycloak";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(app)
    .use(router)
    .use(pinia)
    .use(vueKeycloak, {
        config,
        initOptions: {
            onLoad: "check-sso",
            pkceMethod: "S256",
            silentCheckSsoRedirectUri:
                window.location.origin + "/check-sso.html",
            enableLogging: true,
            checkLoginIframe: false,
        },
    })
    .mount("#app");
