<template>
  <v-row dense>
    <!-- title -->
    <v-col class="col-12">
      <div class="d-block mt-4 mb-2">
        <div class="subtitle-1 font-weight-light">{{command.title || '...'}}</div>
        <div class="d-flex flex-fill">
          <div class="d-flex caption grey--text">{{command.writer || '-'}} <span class="mx-auto mr-1 ml-1 caption">|</span> {{ command.create_at ? $moment(command.create_at).format("YYYY.MM.DD") : '-' }}</div>
          <v-spacer />
          <div class="d-flex caption grey--text">조회 {{ command.pv || 0 }} <span class="mx-auto mr-1 ml-1 caption">|</span> 댓글 {{ command.reply_cnt || 0 }}</div>
        </div>
      </div>
      <v-divider />
    </v-col>

    <!-- content -->
    <v-col class="col-12">
      <div style="min-height: 600px;" class="body-2 pa-1" v-html="command.content">
      </div>
    </v-col>
    <!-- content -->
    <v-col class="col-12">
      <qna-reply ref="qna_reply" @updateRepliesCount="updateRepliesCount" />
    </v-col>
    <v-col class="col-12">
      <div class="d-flex flex-fill">
        <v-btn dark color="grey" class="darken-2" elevation="0" link @click="list">
          <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
        </v-btn>
        <v-spacer />
        <v-btn dark color="grey" class="darken-2" elevation="0" link @click="edit">
          <v-icon class="mr-1" small>mdi-playlist-edit</v-icon><span>수정</span>
        </v-btn>
        <v-btn dark color="grey" class="darken-2 ml-2" elevation="0" link @click="deleteQna">
          <v-icon class="mr-1" small>mdi-delete</v-icon><span>삭제</span>
        </v-btn>
      </div>
    </v-col>
  </v-row>

</template>

<script>
import QnaReply from "./QnaReply";
import QnaApi from "./../../../api/qna"

export default {
  name: 'QnaView',
  components: {QnaReply},
  data: () => ({
    command: {
      qna_id:null,
      title:null,
      content:null,
      create_at:null,
      writer:null,
      pv:null,
      private_yn:null,
      reply_cnt:null,
    }
  }),
  mounted() {
    let qId = this.$route.query.qna_id || this.$route.params.qna_id;
    this.search(qId);
    this.$refs['qna_reply'].init(qId);
  },
  methods:{
    search: function(qna_id) {
      QnaApi.get(qna_id).then(res => {
        // console.log('qna_view.search.res', res);
        let result = res.data['result'];
        this.command.content = result['content'].split('\n').join('<br>').split(' ').join('&nbsp;');
        this.command.title = result['title'];
        this.command.create_at = result['create_at'];
        this.command.writer = result['writer'];
        this.command.pv = result['pv'];
        this.command.private_yn = result['private_yn'];
        this.command.reply_cnt = result['reply_cnt'];
        this.command.qna_id = result['qna_id'];
      })
    },
    list: function(){
      this.$router.push('/qna/list?page=1');
    },
    edit: function(){
      this.$router.push({name:'qna-edit', params:{qna_id: this.command.qna_id}});
    },
    deleteQna: function (){
      QnaApi.delete(this.command.qna_id).then(res => {
        console.log('qna_view.delete.res', res);
        this.$router.push('/qna/list?page=1');
      });
    },
    updateRepliesCount: function(repliesCount){
      this.command.reply_cnt = repliesCount;
    }
  }
}
</script>

<style scoped>

</style>