<template>
  <div>
    <qna-reply-list />
    <qna-reply-edit />
  </div>
</template>

<script>
import QnaReplyEdit from "./QnaReplyEdit";
import QnaReplyList from "./QnaReplyList";
export default {
  components: {QnaReplyList, QnaReplyEdit, }
}
</script>

<style scoped>

</style>