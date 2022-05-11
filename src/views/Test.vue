<template>
  <v-container>
    <div style="height: 50vh;">
      <toast-editor ref="editor" @onChange="setMarkdown" />
    </div>
    <div style="height: 40vh;margin-top: 20px">
      <toast-viewer ref="viewer" />
    </div>
    <div>
      <v-btn @click="openAlert">SHOW</v-btn>
      <v-btn @click="openSnack">SNACK</v-btn>
      <v-btn @click="confirm">SNACK</v-btn>
    </div>
    <alert ref="alert" />
    <snackbar ref="snackbar" />
    <confirm ref="confirm" />
  </v-container>
</template>

<script>

import ToastEditor from "@/components/common/ToastEditor";
import ToastViewer from "@/components/common/ToastViewer";
import Alert from "@/components/common/Alert";
import Snackbar from "@/components/common/Snackbar";
import Confirm from "@/components/common/Confirm";
export default {
  components: {Confirm, Snackbar, Alert, ToastViewer, ToastEditor},
  data: () =>({
  }),
  methods:{
    setMarkdown: function(markdown){
      this.$refs.viewer.setMarkdown(markdown);
    },
    openAlert: function (){
      this.$refs.alert.open();
    },
    confirm: function (){
      this.$store.commit("confirm", {message : '삭제할까', callback: function(){
        console.log("confirm-success");
        }});
    },
    openSnack: function(){
      //this.$store.state.snackbar.message = 'snack';
      // this.$store.state.snackbar.flag = true;
      this.$store.commit("snackMessage", {message : '공지 게시글을 정상적으로 불러오지 못했습니다.'});
    }
  }
}
</script>

<style scoped>

</style>