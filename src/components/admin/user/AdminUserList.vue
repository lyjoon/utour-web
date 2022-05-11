<template>
  <div class="pa-4">

    <!-- 검색영역 -->
    <div class="pt-4 pb-4">
      <v-row no-gutters class="align-center">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '5':'4'" >
          <div class="body-1 pt-2">전체 {{pagination.count }}건 / {{ pagination.pageCount }} 페이지</div>
        </v-col>

        <v-col :cols="$vuetify.breakpoint.smAndDown ? '7':'8'" :class="$vuetify.breakpoint.smAndDown ? 'mt-2' : ''" >
          <div class="d-flex flex-fill justify-end">
            <div class="d-flex ml-1">
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

      <v-simple-table fixed-header class="hidden-sm-and-down">
        <template v-slot:default>
          <colgroup>
            <col width="100px" />
            <col />
            <col width="20%" />
            <col width="140px" />
            <col width="150px" />
          </colgroup>
          <thead>
            <tr>
              <th class="text-center body-1 font-weight-bold">사용</th>
              <th class="text-center body-1 font-weight-bold">ID</th>
              <th class="text-center body-1 font-weight-bold">이름</th>
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
              <td class="text-center body-2">
                <v-icon :color="item['useYn'] == 'Y' ? 'green' : 'deep-orange darken-2'" class="lighten-2">{{ item['useYn'] == 'Y' ? 'mdi-check' : 'mdi-cancel' }}</v-icon>
              </td>
              <td class="text-center body-2" v-text="item['userId']"></td>
              <td class="text-center body-2" v-text="item['name']"></td>
              <td class="text-center body-2" v-text="$moment(item['createAt']).format('YYYY.MM.DD')"></td>
              <td class="text-center body-2">
                <v-icon small class="mr-2" @click="edit(item)">mdi-pencil</v-icon>
                <v-icon v-if="item['userId'] != 'admin'" small @click="remove(item)">mdi-delete</v-icon>
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

          <v-list-item :key="index"
                       :class="`pl-1 pr-1 ${item['useYn'] != 'Y' ? `grey lighten-4 `:``}`"
                       link @click="edit(item)" >

            <v-list-item-content>
              <div class="subtitle-1" v-text="item['userId']" />
              <v-list-item-subtitle class="caption">
                {{ item['name'] }}
                <span class="mx-auto mr-1 ml-1 caption">|</span>
                {{ $moment(item['createAt']).format('YYYY.MM.DD') }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-icon :color="item['useYn'] == 'Y' ? 'green' : 'deep-orange darken-2'" class="lighten-2">{{ item['useYn'] == 'Y' ? 'mdi-check' : 'mdi-cancel' }}</v-icon>

          </v-list-item>

          <v-divider :key="`dv-${index}`" v-if="index < (results.length - 1)" />

        </template>

      </v-list>

      <v-divider />
    </div>


    <!-- 하단 actions -->
    <div class="pt-4 pb-4">
      <div class="justify-end flex-fill d-flex">
        <v-btn color="blue-grey lighten-2" dark elevation="0" @click="put">
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
    <admin-user-dialog ref="admin_user_dialog" @completed="completed" />
  </div>
</template>

<script>

import userApi from "@/api/UserApi";
import AdminUserDialog from "@/components/admin/user/AdminUserDialog";

export default {
  components: {AdminUserDialog},
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
    put: function(){
      this.$refs.admin_user_dialog.open(null);
    },
    edit: function(item){
      this.$refs.admin_user_dialog.open(item['userId']);
    },
    remove: function(item) {

      if(confirm('선택한 항목을 삭제합니다.')) {
        // eslint-disable-next-line no-unused-vars
        userApi.delete(item.userId).then(res => {
          this.searchQuery();
        })
      }
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
    completed: function (){
      this.searchQuery();
    }
  }
}
</script>

<style scoped>
</style>