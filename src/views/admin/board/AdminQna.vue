<template>
  <v-container class="px-0">
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-view-header title="질문과 답변" :site-map="['게시판', 'Q&A']" :show-div="false"/>
      </div>

      <router-view />
    </v-card>
  </v-container>
</template>

<script>
import AdminViewHeader from "@/components/common/title/AdminTitle";
export default {
  name: "AdminQna",
  components: {AdminViewHeader},
}
</script>

<style scoped>

</style>