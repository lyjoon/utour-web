<template>
  <div class="d-block">

    <qna-reply-list ref="qna_reply_list" @updateRepliesCount="updateRepliesCount" />

    <qna-reply-edit ref="qna_reply_edit" @reloadReplies="reloadReplies" />

  </div>
</template>

<script>
import QnaReplyEdit from "./QnaReplyEdit";
import QnaReplyList from "./QnaReplyList";
export default {
  components: {QnaReplyList, QnaReplyEdit},
  data: ()=>({
    qnaId: null
  }),
  methods: {
    init: function(qnaId){
      this.qnaId = qnaId;
      this.$refs.qna_reply_list.init(this.qnaId);
      this.$refs.qna_reply_edit.init(this.qnaId);
    },
    updateRepliesCount: function(count){
      console.log('listCompleted', count);
      this.$emit('updateRepliesCount', count);
    },
    reloadReplies: function() {
      this.$refs.qna_reply_list.search();
    }
  }
}
</script>

<style scoped>

</style>