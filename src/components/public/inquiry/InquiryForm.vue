<template>
  <div>

    <!-- 개인정보약관 -->
    <div>
      <v-form ref="frm" lazy-validation>

        <div>
          <div class="pt-2 pt-2">
            <div class="caption pb-1 grey--text text--darken-1 ">문의를 남겨주시면 빠른시간 내 확인 후 회신드리겠습니다:)</div>
          </div>
          <v-row no-gutters dense>
            <v-col class="col-12" order="1">
              <v-text-field
                  rounded filled
                  dense
                  maxlength="20"
                  class="rounded body-2"
                  label="여행문의제목"
                  :rules="rules.title"
                  v-model="command.title" />
            </v-col>

            <v-col class="col-6 pr-2" order="2">
              <v-text-field
                  rounded filled
                  dense
                  maxlength="20"
                  class="rounded body-2"
                  label="성함 or 닉네임"
                  :rules="rules.writer"
                  v-model="command.writer" />
            </v-col>

            <v-col class="col-6 pl-2" order="3">
              <v-text-field
                  rounded filled
                  dense
                  maxlength="20"
                  class="rounded body-2"
                  label="연락처"
                  placeholder="연락처(필수아님)"
                  v-model="command.contact"
              />
            </v-col>

            <v-col class="col-12" order="4">
              <v-text-field
                  rounded filled
                  dense
                  maxlength="50"
                  class="rounded body-2"
                  label="e-mail"
                  v-model="command.email"
                  :rules="rules.email"
              />
            </v-col>

            <v-col class="col-12" order="5">
              <v-textarea rounded filled
                          rows="10"
                          label="문의내용을 작성해주세요."
                          v-model="command.content"
                          :rules="rules.content"
                          placeholder="여행과 관련한 문의내용을 남겨주세요:)"
                          no-resize
                          dense
                          class="rounded body-2"></v-textarea>
            </v-col>

          </v-row>
        </div>

        <div>
          <!-- 정보활용동의 -->
          <div class="caption pb-1 grey--text text--darken-1 ">아래 약관확인 및 동의해주셔야 문의등록이 가능합니다.</div>

          <v-sheet outlined>
            <v-expansion-panels accordion>
              <v-expansion-panel>
                <v-expansion-panel-header class="pa-2">
                  <div class="d-flex">
                    <v-checkbox class="ma-0" dense hide-details label="개인정보수집동의" v-model="command.privacy" @click="setCheckTerms"/>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="body-2">
                  <v-divider />
                  <div class="pa-2">
                    <privacy-terms :height="330" />
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header class="pa-2">
                  <div class="d-flex">
                    <v-checkbox class="ma-0" dense hide-details label="제3자 개인정보활용동의" v-model="command.thirdParty" @click="setCheckTerms"/>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="body-2">
                  <v-divider />
                  <div class="pa-2">
                    <third-party-terms :height="330" />
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-sheet>

        </div>

      </v-form>

      <div class="mt-4">
        <div class="d-flex flex-fill align-center justify-center pt-4 pb-4">
          <v-btn large elevation="0" color="deep-orange darken-1" dark @click="store">
            <v-icon class="mr-1">mdi-forum</v-icon> 문의하기</v-btn>
          <v-btn large elevation="0" color="grey2" class="ml-4" dark @click="clear"><v-icon class="mr-1">mdi-close</v-icon>초기화</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ThirdPartyTerms from "@/components/public/terms/ThirdPartyTerms";
import PrivacyTerms from "@/components/public/terms/PrivacyTerms";
import inquiryApi from "@/api/InquiryApi";

export default {
  components: {ThirdPartyTerms, PrivacyTerms},
  data:() =>({
    inquiryDialog: false,
    checkTermsMessage: false,
    command: {
      inquiryId:null,
      contact:null,
      email:null,
      title:null,
      content:null,
      writer:null,
      privacy: false,
      thirdParty: false,
    },
    rules: {
      title: [
        v => !!v || '문의 제목을 입력해주세요.',
        v => (v && v.length <= 20) || '제목을 20자까지 입력할 수 있습니다.',
      ],
      email: [
        v => !!v || '이메일 주소를 입력해주세요.',
        v => (v && v.length <= 50) || '최대 50자까지 입력할 수 있습니다.',
        v => /.+@.+\..+/.test(v) || '이메일 주소가 유효하지 않습니다.',
      ],
      writer: [
        v => !!v || '작성자명을 입력해주세요.',
        v => (v && v.length <= 20) || '작성자는 20자까지 입력할 수 있습니다.',
      ],
      content: [
        v => !!v || '문의내용을 입력해주세요.'
      ]
    }
  }),
  computed: {
    isCheckTerms(){
      return this.command.thirdParty && this.command.privacy;
    }
  },
  methods : {
    clear: function() {
      this.$refs.frm.resetValidation();
      let keys = Object.keys(this.command);
      keys.forEach(key => {
        this.command[key] = null;
      });
      this.command.privacy = false;
      this.command.thirdParty = false;
    },
    setCheckTerms: function(e){
      if(this.checkTermsMessage && this.isCheckTerms) {
        this.checkTermsMessage = false;
      }
      e.cancelBubble = true;
    },
    store: function() {
      let valid = this.$refs.frm.validate();
      let selfObject = this;
      if(valid) {
        // this.command.thirdPartyAgreedAt =
        if(!this.isCheckTerms) {
          this.checkTermsMessage = true;
        } else {
          inquiryApi.save(this.command).then( res => {
            console.log('res', res);
            this.$store.commit('alert', {
              title: '문의가 정상적으로 저장되었습니다.',
              message: '빠른시간 내 확인 후 답변드리겠습니다.',
              callback: function(){
                //this.close();
                console.log('close-self-dialog');
                // close();
                selfObject.closeDialog();
              }
            });
          });
        }
      }
    }
  },
}
</script>

<style scoped>

</style>