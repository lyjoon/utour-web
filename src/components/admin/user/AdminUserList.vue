<template>
  <div class="pa-4">

    <!-- 검색영역 -->
    <div class="pt-4 pb-4">
      <v-row no-gutters class="align-end">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '12':'4'" >
          <div class="body-1">전체 {{pagination.count }}건 / {{ pagination.pageCount }} 페이지</div>
        </v-col>

        <v-col :cols="$vuetify.breakpoint.smAndDown ? '12':'8'" :class="$vuetify.breakpoint.smAndDown ? 'mt-2' : ''" >
          <div class="d-flex flex-fill justify-end">
            <div class="d-flex ml-1" style="width: 250px;">
              <v-text-field placeholder="검색어" v-model="query" label="검색어" outlined hide-details dense @keyup.enter="searchQuery" />
            </div>
            <div class="d-flex ml-1">
              <v-btn color="deep-orange darken-2" height="39px" elevation="0" dark @click="searchQuery">검색</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- 데이터 목록(md 이상) -->
    <div>

      <v-divider />

      <v-simple-table fixed-header class="hidden-md-and-down">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left body-1 font-weight-bold">ID</th>
              <th class="text-center body-1 font-weight-bold">이름</th>
              <th class="text-center body-1 font-weight-bold">사용여부</th>
              <th class="text-center body-1 font-weight-bold">등록일</th>
              <th class="text-center body-1 font-weight-bold">action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="results != null && results.length < 1">
              <td colspan="5" class="text-center">
                조회 결과가 없습니다.
              </td>
            </tr>
            <tr v-for="(item, index) in results" :key="index" :class="item['useYn'] != 'Y' ? `grey lighten-4 `:``" >
              <td class="text-center body-2" v-text="item['userId']"></td>
              <td class="text-left body-2" v-text="item['name']"></td>
              <td class="text-center body-2">
                <v-chip dark class="pa-1 rounded caption" small :color="item['useYn'] == 'Y' ? 'green lighten-1' : 'deep-orange darken-2'" v-text="item['useYn'] == 'Y' ? '사용':'사용안함'" />
              </td>
              <td class="text-center body-2" v-text="$moment(item['createAt']).format('YYYY.MM.DD')"></td>
              <td class="text-center body-2">
                <v-icon small class="mr-2">mdi-pencil</v-icon>
                <v-icon small>mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-list class="flex-fill hidden-md-and-up">
        <v-card v-if="results != null && results.length < 1" min-height="100px" elevation="0">
          <v-card-text class="d-flex flex-fill fill-height align-center justify-center mt-12">
            조회 결과가 없습니다.
          </v-card-text>
        </v-card>

        <template v-for="(item, index) in results">

          <v-list-item :key="index" link :class="`pl-1 pr-1 ${item['useYn'] != 'Y' ? `grey lighten-4 `:``}`" >

            <v-list-item-content>
              <div class="subtitle-1" v-text="item['userId']" />
              <v-list-item-subtitle class="caption">
                {{ item['name'] }}
                <span class="mx-auto mr-1 ml-1 caption">|</span>
                {{ $moment(item['createAt']).format('YYYY.MM.DD') }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-icon v-if="item['useYn'] == 'Y'" color="grey" class="lighten-2">mdi-file-check</v-icon>

          </v-list-item>

          <v-divider :key="`dv-${index}`" v-if="index < (results.length - 1)" />

        </template>

      </v-list>

      <v-divider />
    </div>

    <!-- 페이징 -->
    <div class="pt-6 pb-12">
      <v-pagination class="elevation-0"
                    v-model="pagination.page"
                    @input="setPage"
                    color="deep-orange darken-2"
                    :length="paginationLimit">
      </v-pagination>
    </div>
  </div>
</template>

<script>

import userApi from "@/api/UserApi";

export default {
  mounted() {
    this.search();
  },
  computed:{
    paginationLimit (){
      return this.pagination.pageCount > 5 ? 5 : this.pagination.pageCount;
    },
  },
  data: () =>({
    pagination: {
      page: 1,
      pageCount : 1,
      count: 0,
      limit: 20
    },
    query:null,
    results:[],
  }),
  methods: {
    setPage: function(p){
      this.pagination.page = p;
      this.search();
    },
    searchQuery: function(){
      this.pagination.page = 1;
      this.search();
    },
    search: function(){
      userApi.getList(this.pagination.page, this.pagination.limit, this.query)
          .then(res => {
        this.results = res.data.result;
        this.pagination.page = res.data.page;
        this.pagination.count = res.data.count;
        this.pagination.pageCount = res.data.pageCount;
      })
    },
  }
}
</script>

<style scoped>
</style>