<template>
  <div>

    <scope-title title="질문과 답변" />

    <v-list class="flex-fill" >

      <template v-for="(item, index) in items">

        <v-list-item :key="index">

          <v-list-item-avatar>
            <v-avatar color="secondary"
                      class="white--text">김</v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
            <v-list-item-subtitle>{{ item.contents }}</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>

        <v-divider :key="index" inset />

      </template>
    </v-list>
  </div>
</template>

<script>
import ScopeTitle from "../../common/ScopeTitle";
export default {
  components: {ScopeTitle},
  data: () => ({
    items: [
      {title:"견적문의 드립니다.", contents: "견적문의 드립니다."},
      {title:"몰디브 견적요청", contents: "견적문의 드립니다."},
      {title:"몰디브 4박견적", contents: "견적문의 드립니다."},
      {title:"착한요금 안내 도와드립니다.", contents: "견적문의 드립니다."},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다."},
      {title:"착한요금 안내 도와드립니다.", contents: "견적문의 드립니다."},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다."},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다."},
      {title:"착한요금 안내 도와드립니다.", contents: "견적문의 드립니다."},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다."},
    ]
  })
}
</script>

<style scoped>

</style>