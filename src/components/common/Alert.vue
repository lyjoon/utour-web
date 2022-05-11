<template>
  <v-overlay :opacity="0.75" v-model="$store.state.ui.alert.flag" :z-index="99999">
    <v-card elevation="0" color="#039BE5" min-width="300px" max-width="500px" >
      <v-card-title v-if="!!$store.state.ui.alert.title" class="body-1">{{ $store.state.ui.alert.title }}</v-card-title>
      <v-card-text class="body-2">{{ $store.state.ui.alert.message || '-' }}</v-card-text>
      <v-card-actions >
        <div style="display: flex;width: 100%;justify-content: center">
          <v-btn elevation="0" color="#1565C0" style="color: #ffffff" @click="$store.commit('alertClose')">확인</v-btn>
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