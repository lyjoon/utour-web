<template>
  <div>

    <v-list class="flex-fill mt-0 hidden-lg-and-up" >

      <template v-for="(item, index) in items">

        <v-list-item :key="index" class="pl-1 pr-1" link to="/notice/123" style="background-color: white">

          <v-list-item-avatar class="pa-0" >
            <div class="body-2" v-if="!item.isNotice">{{index}}</div>
            <v-chip v-if="item.isNotice" dark outlined color="secondary" small class="d-flex justify-center align-center pa-2 caption">공지</v-chip>
          </v-list-item-avatar>

          <v-list-item-content class="">
            <div class="subtitle-1">{{item.title}}</div>
            <v-list-item-subtitle class="caption">
              {{ item.writer }}
              <span class="mx-auto mr-1 ml-1 caption">|</span>
              {{ item.createAt }}
              <span class="mx-auto mr-1 ml-1 caption">|</span>
              조회수 {{ item.pv }}
            </v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>

        <v-divider :key="`dv-${index}`" v-if="index < (items.length - 1)" />
      </template>
    </v-list>

    <v-simple-table fixed-header class="hidden-md-and-down">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-center">
            No
          </th>
          <th class="text-left">
            제목
          </th>
          <th class="text-left">
            작성자
          </th>
          <th class="text-left">
            작성일
          </th>
          <th class="text-left">
            조회수
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in items" :key="index" :class="item.isNotice ? `grey lighten-4 `:``">
          <td class="text-center">
            <span v-if="!item.isNotice" >{{ index }}</span>
            <v-chip v-if="item.isNotice" dark outlined color="secondary" small class="caption ma-0 pl-2 pr-2">공지</v-chip>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.writer }}</td>
          <td>{{ item.createAt }}</td>
          <td>{{ item.pv }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <secondary-divider />

    <v-layout column class="hidden-lg-and-up mt-2 board_list_search_field">
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
      {title:"몰디브 도착 및 입국 시 코로나PCR 음성결과서 필수!!", writer:"삐리리김", isNotice:true, createAt:"12:20", pv:12},
      {title:"5월5일 부터 COVID-19 백신 접종 완료 자 해외여행 후 입국시 2주 자가격리 면제", writer:"삐리리김", isNotice:true, createAt:"1:33", pv:2},
      {title:"AM항공 미 파산법원 Proof of claim 관련 요청사항 - 3/3", writer:"삐리리김", isNotice:true, createAt:"2022-03-25", pv:66},
      {title:"[COVID-19] (중요) 해외입국 내국인 PCR 음성확인서 제출 의무화 시행(2.24 시행)",writer:"삐리리김", isNotice:false, createAt:"2022-03-22", pv:12},
      {title:"2021년 설연휴 공지드립니다.(21.2.10-2.14)", writer:"삐리리김", isNotice:false, createAt:"2022-03-21", pv:44},
      {title:"★★중요공지! AEROMEXICO 바우처 신청(22/01/18까지)★★", writer:"삐리리김", isNotice:false, createAt:"2022-03-20", pv:12},
      {title:"중요공지! AEROMEXICO 바우처 신청(21/11/30까지)", writer:"삐리리김", isNotice:false, createAt:"2022-03-18", pv:88},
      {title:"[몰디브 코로나19소식] 몰디브 COVID-19 백신 접종 시작", writer:"삐리리김", isNotice:false, createAt:"2022-03-17", pv:4},
      {title:"러시아 출국제한안내", writer:"삐리리김", isNotice:false, createAt:"2022-03-18", pv:0},
      {title:"우크라이나 출국제한안내", writer:"삐리리김", isNotice:false, createAt:"2022-03-18", pv:21},
      {title:"중국 출국제한안내", writer:"삐리리김", isNotice:false, createAt:"12:20", pv:12},
      {title:"필리핀 출국제한 헤제안내", writer:"삐리리김", isNotice:false, createAt:"1:33", pv:2},
      {title:"몰디브 4박견적", writer:"김효진", isNotice:false, createAt:"2022-03-25", pv:66},
      {title:"2022년 2월 하와이 알로하 뉴스레터", writer:"삐리리김", isNotice:false, createAt:"2022-03-22", pv:12},
      {title:"2022년 1월 하와이 알로하 뉴스레터", writer:"삐리리김", isNotice:false, createAt:"2022-03-21", pv:44},
      {title:"2021년 12월 하와이 알로하 뉴스레터", writer:"삐리리김", isNotice:false, createAt:"2022-03-20", pv:12},
      {title:"2022년 11월 하와이 알로하 뉴스레터", writer:"삐리리김", isNotice:false, createAt:"2022-03-18", pv:88},
      {title:"홈페이지 개편", writer:"삐리리김", isNotice:false, createAt:"2022-03-17", pv:4},
      {title:"사무실 개편안내", writer:"삐리리김", isNotice:false, createAt:"2022-03-18", pv:0},
      {title:"몰디브 비상사태 관련 아야다 공문", writer:"삐리리김", isNotice:false, createAt:"2022-03-18", pv:21},
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