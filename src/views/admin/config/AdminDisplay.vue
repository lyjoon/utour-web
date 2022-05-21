<template>
  <v-container>
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-title title="메인화면구성" :site-map="['설정', '메인화면구성']" :show-div="false"/>
      </div>

      <router-view />
    </v-card>
  </v-container>
</template>

<script>
import AdminTitle from "@/components/common/title/AdminTitle";
export default {
  components: {AdminTitle},
}
</script>

<style scoped>

</style>