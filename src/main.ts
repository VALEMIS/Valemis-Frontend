import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import AdminLTE CSS
import "./assets/css/adminlte.css";

// Import OverlayScrollbars CSS
import "overlayscrollbars/overlayscrollbars.css";

// Import PrimeVue
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";

// Import PrimeVue CSS
import "primevue/resources/themes/aura-light-blue/theme.css";

// Import OpenLayer
// import "vue3-openlayers/dist/index.css";
import OpenLayersMap from "vue3-openlayers";

const app = createApp(App);

app.use(router);
app.use(OpenLayersMap /*, options */);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: ".dark-mode",
      cssLayer: false,
    },
  },
});
app.mount("#app");
