<template>
  <b-navbar id="nav">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <font-awesome-icon icon="user-secret" size="lg" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item to="/">
        <router-link to="/">Widget</router-link>
      </b-navbar-item>
      <b-navbar-item to="/settings">
        <router-link to="/settings">Settings</router-link>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item>
        <a @click="logout()">Logout</a>
      </b-navbar-item>
      <b-navbar-item></b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style lang="less">
// body {
//   padding: 30px;
//   height: 100vh;
//   width: 100vw;
//   margin: 0;
// }

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   // color: #2c3e50;
//   // background-color: #121212;
//   color: #efefef;
// }

#nav {
  a {
    // font-weight: bold;
    color: #2c3e50;
    letter-spacing: 1px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
}
</style>
