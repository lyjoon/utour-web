<template>
  <div>

    <div class="pt-6 pb-4">
      <div class="title text-h5">제목</div>
      <div class="mt-2 mb-6 body-2 grey--text">
        <div class="d-flex flex-fill">
          <div>작성자 : 홍길동 </div>
          <div><span class="mx-auto mr-2 ml-2">|</span> 등록일 : 2022-03-21</div>
          <div><span class="mx-auto mr-2 ml-2">|</span> 조회 : 21</div>
        </div>
      </div>
      <v-divider class="grey" />
    </div>

    <div>
      <v-sheet min-height="550px">
        <toast-viewer ref="viewer" />
      </v-sheet>
    </div>

    <!-- 첨부파일 -->
    <div>
      <v-divider />
      <v-sheet color="grey lighten-4" class="pa-4">
        <ul>
          <li>
            <div class="pt-2 pb-2">제11회 KNDA 학술 논문상 공모_포스터.pdf <v-icon>mdi-download</v-icon></div>
          </li>
          <li>
            <div class="pt-2 pb-2">제출 서류양식.pdf <v-icon>mdi-download</v-icon></div>
          </li>
        </ul>
      </v-sheet>
      <v-divider />
    </div>


    <div class="pt-8 pb-8">
      <div class="d-flex flex-fill justify-end">
        <v-btn large outlined elevation="0" link to="/notice/list">
          <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
        </v-btn>
      </div>
    </div>

  </div>
</template>

<script>
import ToastViewer from "@/components/common/ToastViewer";
export default {
  components: {ToastViewer}
}
</script>

<style scoped>

</style>