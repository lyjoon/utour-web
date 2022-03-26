<template>
  <div>
    <v-divider />
    <div class="grey lighten-4 pa-2">
      <v-layout row class="hidden-md-and-down">
        <v-flex class="d-flex flex-fill">

          <div class="d-inline-block pt-2 pb-2 pr-2 pl-4">
            <div class="d-block" style="width: 200px;">
              <!-- <input type="text" placeholder="작성자" width="100%"
                     style="background-color: white;border: 1px solid #c8c8c8;height: 40px;padding: 5px;font-size: 14px"
                     class="rounded" />-->
              <v-text-field outlined hide-details dense placeholder="작성자명 또는 닉네임" label="닉네임" background-color="white" class="font-size-14" />
            </div>
            <div class="d-block mt-4">
              <v-text-field type="password" outlined hide-details dense label="비밀번호" placeholder="댓글 비밀번호" background-color="white" class="font-size-14" />
              <!-- <input type="password" placeholder="비밀번호" width="100%" style="background-color: white;border: 1px solid #c8c8c8;height: 40px;padding: 5px;font-size: 14px" class="rounded" />-->
            </div>
          </div>

          <div class="flex-fill pt-2 pb-2 pr-4 pl-2">
            <v-textarea rows="5" dense hide-details outlined no-resize background-color="white" label="댓글" placeholder="댓글" class="font-size-14" />
            <!-- <textarea rows="5"
                        placeholder="코멘트"
                        style="font-size: 14px; padding:5px;width: 100%;background-color: white;border: 1px solid #c8c8c8;resize: none" class="rounded"></textarea>-->
          </div>
        </v-flex>
      </v-layout>
      <v-layout row class="hidden-lg-and-up">
        <v-flex class="d-flex col-6 flex-fill">
          <v-text-field outlined hide-details dense label="작성자" placeholder="작성자명 또는 닉네임" background-color="white" class="font-size-14" />
        </v-flex>
        <v-flex class="d-flex col-6 flex-fill">
          <v-text-field type="password" outlined hide-details dense label="댓글 비밀번호" placeholder="댓글 비밀번호" background-color="white" class="font-size-14" />
        </v-flex>
        <v-flex class="col-12">
          <v-textarea rows="5" dense hide-details outlined no-resize background-color="white" label="댓글" placeholder="댓글" class="font-size-14" />
        </v-flex>
      </v-layout>
<!--      <div class="d-flex flex-fill">
        <div class="d-inline-block">
          <div class="d-block">
            <input type="text" placeholder="작성자" width="300px"
                   style="background-color: white;border: 1px solid #c8c8c8;height: 40px;padding: 5px;font-size: 14px"
                   class="rounded" />
          </div>
          <div class="d-block mt-1">
            <input type="password" placeholder="비밀번호" width="300px" style="background-color: white;border: 1px solid #c8c8c8;height: 40px;padding: 5px;font-size: 14px" class="rounded" />
          </div>
        </div>

        <div class="flex-fill pl-4">
              <textarea rows="5"
                        placeholder="코멘트"
                        style="font-size: 14px; padding:5px;width: 100%;background-color: white;border: 1px solid #c8c8c8;resize: none" class="rounded"></textarea>
        </div>
      </div>-->

      <div class="d-flex flex-fill justify-end">
        <v-btn dark color="deep-orange" class="darken-2" elevation="0" >
          <template v-slot:default>
            <v-icon small class="mr-1">mdi-message-reply-text</v-icon> 저장
          </template>
        </v-btn>
      </div>

    </div>
    <v-divider />
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
