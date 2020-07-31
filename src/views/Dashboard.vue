<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>Rate this product</h5>
          <p>product description</p>
          <div class="create-review">
            <p>submit a review of this product</p>
            <form @submit.prevent>
              <textarea
                class="widget-text"
                v-model.trim="review.content"
              ></textarea>
              <br />
              <button
                @click="createReview()"
                :disabled="review.content === ''"
                class="button"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div>
          <p class="no-results">There are currently no reviews</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      review: {
        content: ""
      }
    };
  },
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    createReview() {
      this.$store.dispatch("createReview", { content: this.review.content });
      this.review.content = "";
    }
  }
};
</script>

<style lang="less" scoped>
textarea {
  width: 300px;
  height: 200px;
  background-color: darkslategrey;
  color: #efefef;
  font-size: 1em;
  font-weight: bold;
  border: 1px solid white;
}
</style>
