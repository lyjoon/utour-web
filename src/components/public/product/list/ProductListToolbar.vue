<template>
  <div>
    <!--
    <div>
        <v-autocomplete v-model="query1"
                      label="선택가능한 국가, 도시지역"
                      color="blue-grey lighten-2"
                      multiple
                      filled
                      hide-details
                      dense
                      rounded
                      class="rounded-lg">
        <template v-slot:prepend-inner >
          <v-icon left>mdi-earth</v-icon>
        </template>
      </v-autocomplete>
    </div>
    <div class="d-flex pa-3">
      <v-autocomplete v-model="query2"
                      label="숙소, 키워드검색"
                      color="blue-grey lighten-2"
                      multiple
                      filled
                      dense
                      hide-details
                      rounded
                      class="rounded-lg">
        <template v-slot:prepend-inner >
          <v-icon left>mdi-magnify</v-icon>
        </template>
        <template v-slot:append-outer>
          <v-btn dark height="51px" color="red darken-2" class="v_btn_search rounded-lg" elevation="0" >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-autocomplete>
    </div>
    -->
    <div class="pt-8 pb-4">
      <strong class="text-h4">태국</strong>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query1: '',
      query2: ''
    }
  }
}
</script>

<style scoped>
</style>