<template>
  <v-form ref="frm">
    <div>
      <div class="mt-1 mb-2">
        <v-icon class="mr-1" color="grey lighten-1">mdi-information</v-icon>
        <span class="caption">기본개요 등록 후 상품에 대한 이미지 및 컴포넌트 등록</span>
      </div>
      <v-row dense>
        <v-col cols="9">
          <v-text-field dense placeholder="여행상품에 대한 제목을 입력해주세요." aria-required="true" label="상품명" filled rounded class="rounded" ></v-text-field>
        </v-col>
        <v-col cols="3">
          <div class="d-flex justify-start flex-fill">
            <v-radio-group row class="mt-2 ml-4" dense hide-details hide-spin-buttons>
              <template v-slot:label>
                <strong>사용여부</strong>
              </template>
              <v-radio value="Y"><template v-slot:label><div class="body-2">사용</div></template></v-radio>
              <v-radio value="N"><template v-slot:label><div class="body-2">사용안함</div></template></v-radio>
            </v-radio-group>
          </div>
        </v-col>
        <v-col cols="4">
          <v-select filled rounded class="rounded" placeholder="여행상품 유형을 선택해주세요" label="상품유형" disabled></v-select>
        </v-col>
        <v-col cols="4">
          <v-select filled rounded class="rounded" placeholder="여행국가를 지정해주세요." label="국가"></v-select>
        </v-col>
        <v-col cols="4">
          <v-select filled rounded class="rounded" placeholder="여행국가 지역을 선택해주세요." label="지역"></v-select>
        </v-col>
        <v-col cols="4">
          <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1">mdi-image</v-icon>대표이미지</div>
          <v-sheet width="100%" height="300px" elevation="0" color="grey lighten-3" class="mx-auto align-center d-flex justify-center" rounded>
            <v-icon color="grey lighten-2" v-text="'mdi-image-plus'" size="100" @click="regRegImage"></v-icon>
          </v-sheet>
          <div class="justify-end d-flex flex-fill mt-1 mb-1">
            <!--
            <v-btn dark small color="indigo" elevation="0"><v-icon>mdi-plus</v-icon> 등록</v-btn>
            <v-btn dark small color="grey darken-2" elevation="0" class="ml-1"><v-icon>mdi-close</v-icon> 삭제</v-btn>
            -->
            <div class="d-flex caption">
              상품목록에 노출될 이미지를 등록합니다. <br />(W:440px / H:400px)
            </div>
            <v-spacer/>
            <v-btn dark small color="indigo" elevation="0" icon><v-icon>mdi-plus</v-icon></v-btn>
            <v-btn dark small color="grey darken-2" elevation="0" class="ml-1" icon><v-icon>mdi-close</v-icon></v-btn>
          </div>

        </v-col>
        <v-col cols="8">
          <div class="grey--text caption"><v-icon class="mr-1" color="grey lighten-1">mdi-text-box</v-icon>상품설명</div>
          <v-sheet :height="'500px'">
            <toast-editor ref="toast-editor"></toast-editor>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>

import ToastEditor from "@/components/common/ToastEditor";
export default {
  components:{ToastEditor},
  methods:{
    regRegImage: function(){
      //TODO : FileReader 를 이용해 이미지를 등록함
      console.log('regRegImage');
    }
  }
}
</script>

<style scoped>

</style>