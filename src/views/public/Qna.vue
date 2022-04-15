<template>
  <v-container>
    <div class="d-flex flex-fill align-end">
      <div class="d-flex">
        <page-title title="질문과 답변" description="여행에 관한 질문을 남겨주시면 답변드림" />
      </div>
      <v-spacer />
      <div class="d-flex grey--text text--darken-1 caption fill-height" >
        이용안내(준비중)
      </div>
    </div>
    <secondary-divider />
    <router-view />
  </v-container>
</template>
<script>

import PageTitle from "../../components/common/PageTitle";
import SecondaryDivider from "@/components/common/SecondaryDivider";
export default {

  components: {SecondaryDivider, PageTitle}
}
</script>

<style scoped>

</style>