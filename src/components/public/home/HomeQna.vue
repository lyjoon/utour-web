<template>
  <div>

    <sub-title title="질문과 답변" />

    <v-list class="flex-fill" >

      <template v-for="(item, index) in items">

        <v-list-item :key="index" class="" link to="/qna/123">

          <v-list-item-avatar >
            <v-avatar color="secondary"
                      class="white--text">
              <v-icon dark>mdi-card-text</v-icon>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
            <v-list-item-subtitle class="caption">
              {{ item.writer }}
              <span class="mx-auto mr-1 ml-1 caption">|</span>
              {{ item.createAt }}
              <span class="mx-auto mr-1 ml-1 caption">|</span>
              조회수 {{ item.pv }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-icon small color="grey" class="lighten-2">mdi-lock</v-icon>

        </v-list-item>

        <v-divider :key="`div-${index}`" :inset="!$vuetify.breakpoint.mdAndDown"  />

      </template>
    </v-list>
  </div>
</template>

<script>
import SubTitle from "../../common/SubTitle";
export default {
  components: {SubTitle},
  data: () => ({
    items: [
      {title:"견적문의 드립니다.", contents: "견적문의 드립니다.", writer:"홍길동", createAt:"12:20", pv:12},
      {title:"몰디브 견적요청", contents: "견적문의 드립니다.", writer:"차인표", createAt:"1:33", pv:2},
      {title:"몰디브 4박견적", contents: "견적문의 드립니다.", writer:"김효진", createAt:"2022-03-25", pv:66},
      {title:"착한요금 안내 도와드립니다.", contents: "견적문의 드립니다.", writer:"ㅁㄴㅇ", createAt:"2022-03-22", pv:12},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다.", writer:"삐리리김", createAt:"2022-03-21", pv:44},
      {title:"착한요금 안내 도와드립니다.", contents: "견적문의 드립니다.", writer:"ㅁㄴㅇ", createAt:"2022-03-20", pv:12},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다.", writer:"삐리리김", createAt:"2022-03-18", pv:88},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다.", writer:"삐리리김", createAt:"2022-03-17", pv:4},
      {title:"착한요금 안내 도와드립니다.", contents: "견적문의 드립니다.", writer:"ㅁㄴㅇ", createAt:"2022-03-18", pv:0},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다.", writer:"삐리리김", createAt:"2022-03-18", pv:21},
    ]
  })
}
</script>

<style scoped>

</style>