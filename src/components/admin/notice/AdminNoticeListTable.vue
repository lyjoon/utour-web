<template>
  <div>
    <v-card elevation="0" class="pt-2 pb-2">

      <div class="pa-4">
        <v-row no-gutters class="align-end">
          <v-col :cols="$vuetify.breakpoint.smAndDown ? '12':'4'" >
            <div class="body-1">전체 1건 / 1 페이지</div>
          </v-col>

          <v-col :cols="$vuetify.breakpoint.smAndDown ? '12':'8'" >
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
                <v-text-field placeholder="검색어" label="검색어" outlined hide-details dense />
              </div>
              <div class="d-flex ml-1">
                <v-btn color="deep-orange darken-2" height="39px" elevation="0" dark>검색</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-data-table
          :headers="headers"
          :items="results"
          item-key="productId"
          class="elevation-0"
          disable-pagination
          disable-filtering
          disable-sort
          fixed-header
          hide-default-footer
          :footer-props="{'itemsPerPageText':'노출건수'}"
          :item-class="rowStyle"
      >
        <template v-slot:item.title="{item}">
          <router-link class="text-decoration-underline" :to="`/admin/notice/${item.noticeId}`">{{ item.title }} </router-link>
        </template>

        <template v-slot:item.file_attachment="{ item }">
          <v-icon small v-if="item.attachment">mdi-file-check</v-icon>
          <span v-if="!item.attachment">-</span>
        </template>

        <template v-slot:item.noticeId="{ item }">
          <v-chip v-if="item.noticeYn == 'Y'" small class="pa-1 rounded" outlined color="deep-orange">공지</v-chip>
          <span v-if="item.noticeYn != 'Y'">{{item.noticeId}}</span>
        </template>

        <template v-slot:item.createAt="{ item }">
          {{ $moment(item['createAt']).format('YYYY.MM.DD') }}
        </template>

        <template v-slot:item.actions="{ item }">
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

        </template>

        <template v-slot:footer.page-text="items">{{items.pageStart}}/{{items.pageStop }}</template>

      </v-data-table>

      <v-divider />

      <div class="pa-4">
        <div class="justify-end flex-fill d-flex">
          <v-btn color="grey darken-2" @click="$emit('create')" dark elevation="0">등록</v-btn>
        </div>
      </div>

      <v-pagination class="elevation-0 mt-6 mb-4"
                    v-model="pagination.page"
                    @input="setPage"
                    color="deep-orange darken-2"
                    :length="paginationLimit">
      </v-pagination>
    </v-card>
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
    },
    headers(){
      return [
        {
          text: 'No',
          sortable: false,
          align: 'center',
          width: '100px',
          value: 'noticeId',
        },
        {
          text: '제목',
          width: '50%',
          value: 'title',
          sortable: false,
          align:'start',
        },
        {text: '등록일', value: 'createAt', sortable: false, align:'center'},
        {text: '파일유무', align:'center', width:'80px', value: 'file_attachment' },
        {text: 'Actions', align:'center', value: 'actions' },
      ];
    }
  },
  data: () =>({
    pagination: {
      page: 1,
      pageCount : null,
      limit: 20
    },
    query:null,
    results:[{
      noticeId: 4,
      title:'정규직',
      noticeYn: 'Y',
      createAt:'2022.07.15',
      attachment: true
    },{
      noticeId: 2,
      title:'내리어라',
      noticeYn: 'N',
      createAt:'2021.08.22',
      attachment: false
    }]
  }),
  methods: {
    setPage: function(p){
      this.pagination.page = p;
      this.search();
    },
    editItem : function(item){
      this.$emit('edit', item);
    },
    deleteItem : function(item){
      // eslint-disable-next-line no-unused-vars
      noticeApi.delete(item.noticeId).then(res => {
        //this.$store.state.snackbar.message
        this.$store.commit('snackMessage', {message : '정상적으로 삭제되었습니다.'});
        this.search();
      });
    },
    searchQuery: function(query){
      this.query = query;
      this.pagination.page = 1;
      noticeApi.getList(this.pagination.page, this.pagination.limit, 'ALL', this.query).then(res => {
        this.results = res.data.result;
        this.pagination.page = res.data.page;
        this.pagination.pageCount = res.data.pageCount;
      })
    },
    search: function(){
      noticeApi.getList(this.pagination.page, this.pagination.limit, 'ALL', this.query).then(res => {
        this.results = res.data.result;
        this.pagination.page = res.data.page;
        this.pagination.pageCount = res.data.pageCount;
      })
    },
    rowStyle: function(item) {
      return item.noticeYn == 'Y' ? 'notice_list_row_active' : '';
    },
    get: function(item) {
      this.$router.push(`/admin/notice/${item.noticeId}`);
    }
  }
}
</script>

<style scoped>
</style>