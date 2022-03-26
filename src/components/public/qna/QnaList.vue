<template>
  <div>

    <v-list class="flex-fill mt-0" >

      <template v-for="(item, index) in items">

        <v-list-item :key="index" class="" link to="/qna/123">

          <v-list-item-avatar class="hidden-md-and-down">
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

        <v-divider :key="`dv-${index}`" :inset="!$vuetify.breakpoint.mdAndDown"  v-if="index < (items.length - 1)" />

      </template>
    </v-list>

    <secondary-divider />


    <v-layout column class="hidden-lg-and-up board_list_search_field">
      <v-flex>
        <div class="d-flex flex-fill justify-start mt-2 mb-4">
          <v-btn dark color="grey" class="darken-3" elevation="0">
            <v-icon class="mr-1">mdi-playlist-edit</v-icon>
            <span>글작성</span>
          </v-btn>
        </div>
      </v-flex>
      <v-flex>
        <v-pagination class="elevation-0"
                      v-model="pagination.page"
                      :length="10">
        </v-pagination>
      </v-flex>
      <v-flex>
        <div class="d-flex flex-fill mt-4 pa-2">
          <div class="d-flex mr-2" style="width: 18vh">
            <v-select placeholder="검색항목" class="body-2" v-model="searchType" :items="searchTypes" hide-details dense outlined></v-select>
          </div>
          <div class="d-flex flex-fill">
            <v-text-field hide-details dense class="body-2" placeholder="검색키워드" outlined @keyup.enter="search">
              <template v-slot:append>
                <v-icon @click="search">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </div>
        </div>
      </v-flex>

    </v-layout>

    <v-layout row wrap class="hidden-md-and-down board_list_search_field">
      <v-flex class="col-12">
        <div class="d-flex flex-fill mt-3">
          <v-spacer />
          <v-btn dark color="grey" class="darken-3" elevation="0">
            <v-icon class="mr-1">mdi-playlist-edit</v-icon>
            <span>글작성</span>
          </v-btn>
        </div>
      </v-flex>
      <v-flex class="col-12">
        <div class="d-flex flex-fill justify-center">
          <v-pagination class="elevation-0"
              v-model="pagination.page"
              :length="10">
          </v-pagination>
        </div>
      </v-flex>
      <v-flex class="col-3"></v-flex>
      <v-flex class="col-2">
        <v-select placeholder="검색항목" v-model="searchType" :items="searchTypes" hide-details dense outlined></v-select>
      </v-flex>
      <v-flex class="col-4 d-inline">
        <v-text-field dense hide-details placeholder="검색키워드" outlined @keyup.enter="search">
          <template v-slot:append>
            <v-icon @click="search">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-flex>
      <v-flex class="col-3"></v-flex>
    </v-layout>


  </div>
</template>

<script>
import SecondaryDivider from "../../common/SecondaryDivider";
export default {
  components: {SecondaryDivider},
  props:{
    limit: {
      type: Number,
      default : 20
    }
  },
  data: ()=> ({
    pagination: {
      page: 6,
      startPage: 1,
      endPage : 10
    },
    searchTypes: ['제목+내용', '제목', '작성자', '내용'],
    searchType: '제목+내용',
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
  }),
  mounted() {
    console.log(`limit : ${this.limit}`);
  },
  methods:{
    search: function (){
      alert('준비중입니다.');
    }
  }
}
</script>

<style scoped>
</style>