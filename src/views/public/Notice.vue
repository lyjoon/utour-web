<template>
  <v-container>
    <div class="d-block">
      <div class="d-flex flex-fill align-end">
        <div class="d-flex">
          <page-title title="공지사항" description="" />
        </div>
        <v-spacer />
      </div>
      <secondary-divider />
    </div>

    <router-view />
  </v-container>
</template>

<script>

import PageTitle from "../../components/common/PageTitle";
import SecondaryDivider from "../../components/common/SecondaryDivider";
export default {
  components: {SecondaryDivider, PageTitle}
}
</script>

<style scoped>

</style>