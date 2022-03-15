<template>
  <v-row dense>
    <v-col class="col-6">
      <v-img :src="images[0]"
             :height="mainImageHeight" />
    </v-col>
    <v-col class="col-3">
      <v-img :src="images[1]"
             :height="subImageHeight" />
      <v-img :src="images[2]"
             class="mt-2"
             :height="subImageHeight" />
    </v-col>
    <v-col class="col-3">
      <v-img :src="images[3]"
             :height="subImageHeight"
             position="0 auto" />
      <v-img :src="images[4]"
             class="mt-2"
             :height="subImageHeight"
             position="0 auto" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HotelImage",
  computed: {
    mainImageHeight() {
      return 510 + 'px';
    },
    subImageHeight() {
      return 250 + 'px';
    }
  },
  data: ()=>({
    images: ["https://s3.ap-northeast-2.amazonaws.com/stone-i-dagym-centers/images/gyms/15f8f9274132f60b1d/Big)Shingu.jpg"
      , "https://www.helssg.com/design/upload_file/BD268173/THUMBNAIL_1500_1500_c1222894c7a9e92e5720582b6dbfd55c_8407_3.jpeg"
      , "https://s3.ap-northeast-2.amazonaws.com/refreshclub/cache/50/b9/50b99ab60174ace81381a3ae6a7f457d.jpg"
      , "http://img3.tmon.kr/cdn3/deals/2019/04/24/1989097598/original_1989097598_front_0b1f9_1556091307production.jpg"
      , "https://s3.ap-northeast-2.amazonaws.com/refreshclub/cache/29/22/2922a6b683e0775427d1b30070428ac7.jpg"
    ]
  })
}
</script>

<style scoped>

</style>