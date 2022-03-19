<template>
  <!-- 상품 -->
  <v-card>
    <v-list>
      <v-subheader>
        <v-list-item-title>상품관리</v-list-item-title>
      </v-subheader>

      <div class="pr-3 pl-3 mt-2 mb-4">
        <v-divider class="mx-auto" />
      </div>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="secondary">mdi-warehouse</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>호텔</v-list-item-title>
          <v-list-item-subtitle>국내외 숙박시설</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="pr-4">
          <v-list-item-action-text><v-chip color="secondary" small dark link to="/admin/hotel" >관리</v-chip></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>

    </v-list>
  </v-card>

</template>

<script>
export default {
}
</script>

<style scoped>

</style>