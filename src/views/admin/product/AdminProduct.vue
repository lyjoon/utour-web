<template>
  <v-container>
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-title title="여행컨텐츠" :site-map="['관리', '여행컨텐츠']" :show-div="false"/>
      </div>

      <router-view />
    </v-card>
  </v-container>
</template>

<script>
import AdminTitle from "@/components/common/title/AdminTitle";
export default {
  name: "AdminNotice",
  components: {AdminTitle},
}
</script>

<style scoped>

</style>