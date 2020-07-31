<template>
  <div id="dashboard" class="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <br />
          <h5>select a product</h5>
          <div class="create-review">
            <form @submit="checkForm">
              <ul v-if="errors.length" class="val-error-container">
                <b>Please correct the following...</b>
                <li v-for="error in errors" :key="error.id" class="val-error">{{ error }}</li>
              </ul>
              <div class="product-options">
                <b-select v-model="review.variation" placeholder="Select a Product" icon="account">
                  <optgroup label="Alexa">
                    <option value="charcoal-fab">Charcoal Fabric</option>
                    <option value="sandstone-fab">Sandstone Fabric</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="walnut-fin">Walnut Finish</option>
                    <option value="walnut-fin">Heather Gray Fabric</option>
                    <option value="walnut-fin">Oak Finish</option>
                  </optgroup>
                </b-select>
              </div>
              <div class="widget-text-container">
                <b-field>
                  <b-input
                    class="widget-text"
                    v-model.trim="review.content"
                    type="textarea"
                    minlength="10"
                    maxlength="500"
                    placeholder="...type your review in here"
                  ></b-input>
                </b-field>
              </div>
              <br />
              <div class="rate-box">
                <b-rate
                  v-model="review.rating"
                  icon-pack="fas"
                  @change="success()"
                  custom-text="How do you rate this product?"
                ></b-rate>
              </div>
              <b-button
                @click="createReview()"
                :disabled="review.content === ''"
                class="button"
              >submit</b-button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="posts.length" class="recent-reviews">
        <div v-for="post in posts.slice(0, 3)" :key="post.id" class="post">
          <h5>{{ post.userName }}</h5>
          <span>{{ post.createdOn | formatDate }}</span>
          <p>{{ post.content | trimeLength }}</p>
          <p>{{ post.rating }} stars</p>
          <p>variation: {{ post.variation }}</p>
        </div>
      </div>
      <div v-else>
        <p class="no-results">There are currently no posts</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      errors: [],
      review: {
        content: "",
        rating: 0,
        variation: ""
      },
      selectedPost: {}
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"])
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];
      if (this.review.content.length < 10) {
        this.errors.push("Lengthen your review.");
      }
      if (this.review.variation.length < 1) {
        this.errors.push("Select your variation from the drop-down list.");
      }
      if (this.review.rating === 0) {
        this.errors.push("Rate the product between 1 and 5 stars");
      }
      if (this.errors.length === 0) {
        return true;
      }
      e.preventDefault(e);
    },
    success() {
      this.review.rating = this.$buefy.toast.open({
        message: "Thank you for the rating!",
        type: "is-success"
      });
    },
    createReview() {
      if (this.checkForm()) {
        console.log("ok");
      }
      this.$store.dispatch("createReview", {
        content: this.review.content,
        rating: this.review.rating,
        variation: this.review.variation
      });
      this.review.content = "";
      this.review.rating = 0;
      this.review.variation = "";
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }

      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 100) {
        return val;
      }
      return `${val.substring(0, 100)}...`;
    }
  }
};
</script>

<style lang="less" scoped>
.widget-text-container {
  display: flex;
  justify-content: center;
  width: 100vw;
}
.widget-text {
  min-width: 42ch;
  // background-color: #1f2230;
  letter-spacing: 1px;
  // color: #79b8a7;
  font-size: 1rem;
  // border: 1px solid;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.dashboard {
  padding-top: 4rem;
}
.post {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  // text-align: left;
  width: 32ch;
  // min-height: 32ch;
  margin: 1rem;
  border: 1px solid white;
  border-radius: 0.5rem;
  padding: 1rem;
  // background-color: #36454f;
}
.recent-reviews {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: auto;
}
.rate-box {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1rem;
}
.product-options {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: auto;
  margin-top: 1rem;
}
.error-div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 40ch;

  height: auto;
}
.val-error-container {
  padding: 0.5rem;
  text-align: center;
  line-height: 1em;
  width: 100vw;
}
.val-error {
  color: #e45360;
  line-height: 1.2em;
  letter-spacing: 1px;
}
</style>
