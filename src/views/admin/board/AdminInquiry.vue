<template>
  <v-container>
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-view-header title="여행 및 견적문의" :site-map="['게시판', '여행/견적문의']" :show-div="false"/>
      </div>

      <router-view />
    </v-card>
  </v-container>
</template>

<script>
import AdminViewHeader from "@/components/common/title/AdminTitle";
export default {
  name: "AdminInquiry",
  components: {AdminViewHeader},
}
</script>

<style scoped>

</style>