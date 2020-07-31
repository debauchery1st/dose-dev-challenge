import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: []
  },
  mutations: {
    setPosts(state, val) {
      state.posts = val;
    },
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
        rating: review.rating || 0,
        variation: review.variation || "",
        timestamp: fb.firebaseApp.serverTimestamp()
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
fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  let postsArray = [];

  snapshot.forEach((doc) => {
    let post = doc.data();
    post.id = doc.id;

    postsArray.push(post);
  });

  store.commit("setPosts", postsArray);
});
export default store;
