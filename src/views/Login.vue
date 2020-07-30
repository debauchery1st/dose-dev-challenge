<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()" />
    <section>
      <div class="col1">
        <h1>Dose Dev-Challenge</h1>
      </div>
      <div :class="{ 'signup-form': '!showLoginForm' }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h2>Login</h2>
          <hr />
          <div>
            <b-label for="email1">Email</b-label>
            <b-input
              type="email"
              placeholder="you@email.com"
              v-model.trim="loginForm.email"
              id="email1"
              maxlength="30"
            ></b-input>
          </div>
          <div>
            <b-label for="email1">Password</b-label>
            <b-field>
              <b-input
                type="password"
                placeholder="******"
                password-reveal
                v-model.trim="loginForm.password"
                id="password1"
              ></b-input>
            </b-field>
          </div>
          <br />
          <b-button type="is-dark" @click="login()">Log In</b-button>
          <div class="extras">
            <a @click="togglePasswordReset">Forgot Password?</a>
            <br />
            <a @click="toggleForm">Create an Account.</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h2>Sign up</h2>
          <hr />
          <div>
            <b-label for="name">Name</b-label>
            <b-input
              v-model.trim="signupForm.name"
              type="text"
              placeholder="Dose Dev Challenge"
              id="name"
            />
          </div>
          <div>
            <b-label for="title">Title</b-label>
            <b-input
              v-model.trim="signupForm.title"
              type="text"
              placeholder="Company"
              id="title"
            />
          </div>
          <div>
            <b-label for="email2">Email</b-label>
            <b-input
              v-model.trim="signupForm.email"
              type="text"
              placeholder="you@email.com"
              id="email2"
            />
          </div>
          <div>
            <b-label for="password2">Password</b-label>
            <b-input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="min 6 characters"
              id="password2"
            />
          </div>
          <br />
          <b-button type="is-dark" @click="signup()" class="button"
            >Sign Up</b-button
          >
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";
export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        title: "",
        email: "",
        password: ""
      },
      showLoginForm: true,
      showPasswordReset: false
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      });
    }
  }
};
</script>

<style lang="less" scoped>
//
.extras {
  display: flex;
  flex-flow: column;
  margin-top: 2rem;
  justify-content: space-around;
  align-items: center;
  letter-spacing: 1px;
  // border: 1px solid white;
}
.signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
</style>
