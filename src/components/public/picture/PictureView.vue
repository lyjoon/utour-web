<template>

  <v-card elevation="0">
    <v-card-title class="pb-0 pt-0">
      <v-container class="mx-auto" fluid >
        <div class="d-flex">
          <div class="title d-flex" style="line-height: 36px">상품_이미지_제목</div>
          <v-spacer />
          <v-btn class="d-flex rounded" v-on:click="close()" outlined tile icon >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-card-title>

    <v-divider />

    <v-card-text class="mt-6 text">
      <v-container>
        <v-row dense>
          <v-col class="col-8">
            <v-layout column>
              <v-flex>
                <v-img class="grey lighten-2 rounded" src="http://www.honeymoonlove.co.kr/resort_images/x_two-bedroom-oceanfront-pool-villa.jpg" height="500px"></v-img>
              </v-flex>
              <v-flex class="mt-6">
                <v-row dense>
                  <v-col v-for="item in items" v-bind:key="item.title" class="col-1">
                    <v-img :src="item.src" height="66px" class="rounded" ></v-img>
                  </v-col>
                </v-row>
              </v-flex>
            </v-layout>

          </v-col>

          <v-col class="col-4 pl-4">
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-35.jpg", title: '로빈슨클럽'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/deluxe-suite-king.jpg", title: '디럭스'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_cafe.jpg", title: '카페'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_deluxe-suite-king-living-area.jpg", title: '디렉서스윗'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_events3.jpg", title: '이벤트홀'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_two-bedroom-oceanfront-pool-villa.jpg", title: '오션 프론트 풀빌라'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/oceanfront-pool-villa-1.jpg", title: '오션 프론트 풀빌라'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/ocean-view-pool-villa-katiliya.jpg", title: '오션 프론트 풀빌라'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/one-bedroom-oceanfront-pool-villa.jpg", title: '오션 프론트 풀빌라'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/pool-suite.jpg", title: '풀스윗'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_3319-54.jpg", title: '레스토랑'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-21.jpg", title: '레스토랑'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-24.jpg", title: '레스토랑'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-26_0.jpg", title: '로빈슨클럽'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_khao-lak-resort-pool10.jpg", title: '로빈슨클럽'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_lagoon-villa-2.jpg", title: '로빈슨클럽'},
        {src:"http://www.honeymoonlove.co.kr/resort_images/x_3370-35.jpg", title: '로빈슨클럽'},
    ]
  }),
  methods : {
    close : function (){
      //this.$refs.frm.reset();
      this.$emit('close');
      console.log('close-s')
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>