import app from "@/app.vue";
import { config } from "@/config/idp";
import router from "@/router";
import "@/styles.css";
import { vueKeycloak } from "@josempgon/vue-keycloak";
import { createApp } from "vue";

createApp(app)
    .use(router)
    .use(vueKeycloak, {
        config,
        initOptions: {
            onLoad: "check-sso",
            pkceMethod: "S256",
            silentCheckSsoRedirectUri:
                window.location.origin + "/check-sso.html",
        },
    })
    .mount("#app");
