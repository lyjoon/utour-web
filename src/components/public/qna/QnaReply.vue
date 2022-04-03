<template>
  <div>
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
    qna_id: null
  }),
  methods: {
    init: function(qna_id){
      this.qna_id = qna_id;
      this.$refs.qna_reply_list.init(this.qna_id);
      this.$refs.qna_reply_edit.init(this.qna_id);
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