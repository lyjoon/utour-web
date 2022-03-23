<template>
  <v-layout row>
    <v-flex class="d-flex col-12 flex-fill justify-end">

      <page-title title="호텔_숙소_개요" description="인천광역시 강화 화도면 해안남로 2683" />

      <v-spacer />

      <div class="hidden-md-and-down">
        <v-btn elevation="0" color="grey" class="lighten-2 grey--text text--darken-1" to="/products">
          <v-icon class="ma-0">mdi-dots-grid</v-icon>
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