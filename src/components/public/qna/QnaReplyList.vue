<template>
  <div class="d-block">
    <div class="caption">전체댓글 : {{ count || '0' }}개</div>
    <secondary-divider />

    <v-list>

      <template v-for="(item, index) in items">

        <v-list-item :key="`content-${index}`" class="hidden-md-and-down">
          <v-list-item-avatar tile width="180" class="pa-1 ma-0 justify-start body-2">{{item.writer}}</v-list-item-avatar>
          <v-list-item-content >
            <div class="pl-2 pr-2 body-2">
              {{item.content}}
            </div>
          </v-list-item-content>
          <div class="d-inline caption align-center">
            <span class="grey--text">{{ $moment(item.createAt).format("YYYY.MM.DD") }}</span>
            <v-btn icon dark color="grey" @click="deleteReply(item)">
              <v-icon small>mdi-close-circle</v-icon>
            </v-btn>
          </div>
        </v-list-item>

        <v-list-item :key="`small-content-${index}`" class="hidden-lg-and-up">
          <v-list-item-content>
            <v-list-item-subtitle class="caption">{{item.writer}} | {{$moment(item.createAt).format("YYYY.MM.DD")}}</v-list-item-subtitle>
            <div class="mt-1 body-2">{{item.content}}</div>
          </v-list-item-content>
          <v-btn icon dark color="grey" @click="deleteReply(item)">
            <v-icon small>mdi-close-circle</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider :key="`dvd-${index}`" class="grey lighten-3" v-if="index < (items.length -1)" />

      </template>

    </v-list>
  </div>
</template>

<script>
import SecondaryDivider from "../../common/SecondaryDivider";
import Qna from "../../../api/QnaApi";

export default {
  components: {SecondaryDivider},
  data: () => ({
    qnaId:null,
    count: null,
    page: null,
    items: []
  }),
  methods: {
    init: function (qnaId) {
      console.log('qna_reply_list.init.qnaId', qnaId);
      this.qnaId = qnaId;
      this.search();
    },
    search : function() {
      Qna.getReplies(1, this.qnaId).then(res => {
        let result = res.data.result;
        this.count = res.data.count || 0;
        this.items = result;
        this.page = res.data.page;
        this.$emit('updateRepliesCount', this.count);
      });
    },
    deleteReply: function(item){
      Qna.deleteReply(item.qnaId, item.qnaReplyId).then(res => {
        console.log('res', res);
        this.search();
      })
    }
  }
}
</script>

<style scoped>

</style>
