<template>
  <v-container>
    <v-card width="100%" elevation="0" outlined>

      <div class="pa-4">
        <admin-view-header :title="title" :site-map="['설정', siteMapDesc]" :show-div="false"/>
      </div>
      <router-view />
    </v-card>
  </v-container>
</template>

<script>
import AdminViewHeader from "@/components/common/title/AdminTitle";
export default {
  components: {AdminViewHeader},
  mounted() {
    console.log('this.$route.meta', this.$route.meta);
    this.title = this.$route.meta['title'] || '-';
    this.siteMapDesc = this.$route.meta['siteMap'] || '-';
  },
  data: ()=>({
    title: '-',
    siteMapDesc: '-'
  })
}
</script>

<style scoped>

</style>