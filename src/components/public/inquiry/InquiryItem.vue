<template>
  <div>
    <sub-title title="견적문의"
                 description="견적문의 주시면 빠른 시간안에 답변드리겠습니다." />

    <v-form ref="frm" lazy-validation>
      <v-row dense>
        <v-col class="col-12" order="1">
          <v-text-field
              filled
              rounded
              hide-details
              dense
              class="rounded body-2"
              label="제목"
          ></v-text-field>
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
          <v-textarea filled hide-details
                      rounded rows="13" label="문의내용을 작성해주세요." no-resize dense class="rounded-lg body-2"></v-textarea>
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
            <div>
              <v-btn elevation="0" color="deep-orange" class="darken-2" dark large>
                <v-icon class="mr-1">mdi-check</v-icon>
                문의하기
              </v-btn>
            </div>
          </div>
        </v-col>

      </v-row>
    </v-form>
  </div>
</template>

<script>
import SubTitle from "../../common/SubTitle";
export default {
  components: {SubTitle},
  methods : {
  }
}
</script>

<style scoped>

</style>