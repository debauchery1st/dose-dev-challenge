import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  },
  actions: {
    async createReview({ state, commit }, review) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: review.content + (commit.content || ""),
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      });
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit("setUserProfile", {}); // clear profile
      router.push("/login"); // redirect
    },
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      });
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      commit("setUserProfile", userProfile.data());

      router.push("/");
    }
  },
  modules: {}
});
