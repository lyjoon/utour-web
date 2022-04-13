<template>
  <div>
    <v-list class="flex-fill mt-0" min-height="550px">

      <v-card v-if="items != null && items.length < 1" min-height="100px" elevation="0">
        <v-card-text class="d-flex flex-fill fill-height align-center justify-center mt-12">
          조회 결과가 없습니다.
        </v-card-text>
      </v-card>

      <template v-for="(item, index) in items">

        <v-list-item :key="index" class="pl-1 pr-1" link @click="view(item)">

          <v-list-item-avatar class="hidden-md-and-down">
            <v-avatar color="secondary"
                      class="white--text">
              <v-icon dark>mdi-card-text</v-icon>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <div class="subtitle-1">{{item.title}}</div>
            <v-list-item-subtitle class="caption">
              {{ item.writer }}
              <span class="mx-auto mr-1 ml-1 caption">|</span>
              {{ $moment(item['createAt']).format('YYYY.MM.DD') }}
              <span class="mx-auto mr-1 ml-1 caption">|</span>
              조회수 {{ item.pv }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-icon :small="$vuetify.breakpoint.smAndDown" color="grey" class="lighten-2">{{ item['privateYn'] == 'Y' ? 'mdi-lock' : 'mdi-lock-open-outline' }}</v-icon>

        </v-list-item>

        <v-divider :key="`dv-${index}`" :inset="!$vuetify.breakpoint.mdAndDown"  v-if="index < (items.length - 1)" />

      </template>
    </v-list>

    <secondary-divider />


    <v-layout column class="hidden-lg-and-up board_list_search_field">
      <v-flex>
        <div class="d-flex flex-fill justify-end mt-4 mb-4">
          <v-btn dark color="grey" class="darken-3" elevation="0" @click="edit">
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
        <div class="d-flex flex-fill mt-4 mb-4">
          <v-spacer />
          <v-btn dark color="grey" class="darken-3" elevation="0" @click="edit">
            <v-icon class="mr-1">mdi-playlist-edit</v-icon>
            <span>글작성</span>
          </v-btn>
        </div>
      </v-flex>

      <v-flex class="col-12">
        <div class="d-flex flex-fill justify-center">
          <v-pagination class="elevation-0"
              v-model="pagination.page"
              :length="pagination.pageCount">
          </v-pagination>
        </div>
      </v-flex>

      <v-flex class="col-3"></v-flex>
      <v-flex class="col-2">
        <v-select placeholder="검색항목" v-model="searchType" :items="searchTypes" hide-details dense outlined></v-select>
      </v-flex>
      <v-flex class="col-4 d-inline">
        <v-text-field dense hide-details placeholder="검색키워드" v-model="query" outlined @keyup.enter="search">
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
import QnaApi from "../../../api/QnaApi"
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
      page: 1,
      pageCount : null
    },
    searchTypes: ['제목+내용', '제목', '작성자', '내용'],
    searchType: '제목+내용',
    query:null,
    items: []
  }),
  mounted() {
    console.log(`limit : ${this.limit}`);
    this.search();
  },
  methods:{
    search: function (){
      // alert('준비중입니다.');
      QnaApi.getList(1, 20, this.searchType, this.query).then(res => {
        this.items = res.data.result;
        this.pagination.page = res.data.page;
        this.pagination.pageCount = res.data['pageCount'];
      });
    },
    edit: function(){
      this.$router.push("/qna/form");
    },
    view: function(item) {
      this.$router.push(`/qna/view?qnaId=${item.qnaId}`);
    }
  }
}
</script>

<style scoped>
</style>