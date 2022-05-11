<template>
  <v-container>
    <v-card width="100%" elevation="0">

      <div class="pa-4">
        <admin-view-header title="사용자 관리" :site-map="['설정', '사용자']" :show-div="false"/>
      </div>

      <router-view />
    </v-card>
  </v-container>
</template>

<script>
import AdminViewHeader from "@/components/common/title/AdminTItle";
export default {
  components: {AdminViewHeader},
}
</script>

<style scoped>

</style>