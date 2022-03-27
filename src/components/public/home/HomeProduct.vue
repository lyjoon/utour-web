<template>
  <v-row dense>
    <v-col class="col-12">
      <sub-title title="자주 찾는 상품" description="봉선생님께서 추천하는 여행상품" />
    </v-col>
    <v-col class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4"
           v-for="item in dataList" v-bind:key="item.title">
      <product-item :title="item.title" :description="item.desc" :src="item.src" />
    </v-col>
  </v-row>
</template>

<script>
import ProductItem from "../product/list/ProductListItem";
import SubTitle from "../../common/SubTitle";
export default {
  name: "HomeProduct",
  components: {SubTitle, ProductItem},
  data : ()=>({
    dataList : [
      {
        title: '로빈슨클럽(CLUB)',
        desc: '카오락',
        src: 'http://www.honeymoonlove.co.kr/resort_images/x_khao-lak-resort-pool10.jpg',
      },
      {
        title: '노쿠 아일랜드',
        desc: '수상비행기',
        src: 'http://www.honeymoonlove.co.kr/resort_images/NM_Aerial-07.jpg'
      },
      {
        title: '인아야 푸트리 발리',
        desc: '발리',
        src: 'https://t4.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2UUt/image/-qXunTs8JxA83Ec1FaCN-L7aMKY'
      },
      {
        title: '디스커버리 까르띠까 플라자 호텔',
        desc: '발리',
        src: 'http://www.honeymoonlove.co.kr/resort_images/4_14.jpg'
      },
      {
        title: '유앤미 바이 코쿤',
        desc: '수상비행기',
        src: 'http://www.honeymoonlove.co.kr/resort_images/PV%20-%202%20EX.jpg'
      },
      {
        title: '그랜드파크 로얄',
        desc: '로스카보스',
        src: 'http://www.honeymoonlove.co.kr/resort_images/_MG_0612.jpg'
      }
    ]
  })
}
</script>

<style scoped>

</style>