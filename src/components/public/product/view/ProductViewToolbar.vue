<template>
  <v-layout row>
    <v-flex class="d-flex col-12 flex-fill justify-end align-end">

      <page-title title="호텔_숙소_개요" description="인천광역시 강화 화도면 해안남로 2683" />

      <v-spacer />

      <div class="hidden-md-and-down">
        <v-btn elevation="0" color="grey" dark class="darken-3 body-2" to="/products">
          <v-icon class="mr-1" small >mdi-dots-grid</v-icon> 목록으로
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import PageTitle from "../../../common/PageTitle";
export default {
  components: {PageTitle}
}
</script>

<style scoped>

</style>