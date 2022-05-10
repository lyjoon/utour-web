<template>
  <div class="d-block" v-if="items && items.length > 0">
    <div class="mt-1 mb-2 body-2">전체댓글 : {{ count || '0' }}개</div>
    <v-divider />

    <v-list>
      <template v-for="(item, index) in items">

        <v-list-item :key="`small-content-${index}`">
          <v-list-item-content>
            <v-list-item-subtitle>
              <strong :class="`body-2 ${item.adminYn == 'Y' ? 'font-weight-black blue-grey--text':''}`">{{item.writer}}</strong>
              <span class="ml-1 mr-1 caption">|</span> <span class="caption">{{$moment(item.createAt).format("YYYY.MM.DD")}}</span>
            </v-list-item-subtitle>
            <div class="mt-1 body-2">{{item.content}}</div>
          </v-list-item-content>

          <v-menu offset-x top rounded v-model="item['password_menu']" :close-on-content-click="false" :close-on-click="false" class="elevation-0">
            <template v-slot:activator="{on, attrs}">
              <v-btn icon v-bind="attrs" @click="openPassword(item)" v-on="on">
                <v-icon color="grey darken-1" :small="$vuetify.breakpoint.smAndDown">mdi-close</v-icon>
              </v-btn>
            </template>
            <v-text-field type="password" dense outlined v-model="item.password" background-color="white"
                          hide-details
                          @keyup.enter="deleteReply(item)"
                          placeholder="비밀번호">
              <template v-slot:append>
                <v-icon color="green" @click="deleteReply(item)">mdi-check</v-icon>
                <v-icon color="deep-orange" class="darken-1 ml-1" @click="closePassword(item)">mdi-close</v-icon>
              </template>
            </v-text-field>
          </v-menu>

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
      console.log('qna_reply_list.init.qnaId', qnaId);
      this.qnaId = qnaId;
      this.search();
    },
    search : function() {
      QnaApi.getReplies(1, this.qnaId).then(res => {
        let result = res.data.result;
        this.count = res.data.count || 0;
        this.items = result;
        this.page = res.data.page;
        this.$emit('updateRepliesCount', this.count);
      });
    },
    openPassword: function(item){
      if(item['password_menu']) {
        this.closePassword(item);
      }
    },
    closePassword: function(item){
      item['password_menu'] = false;
      if(item.password ) {
        item.password = '';
      }
    },
    deleteReply: function(item) {
      QnaApi.deleteReply(item.qnaId, item.qnaReplyId, item.password || '-').then(res => {
        console.log('delete.reply.response', res);
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
