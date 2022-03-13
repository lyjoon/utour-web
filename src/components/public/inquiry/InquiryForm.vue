<template>
  <v-card>
    <v-toolbar elevation="0">
      <v-toolbar-title class="title"><strong>여행 문의하기</strong></v-toolbar-title>
      <v-spacer />
      <v-btn v-on:click="close()" icon >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider />


    <v-form ref="frm" lazy-validation>

      <div class="inquiry_form">
        <v-row dense>
          <v-col class="col-12">
            <v-text-field
                filled
                rounded
                dense
                class="rounded-lg"
                label="여행문의 제목"
            />
          </v-col>


          <v-col class="col-6">
            <v-text-field
                filled
                rounded
                dense
                class="rounded-lg"
                label="회신받으실 연락처를 입력해주세요."
            />
          </v-col>

          <v-col class="col-6">
            <v-text-field
                filled
                rounded
                dense
                class="rounded-lg"
                label="회신받으실 e-mail를 입력해주세요."
            />
          </v-col>


          <v-col class="col-12">
            <v-textarea filled rounded rows="10" label="문의내용을 작성해주세요." no-resize dense class="rounded-lg"></v-textarea>
          </v-col>
          <v-col class="col-12">
              <v-checkbox color="secondary" class="mt-0 mb-1" label="개인정보수집동의" dense hide-details />
              <v-checkbox color="secondary" class="mt-1 mb-0" label="제3자 개인정보활용 동의" dense hide-details />
          </v-col>
        </v-row>

        <div class="d-flex flex-fill align-center justify-center pb-4">
          <v-btn large elevation="0" color="deep-orange" class="darken-2 mr-2" dark min-width="120px">문의하기</v-btn>
          <v-btn large elevation="0" color="grey" class="ml-2" dark min-width="120px" @click="close">닫기</v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "InquiryForm",
  methods : {
    close : function (){
      //this.$refs.frm.reset();
      this.$emit('close');
      console.log('close-s')
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>