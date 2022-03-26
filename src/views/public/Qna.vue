<template>
  <v-container>
    <div class="d-block">
      <div class="d-flex flex-fill align-end">
        <div class="d-flex">
          <page-title title="질문과 답변" description="ㅁㄴㅇㅁㄴㅇ" />
        </div>
        <v-spacer />
        <div class="d-flex grey--text text--darken-1 body-2 fill-height" >
          이용안내
        </div>
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