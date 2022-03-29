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
          <v-col class="col-12" order="1">
            <v-text-field
                filled
                rounded
                hide-details
                dense
                class="rounded body-2"
                label="제목"
            />
          </v-col>


          <v-col class="col-6" order="2">
            <v-text-field
                filled
                rounded
                hide-details
                dense
                class="rounded body-2"
                label="이름"
            />
          </v-col>

          <v-col class="col-6" order="3">
            <v-text-field
                filled
                rounded
                hide-details
                dense
                class="rounded body-2"
                label="연락처"
            />
          </v-col>

          <v-col class="col-12" order="4">
            <v-text-field
                filled
                rounded
                hide-details
                dense
                class="rounded body-2"
                label="e-mail"
            />
          </v-col>

          <v-col class="col-12" order="5">
            <v-textarea filled rounded rows="10" label="문의내용을 작성해주세요." no-resize dense class="rounded-lg body-2"></v-textarea>
          </v-col>

          <v-col class="col-12" order="6">
            <div class="d-flex flex-fill fill-height align-end">
              <div class="d-block">
                <v-checkbox color="secondary" class="ma-0" dense hide-details >
                  <template v-slot:label><span class="body-2">개인정보수집동의</span></template>
                </v-checkbox>
                <v-checkbox color="secondary" class="ma-0" dense hide-details >
                  <template v-slot:label>
                    <span class="body-2">제3자 개인정보활용 동의</span>
                  </template>
                </v-checkbox>
              </div>
              <v-spacer />
            </div>
          </v-col>
        </v-row>

        <div class="d-flex flex-fill align-center justify-center pt-4 mb-2">
          <v-btn large elevation="0" color="deep-orange" class="darken-2 mr-2" dark min-width="120px">문의하기</v-btn>
          <v-btn large elevation="0" color="grey" class="ml-2" dark min-width="120px" @click="close">닫기</v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "InquiryView",
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