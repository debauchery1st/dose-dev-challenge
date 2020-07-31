<template>
  <div id="app" v-bind:style="appStyle">
    <SiteNav id="nav" v-if="showNav"></SiteNav>
    <router-view id="page" />
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
// body {
//   // padding: 30px;
//   height: 100vh;
//   width: 100vw;
//   margin: 0;
// }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  // background-color: #121212;
  color: #efefef;
}
#page {
  background-color: #121212;
  color: #efefef;
}
</style>
