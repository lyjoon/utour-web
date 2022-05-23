<template>
  <v-dialog width="330px" persistent v-model="flag">
    <v-card elevation="0">
      <v-toolbar elevation="0">
        <div class="d-flex flex-fill align-center">
          <v-toolbar-title>화면유형선택</v-toolbar-title>
          <v-spacer />
          <v-btn icon color="grey" outlined tile class="rounded toolbar-btn-outlined" small @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-toolbar>

      <v-divider class="mb-4" />

      <v-card-text>
        <v-form ref="frm" lazy-validation onsubmit="return false">
          <div class="mb-4">
            <v-text-field rounded filled dense v-model="groupName" placeholder="그룹명을 입력해주세요." maxlength="50"
                          class="rounded ime-mode-active"
                          counter label="그룹명" :rules="rules" @keydown.enter="apply" />
          </div>
        </v-form>

        <div class="text-center">
          <v-btn color="blue darken-1" class="mr-2" dark elevation="0" @click="apply">
            <v-icon small class="mr-1">mdi-check-outline</v-icon> 적용
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: ()=>({
    flag: false,
    groupName:null,
    productImageGroupIdx:null,
    rules: [
      v => !!v || '그룹명을 입력해주세요.',
      v => (v && v.length <= 50) || '최대 50자까지 입력 가능합니다.',
    ]
  }),
  methods:{
    close: function(){
      this.flag = false;
      this.clear();
    },
    open: function (params){
      this.clear();
      if(params) {
        this.groupName = params.groupName || null;
        this.productImageGroupIdx = isNaN(params.productImageGroupIdx) ? null : params.productImageGroupIdx;
      }
      this.flag = true;
    },
    clear: function(){
      this.groupName = null;
      this.productImageGroupIdx = null;

      if(this.$refs.frm) {
        this.$refs.frm.reset();
        this.$refs.frm.resetValidation();
      }
    },
    apply: function() {
      let valid = this.$refs.frm.validate();
      if(valid) {
        let params = {groupName : this.groupName, productImageGroupIdx: this.productImageGroupIdx};
        this.$emit('apply', params);
        this.close();
      }
    }
  }
}
</script>

<style scoped>

</style>