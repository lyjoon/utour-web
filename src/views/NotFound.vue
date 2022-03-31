<template>
  <v-app class="main-app">
    <v-toolbar dense elevation="0" app
               fixed
               outlined
               color="inherit"
               class="grey--text text--darken-1"
               height="70px">
      <v-container class="pa-2">
        <v-toolbar-title class="font-size-24 font-montserrat-300">U-TOUR</v-toolbar-title>
      </v-container>
    </v-toolbar>
    <v-main>
      <v-container>
        <v-layout row wrap>
          <v-flex class="mx-auto justify-center">
            <v-card rounded elevation="1" class="mt-8 pa-5">
              <v-card-title class="font-montserrat-300">Not Found</v-card-title>
              <v-card-subtitle class="mt-5">
                페이지를 찾을 수 없습니다.
              </v-card-subtitle>
              <v-card-text class="body-2">
                요청 페이지의 주소가 잘못 입력되었거나 URL 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
              </v-card-text>

              <v-card-actions class="pa-5">
                <a href="javascript:history.back()" class="hist_back">뒤로가기</a>
              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: "NotFound",
}
</script>

<style scoped>
  .main-app {
    background-color: #f2f1f2;
  }

  .container {
    min-width: 1280px !important;
    max-width: 1280px !important;
  }

  .hist_back {
    text-decoration: underline !important;
    color: #0260d4 !important;;
  }

</style>