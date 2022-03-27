<template>
  <v-row dense>
    <!-- title -->
    <v-col class="col-12">
      <div class="d-block mt-4 mb-2">
        <div class="subtitle-1 font-weight-light">견적문의 답변점 ㅋㅋㅋ</div>
        <div class="d-flex flex-fill">
          <div class="d-flex caption grey--text">홍길동 <span class="mx-auto mr-1 ml-1 caption">|</span> 2022-03-21</div>
          <v-spacer />
          <div class="d-flex caption grey--text">조회 21 <span class="mx-auto mr-1 ml-1 caption">|</span> 댓글 0</div>
        </div>
      </div>
      <v-divider />
    </v-col>

    <!-- content -->
    <v-col class="col-12">
      <div style="min-height: 600px;" class="body-2 pa-1">
        <p>고객님의 입장에서 서서 최대한 빠른조치를 해드리며, 고객님과 상의 후 일정 변경등을 결정하게 됩니다.</p>
        <p>여행일정에 대해 최대한 차질없이 진행할 수 있게 노력하겠습니다.</p>
        <p>단, 기상상태의 변경으로 인한 부분은 자연재해이기 때문에 보상이나 배상부분은 없습니다.</p>
      </div>
    </v-col>
    <!-- content -->
    <v-col class="col-12">
      <qna-reply />
    </v-col>
    <v-col class="col-12">
      <div class="d-flex flex-fill">
        <v-btn dark color="grey" class="darken-2" elevation="0" link to="/qna/list">
          <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
        </v-btn>
        <v-spacer />
        <v-btn dark color="grey" class="darken-2" elevation="0" link to="/qna/edit">
          <v-icon class="mr-1" small>mdi-playlist-edit</v-icon><span>수정</span>
        </v-btn>
      </div>
    </v-col>
  </v-row>

</template>

<script>
import QnaReply from "./QnaReply";
export default {
  components: {QnaReply}
}
</script>

<style scoped>

</style>