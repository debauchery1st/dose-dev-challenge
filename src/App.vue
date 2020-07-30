<template>
  <div id="app" :style="appStyle">
    <SiteNav v-if="showNav"></SiteNav>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

import SiteNav from "@/components/SiteNav";

export default {
  data() {
    return {
      appStyle: {
        backgroundColor: "#121212",
        color: "#efefef",
        width: "100vw",
        height: "100vh"
      }
    };
  },
  components: {
    SiteNav
  },
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return Object.keys(this.userProfile).length > 1;
    }
  }
};
</script>

<style lang="less">
body {
  padding: 30px;
  height: 100vh;
  width: 100vw;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    // color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
