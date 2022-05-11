<template>
  <v-overlay :opacity="0.75" v-model="$store.state.ui.confirm.flag" :z-index="99999">
    <v-card elevation="0" color="#039BE5" min-width="300px" max-width="500px" >
      <v-card-title v-if="!!$store.state.ui.confirm.title" class="body-1">{{ $store.state.ui.confirm.title }}</v-card-title>
      <v-card-text class="body-2">{{ $store.state.ui.confirm.message || '-' }}</v-card-text>
      <v-card-actions >
        <div style="display: flex;width: 100%;justify-content: center;">
          <v-btn elevation="0" color="#1565C0" style="color: #ffffff;margin-right: 10px;" @click="$store.commit('confirmOk')">확인</v-btn>
          <v-btn elevation="0" color="#1565C0" style="color: #ffffff" @click="$store.commit('confirmOk')">취소</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>