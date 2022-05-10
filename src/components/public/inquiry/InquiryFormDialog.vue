<template>
  <div>

    <v-dialog v-model="inquiryDialog" width="1200px" eager persistent :fullscreen="$vuetify.breakpoint.smAndDown">


      <v-card>
        <v-toolbar elevation="0">
          <v-toolbar-title class="title"><strong>여행견적 문의하기</strong></v-toolbar-title>
          <v-spacer />
          <v-btn v-on:click="closeDialog()" icon >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider />

        <div class="pa-4">
          <div class="pt-2 pb-4 body-2">문의내용을 남겨주시면 빠른시간 내 확인 후 답변을 드리겠습니다:)</div>

          <v-form ref="frm" lazy-validation>
            <v-row >
              <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
                <!-- 입력 form -->
                <v-row no-gutters dense>
                  <v-col class="col-12" order="1">
                    <v-text-field
                        rounded filled
                        dense
                        class="rounded body-2"
                        label="여행문의제목"
                        :rules="rules.title"
                        v-model="command.title" />
                  </v-col>

                  <v-col class="col-6 pr-2" order="2">
                    <v-text-field
                        rounded filled
                        dense
                        class="rounded body-2"
                        label="성함 or 닉네임"
                        :rules="rules.writer"
                        v-model="command.writer" />
                  </v-col>

                  <v-col class="col-6 pl-2" order="3">
                    <v-text-field
                        rounded filled
                        dense
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
              </v-col>

              <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
                <!-- 정보활용동의 -->
                <v-sheet outlined>
                  <v-expansion-panels accordion>
                    <v-expansion-panel>
                      <v-expansion-panel-header class="pa-2">
                        <div>
                          <v-checkbox class="ma-0" dense hide-details label="개인정보수집동의" v-model="command.privacy" @change="setCheckTerms" />
                        </div>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content class="body-2">
                        <privacy-terms :height="330" />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header class="pa-2">
                        <div>
                          <v-checkbox dense hide-details label="제3자 개인정보활용동의" v-model="command.thirdParty" @change="setCheckTerms" />
                        </div>
                        </v-expansion-panel-header>
                      <v-expansion-panel-content class="body-2">
                        <third-party-terms :height="330" />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-sheet>
                <div class="error--text caption pa-2" v-if="checkTermsMessage">약관수락을 해주시기 바랍니다.</div>
              </v-col>

            </v-row>

          </v-form>
        </div>

        <div>
          <div class="d-flex flex-fill align-center justify-center pt-4 pb-4">
            <v-btn large elevation="0" color="deep-orange" class="darken-2 mr-2" dark min-width="120px" @click="store">문의하기</v-btn>
            <v-btn large elevation="0" color="grey" class="ml-2" dark min-width="120px" @click="closeDialog">닫기</v-btn>
          </div>
        </div>

      </v-card>


    </v-dialog>
  </div>
</template>

<script>
import PrivacyTerms from "@/components/public/inquiry/PrivacyTerms";
import ThirdPartyTerms from "@/components/public/inquiry/ThirdPartyTerms";
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
    showDialog: function(){
      this.clear();
      this.inquiryDialog = true;
    },
    closeDialog : function (){
      this.inquiryDialog = false;
      this.clear();
    },
    clear: function() {
      this.$refs.frm.resetValidation();
      let keys = Object.keys(this.command);
      keys.forEach(key => {
        this.command[key] = null;
      });
      this.command.privacy = false;
      this.command.thirdParty = false;
    },
    setCheckTerms: function(){
      if(this.checkTermsMessage && this.isCheckTerms) {
        this.checkTermsMessage = false;
      }
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