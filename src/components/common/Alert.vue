<template>
  <v-overlay :opacity="0.75" v-model="$store.state.ui.alert.flag" :z-index="99999">

    <v-card elevation="0" color="#006064" min-width="300px" max-width="1000px" >
      <v-card-title>{{ $store.state.ui.alert.title }}</v-card-title>
      <v-card-text>{{ $store.state.ui.alert.message || '-' }}</v-card-text>
      <v-card-actions >
        <div style="display: flex;width: 100%;justify-content: center">
          <v-btn outlined @click="$store.commit('alertClose')">확인</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "alert",
}
</script>

<style scoped>

</style>