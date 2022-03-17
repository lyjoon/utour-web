<template>
  <v-layout column class="fill-height">
    <v-toolbar>
      <v-toolbar-title>상품_이미지_제목</v-toolbar-title>
      <v-spacer />
      <v-btn v-on:click="close()" icon >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
  </v-layout>
</template>

<script>
export default {
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