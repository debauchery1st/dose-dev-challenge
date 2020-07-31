import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret, faStar, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
library.add(faUserSecret);
library.add(faStar);
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Buefy, { defaultIconPack: "fas" });

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App)
    }).$mount("#app");
  }
  if (user) {
    // prevent losing the user profile on page refresh
    store.dispatch("fetchUserProfile", user);
  }
});
