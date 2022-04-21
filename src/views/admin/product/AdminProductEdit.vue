<template>
  <v-container>

    <v-card elevation="0">
      <v-card-title>기본개요</v-card-title>
      <v-card-text>
        <admin-product-basic />
      </v-card-text>
    </v-card>


    <!-- 호텔타입이면 열림 -->
    <v-card elevation="0" class="mt-4">
      <v-card-title>숙소정보</v-card-title>
      <v-card-text>
        <v-layout column>
          <v-row dense>
            <v-col class="col-6"></v-col>
            <v-col class="col-6"></v-col>
            <v-col class="col-6"></v-col>
            <v-col class="col-6"></v-col>
          </v-row>
        </v-layout>
        <div>
        </div>
      </v-card-text>
    </v-card>

    <!-- 호텔타입이면 열림 -->
    <v-card elevation="0" class="mt-4">
      <v-card-title>텍스트 요소</v-card-title>
      <v-card-text>
        <v-layout column>
          <v-flex>
            <v-text-field type="text" placeholder="구성요소 제목" dense hide-details filled rounded class="rounded"></v-text-field>
          </v-flex>
          <v-flex class="mt-2">
            <v-textarea no-resize hide-details dense rows="5" filled rounded class="rounded"></v-textarea>
          </v-flex>
        </v-layout>
        <div>
        </div>
      </v-card-text>
    </v-card>

    <v-card elevation="0" class="mt-4">
      <v-card-title>이미지</v-card-title>
      <v-card-text>
        ㅇㅇㅇ
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script>
import AdminProductBasic from "@/components/admin/product/AdminProductBasic";
export default {
  name: "AdminProductEdit",
  components: {AdminProductBasic}
}
</script>

<style scoped>

</style>