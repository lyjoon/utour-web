<template>
  <div>
    <v-card-subtitle class="pl-2">
      <span style="font-size: 18px">여행견적 문의하기</span>
    </v-card-subtitle>

    <v-form ref="frm" lazy-validation>
      <v-row dense>
        <v-col class="col-12">
          <v-text-field
              filled
              rounded
              hide-details
              dense
              class="rounded-lg"
              label="여행문의 제목"
          />
        </v-col>

        <v-col class="col-6">
          <v-text-field
              filled
              rounded
              hide-details
              dense
              class="rounded-lg"
              label="회신받으실 연락처를 입력해주세요."
          />
        </v-col>

        <v-col class="col-6">
          <v-text-field
              filled
              rounded
              hide-details
              dense
              class="rounded-lg"
              label="회신받으실 e-mail를 입력해주세요."
          />
        </v-col>


        <v-col class="col-12">
          <v-textarea filled hide-details
                      rounded rows="10" label="문의내용을 작성해주세요." no-resize dense class="rounded-lg"></v-textarea>
        </v-col>

        <v-col class="col-12">
          <div class="pt-4 pb-4 d-flex flex-fill">
            <div class="d-block">
              <v-checkbox color="secondary" class="mt-0 mb-1" label="개인정보수집동의" dense hide-details />
              <v-checkbox color="secondary" class="mt-1 mb-0" label="제3자 개인정보활용 동의" dense hide-details />
            </div>
            <v-spacer />
            <div>
              <v-btn large elevation="0" color="deep-orange" class="darken-2" dark>
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
export default {
  name: "HomeInquiry"
}
</script>

<style scoped>

</style>