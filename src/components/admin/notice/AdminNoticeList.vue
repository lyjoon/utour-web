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
            <div class="d-flex" style="width: 150px">
              <v-select placeholder="검색항목" class="body-2"
                        v-model="queryType"
                        :items="queryTypeItems"
                        item-text="text"
                        item-value="value"
                        hide-details dense outlined></v-select>
            </div>
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
          <colgroup>
            <col style="width: 100px" />
            <col  />
            <col style="width: 120px" />
            <col style="width: 80px" />
            <col style="width: 120px" />
          </colgroup>
          <thead>
          <tr>

            <th class="text-center body-1 font-weight-bold">no</th>
            <th class="text-left body-1 font-weight-bold">제목</th>
            <th class="text-center body-1 font-weight-bold">첨부</th>
            <th class="text-center body-1 font-weight-bold">등록일</th>
            <th class="text-center body-1 font-weight-bold">actions</th>
          </tr>
          </thead>
          <tbody>

            <tr v-if="results != null && results.length < 1">
              <td colspan="5" class="text-center">
                조회 결과가 없습니다.
              </td>
            </tr>

            <tr v-for="(item, index) in results" :key="index" :class="item.noticeYn == 'Y' ? `grey lighten-4 `:``" >
              <td class="text-center body-2">
                <v-chip v-if="item.noticeYn == 'Y'" small class="pa-1 rounded" outlined color="deep-orange">공지</v-chip>
                <span v-if="item.noticeYn != 'Y'">{{item.noticeId}}</span>
              </td>
              <td class="text-left body-2">
                <router-link class="text-decoration-underline" :to="`/admin/notice/${item.noticeId}`">{{ item.title }} </router-link>
              </td>
              <td class="text-center body-2">
                <v-icon small v-if="item.attachment">mdi-file-check</v-icon>
                <span v-if="!item.attachment">-</span>
              </td>
              <td class="text-center body-2">
                {{ $moment(item['createAt']).format('YYYY.MM.DD') }}
              </td>
              <td class="text-center body-2">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)">
                  mdi-pencil
                </v-icon>

                <v-icon
                    small
                    @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
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

          <v-list-item :key="index" link :to="`/admin/notice/${item.noticeId}`" :class="`pl-1 pr-1 ${item.noticeYn == 'Y' ? `grey lighten-4 `:``}`" >

            <v-list-item-content>
              <div class="subtitle-1">
                <v-chip v-if="item.noticeYn == 'Y'" dark color="secondary" small class="rounded caption pa-1">공지</v-chip>
                {{ item.title }}
              </div>
              <v-list-item-subtitle class="caption">
                {{ item.writer || '관리자'}}
                <span class="mx-auto mr-1 ml-1 caption">|</span>
                {{ $moment(item['createAt']).format('YYYY.MM.DD') }}
                <span class="mx-auto mr-1 ml-1 caption">|</span>
                조회수 {{ item.pv }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-icon v-if="item.attachment" color="grey" class="lighten-2">mdi-file-check</v-icon>

          </v-list-item>

          <v-divider :key="`dv-${index}`" v-if="index < (results.length - 1)" />

        </template>

      </v-list>

      <v-divider />
    </div>


    <!-- 하단 actions -->
    <div class="pt-4 pb-4">
      <div class="justify-end flex-fill d-flex">
        <v-btn color="blue-grey lighten-2" dark elevation="0" @click="$router.push('/admin/notice/edit')">
          <v-icon small class="mr-1">mdi-content-save</v-icon> 등록
        </v-btn>
      </div>
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

import noticeApi from "@/api/NoticeApi";

export default {
  mounted() {
    this.search();
  },
  computed:{
    paginationLimit (){
      return this.pagination.pageCount > 5 ? 5 : this.pagination.pageCount;
    }
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
    queryTypeItems: [
      {value:'ALL', text:'제목+내용'},
      {value:'TITLE', text:'제목'},
      {value:'WRITER', text:'작성자'},
      {value:'CONTENT', text:'내용'},
    ],
    queryType: {value:'ALL', text:'제목+내용'},
  }),
  methods: {
    setPage: function(p){
      this.pagination.page = p;
      this.search();
    },
    editItem : function(item){
      // this.$emit('edit', item);
      // console.log('edit', item)
      this.$router.push(`/admin/notice/edit?noticeId=${item.noticeId}`);
    },
    deleteItem : function(item){
      // eslint-disable-next-line no-unused-vars
      noticeApi.delete(item.noticeId).then(res => {
        //this.$store.state.snackbar.message
        this.$store.commit('snackMessage', {message : '정상적으로 삭제되었습니다.'});
        this.search();
      });
    },
    searchQuery: function(){
      this.pagination.page = 1;
      this.search();
    },
    search: function(){
      noticeApi.getList(this.pagination.page, this.pagination.limit, this.queryType.value, this.query)
          .then(res => {
        this.results = res.data.result;
        this.pagination.page = res.data.page;
        this.pagination.count = res.data.count;
        this.pagination.pageCount = res.data.pageCount;
      })
    },
    get: function(item) {
      this.$router.push(`/admin/notice/${item.noticeId}`);
    }
  }
}
</script>

<style scoped>
</style>