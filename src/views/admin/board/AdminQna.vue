<template>
  <v-container>
    <v-card width="100%" elevation="0">

      <div class="pa-4">
        <admin-view-header title="질문과 답변" :site-map="['게시판', 'Q&A']" :show-div="true"/>
      </div>

      <router-view />
    </v-card>
  </v-container>
</template>

<script>
import AdminViewHeader from "@/components/common/title/AdminTItle";
export default {
  name: "AdminQna",
  components: {AdminViewHeader},
}
</script>

<style scoped>

</style>