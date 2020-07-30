<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item to="/">
        <router-link to="/">Dashboard</router-link>
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
