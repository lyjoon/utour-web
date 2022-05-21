<template>
  <v-container>
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-view-header title="공지사항 관리" :site-map="['게시판', '공지사항']" :show-div="false"/>
      </div>

      <router-view />
    </v-card>
  </v-container>
</template>

<script>
import AdminViewHeader from "@/components/common/title/AdminTitle";
export default {
  name: "AdminNotice",
  components: {AdminViewHeader},
}
</script>

<style scoped>

</style>