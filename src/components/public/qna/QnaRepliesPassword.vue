<template>
  <v-text-field type="password" dense outlined v-model="password" background-color="white"
                hide-details
                placeholder="비밀번호">
  </v-text-field>
</template>

<script>
export default {
  name: "QnaRepliesPassword",
  props:{
  },
  data:() =>({
    password:null
  })
}
</script>

<style scoped>

</style>