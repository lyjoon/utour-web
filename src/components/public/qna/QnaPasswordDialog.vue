<template>
  <v-dialog v-model="showDialog" width="420px" persistent >
    <v-card elevation="1">
      <v-card-title class="subtitle-1 pt-8">
        비밀번호를 입력해주세요.
      </v-card-title>
      <v-card-subtitle class="pt-2">
        해당 게시글은 비밀 게시글입니다:)
      </v-card-subtitle>
      <v-card-text class="pt-0">
        <v-text-field prepend-inner-icon="mdi-lock" v-model="password"
                      dense
                      filled
                      hide-details
                      rounded class="rounded" type="password"
                      @keyup.enter="doSubmit"
                      label="비밀번호 입력"></v-text-field>
      </v-card-text>
      <v-card-actions class="align-center d-flex justify-center pb-8">
        <v-btn elevation="0" color="deep-orange darken-1" dark @click="doSubmit">입력</v-btn>
        <v-btn elevation="0" color="grey1" class="darken-2" dark @click="doCancel">취소</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import QnaApi from "@/api/QnaApi";

export default {
  name: "QnaPasswordDialog",
  data: ()=>({
    qnaId:null,
    type:null,
    password:null,
    success:false,
    showDialog: false,
  }),
  methods:{
    open: function(qnaId, type){
      this.password = null;
      this.success = false;
      this.showDialog = true;
      this.type = type;
      this.qnaId = qnaId;
    },
    close: function(){
      this.showDialog = false;
      this.clear();
    },
    clear: function(){
      this.qnaId = null;
      this.type = null;
      this.password = null;
      this.success = false;
    },
    doSubmit: function(){
      QnaApi.isAccess(this.qnaId, this.password).then(res => {
        let access = res.data.result;
        if(access) {
          this.success = true;
          this.showDialog = false;
          this.$emit('success', this.type)
        } else {
          this.openAlert();
        }
      });
    },
    openAlert: function(){
      this.$store.commit('alert', {title:'안내', message:'비밀번호가 일치하지 않습니다.'});
    },
    doCancel: function(){
      this.$emit('cancel', this.type);
      this.close();
    },
    getPassword: function(){
      return this.password;
    },
    isSuccess: function(){
      return this.success;
    }
  }
}
</script>

<style scoped>

</style>