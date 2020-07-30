import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;
Vue.use(Buefy);

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
