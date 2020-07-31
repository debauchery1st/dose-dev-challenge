<template>
  <div id="dashboard">
    <section>
      <!-- <transition name="fade">
        <CommentModal
          v-if="showCommentModal"
          :post="selectedPost"
          @close="toggleCommentModal()"
        ></CommentModal>
        <li>
          <a @click="toggleCommentModal(post)">comments {{ post.comments }}</a>
        </li>
      </transition> -->
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
                placeholder="...type your review in here"
              ></textarea>
              <br />
              <div class="rate-box">
                <b-rate
                  icon-pack="fas"
                  @change="success"
                  custom-text="How would you rate this?"
                ></b-rate>
              </div>
              <b-button
                type="is-dark"
                @click="createReview()"
                :disabled="review.content === ''"
                class="button"
              >
                submit
              </b-button>
            </form>
          </div>
        </div>
      </div>
      <div v-if="posts.length" class="recent-reviews">
        <div v-for="post in posts.slice(0, 3)" :key="post.id" class="post">
          <h5>{{ post.userName }}</h5>
          <span>{{ post.createdOn | formatDate }}</span>
          <p>{{ post.content | trimeLength }}</p>
          <ul>
            <li>
              <a>comments {{ post.comments }}</a>
            </li>
            <li>
              <a>likes {{ post.likes }}</a>
            </li>
            <li><a>view full post</a></li>
          </ul>
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
import CommentModal from "@/components/CommentModal";
export default {
  components: {
    CommentModal
  },
  data() {
    return {
      review: {
        content: ""
      },
      showCommentModal: false,
      selectedPost: {}
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"])
  },
  methods: {
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
    createReview() {
      this.$store.dispatch("createReview", { content: this.review.content });
      this.review.content = "";
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal;

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post;
      } else {
        this.selectedPost = {};
      }
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
textarea {
  width: 300px;
  height: 200px;
  background-color: #1f2230;
  letter-spacing: 1px;
  color: #79b8a7;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 0.5rem;
  margin: 1rem;
}
.post {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  // text-align: left;
  width: 32ch;
  min-height: 32ch;
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
</style>
