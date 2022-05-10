<template>
  <div class="d-block" v-if="items && items.length > 0">
    <div class="mt-1 mb-1 body-2 grey--text">전체댓글 : {{ count || '0' }}개</div>
    <v-divider />

    <v-list>
      <template v-for="(item, index) in items">

        <v-list-item :key="`small-content-${index}`">
          <v-list-item-content>
            <v-list-item-subtitle>
              <strong :class="`body-2 ${item.adminYn == 'Y' ? 'font-weight-black blue-grey--text':''}`">{{item.writer}}</strong>
              <span class="ml-1 mr-1 caption">|</span> <span class="caption">{{$moment(item.createAt).format("YYYY.MM.DD")}}</span></v-list-item-subtitle>
            <div class="mt-1 body-2">{{item.content}}</div>
          </v-list-item-content>

          <v-btn icon @click="deleteReply(item)">
            <v-icon color="grey darken-1" :small="$vuetify.breakpoint.smAndDown">mdi-close</v-icon>
          </v-btn>

        </v-list-item>

        <v-divider :key="`dvd-${index}`" class="grey lighten-3" v-if="index < (items.length -1)" />

      </template>

    </v-list>
  </div>
</template>

<script>
import QnaApi from "../../../api/QnaApi";

export default {
  data: () => ({
    qnaId:null,
    count: null,
    page: null,
    items: []
  }),
  methods: {
    init: function (qnaId) {
      this.qnaId = qnaId;
      this.search();
    },
    search : function() {
      QnaApi.getReplies(1, this.qnaId).then(res => {
        let result = res.data.result;
        this.count = res.data.count || 0;
        this.items = result;
        this.page = res.data.page;
      });
    },
    deleteReply: function(item) {
      // eslint-disable-next-line no-unused-vars
      QnaApi.deleteReply(item.qnaId, item.qnaReplyId).then(res => {
        this.search();
      }).catch(error => {
        this.$store.commit("snackMessage", {message : error.response.data.message});
      });
    }
  }
}
</script>

<style scoped>

</style>
