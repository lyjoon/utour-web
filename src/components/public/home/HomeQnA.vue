<template>
  <div>
    <v-card-subtitle class="pl-2">
      <span style="font-size: 18px">질문과 답변</span>
    </v-card-subtitle>

    <v-card outlined>

      <v-card-actions>

    <v-list class="rounded flex-fill" >
      <v-list-item v-for="item in items" v-bind:key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
          <v-list-item-action-text>{{ item.contents }}</v-list-item-action-text>
          <v-divider class="mt-4 mx-auto" ></v-divider>
        </v-list-item-content>
      </v-list-item>

    </v-list>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {title:"견적문의 드립니다.", contents: "견적문의 드립니다."},
      {title:"몰디브 견적요청", contents: "견적문의 드립니다."},
      {title:"몰디브 4박견적", contents: "견적문의 드립니다."},
      {title:"착한요금 안내 도와드립니다.", contents: "견적문의 드립니다."},
      {title:"라스베가스 + LA 신혼여행.", contents: "견적문의 드립니다."},
    ]
  })
}
</script>

<style scoped>

</style>