<template>
  <b-navbar>
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
