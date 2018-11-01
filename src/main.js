import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/gas";
import App from "./App.vue";
import router from "./router";
import { syncGas } from "./router-gas-sync";

Vue.config.productionTip = false;

syncGas(router);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
