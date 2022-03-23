<template>
  <v-dialog fullscreen v-model="dialog" eager hide-overlay>
    <div class="white fill-height">

      <v-toolbar dense elevation="0" class="pa-0">
        <v-container fluid>
          <div class="d-flex flex-fill align-center">
            <v-toolbar-title>상품_이미지_제목</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="close" color="#999999" outlined tile class="rounded toolbar-btn-outlined" small>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-toolbar>

      <v-divider />

      <v-container>
        <v-row dense>

          <v-col class="col-12 hidden-lg-and-up">
            <v-img src="http://www.honeymoonlove.co.kr/resort_images/x_two-bedroom-oceanfront-pool-villa.jpg" height="50vh" />
            <div class="mt-4">
              <strong class="title">오션 프론트 풀빌라</strong>
              <div>전통주 바지락-칼국수 유니짜장면 돈까스 석쇠갈비 마파두부 고기국수 녹차케이크 피자 햄버거</div>
            </div>
            <div class="mt-4">
              <v-row dense>
                <v-col v-for="item in items" v-bind:key="item.id" class="col-2">
                  <v-img :src="item.src" height="50px" class="rounded" ></v-img>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col class="hidden-md-and-down col-8">
            <v-layout column>
              <v-flex>
                <v-img class="grey lighten-2 rounded" src="http://www.honeymoonlove.co.kr/resort_images/x_two-bedroom-oceanfront-pool-villa.jpg" height="500px"></v-img>
              </v-flex>
              <v-flex class="mt-6">
                <v-row dense>
                  <v-col v-for="item in items" v-bind:key="item.id" class="col-1">
                    <v-img :src="item.src" height="66px" class="rounded" ></v-img>
                  </v-col>
                </v-row>
              </v-flex>
            </v-layout>

          </v-col>

          <v-col class="hidden-md-and-down col-4 pl-4">
            <v-layout column>
              <v-flex>
                <strong class="title">오션 프론트 풀빌라</strong>
              </v-flex>
              <v-flex class="mt-6">
                전통주 바지락-칼국수 유니짜장면 돈까스 석쇠갈비 마파두부 고기국수 녹차케이크 피자 햄버거
              </v-flex>
            </v-layout>
          </v-col>
        </v-row>

      </v-container>

    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    items: [
        {id:1, src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-35.jpg", title: '로빈슨클럽'},
        {id:2, src:"http://www.honeymoonlove.co.kr/resort_images/deluxe-suite-king.jpg", title: '디럭스'},
        {id:3, src:"http://www.honeymoonlove.co.kr/resort_images/x_cafe.jpg", title: '카페'},
        {id:4, src:"http://www.honeymoonlove.co.kr/resort_images/x_deluxe-suite-king-living-area.jpg", title: '디렉서스윗'},
        {id:5, src:"http://www.honeymoonlove.co.kr/resort_images/x_events3.jpg", title: '이벤트홀'},
        {id:6, src:"http://www.honeymoonlove.co.kr/resort_images/x_two-bedroom-oceanfront-pool-villa.jpg", title: '오션 프론트 풀빌라'},
        {id:7, src:"http://www.honeymoonlove.co.kr/resort_images/oceanfront-pool-villa-1.jpg", title: '오션 프론트 풀빌라'},
        {id:8, src:"http://www.honeymoonlove.co.kr/resort_images/ocean-view-pool-villa-katiliya.jpg", title: '오션 프론트 풀빌라'},
        {id:9, src:"http://www.honeymoonlove.co.kr/resort_images/one-bedroom-oceanfront-pool-villa.jpg", title: '오션 프론트 풀빌라'},
        {id:10, src:"http://www.honeymoonlove.co.kr/resort_images/pool-suite.jpg", title: '풀스윗'},
        {id:11, src:"http://www.honeymoonlove.co.kr/resort_images/x_3319-54.jpg", title: '레스토랑'},
        {id:12, src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-21.jpg", title: '레스토랑'},
        {id:13, src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-24.jpg", title: '레스토랑'},
        {id:14, src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-26_0.jpg", title: '로빈슨클럽'},
        {id:15, src:"http://www.honeymoonlove.co.kr/resort_images/x_khao-lak-resort-pool10.jpg", title: '로빈슨클럽'},
        {id:16, src:"http://www.honeymoonlove.co.kr/resort_images/x_lagoon-villa-2.jpg", title: '로빈슨클럽'},
        {id:17, src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-35.jpg", title: '로빈슨클럽'},
    ]
  }),
  methods : {
    close : function (){
      this.dialog = false;
    },
    open: function (){
      this.dialog = true;
    }
  }
}
</script>

<style scoped>
  .toolbar-btn-outlined {
    border: 1px solid #c8c8c8;
  }
</style>