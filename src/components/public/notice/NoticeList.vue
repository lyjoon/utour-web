<template>
  <div>

    <div class="pt-12 pb-4">
      <v-row no-gutters class="align-end">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 5" :class="`mb-${$vuetify.breakpoint.smAndDown ? '2' : '0'}`">
          <div class="d-flex body-2 font-weight-medium text--black align-center">
            전체 {{ pagination.count || 0 }}건 / {{ pagination.pageCount || 0}}페이지
          </div>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 7">
          <div :class="`d-flex flex-fill ${$vuetify.breakpoint.smAndDown ? 'justify-start' : 'justify-end'}`">
            <div class="d-flex justify-end" style="width: 140px">
              <v-select placeholder="검색항목" class="body-2" v-model="searchType" :items="searchTypes" hide-details dense outlined></v-select>
            </div>
            <div class="d-flex ml-1 justify-end" style="width: 300px">
              <v-text-field placeholder="검색어" dense outlined hide-details label="검색어" />
            </div>
            <div class="d-flex ml-1 justify-end">
              <v-btn color="deep-orange darken-2" dark height="39px" elevation="0">검색</v-btn>
            </div>

          </div>
        </v-col>
      </v-row>
    </div>

    <v-divider class="grey" />

    <v-list class="flex-fill mt-0 hidden-lg-and-up" >
      <template v-for="(item, index) in items">
        <v-list-item :key="index" class="pl-1 pr-1" link to="/notice/123" style="background-color: white">
          <v-list-item-avatar class="pa-0" >
            <div class="body-2" v-if="item.noticeYn != 'Y'">{{index}}</div>
            <v-chip v-if="item.noticeYn == 'Y'" dark outlined color="secondary" small class="d-flex justify-center rounded pa-1 caption">공지</v-chip>
          </v-list-item-avatar>

          <v-list-item-content class="">
            <div class="subtitle-1">{{item.title}}</div>
            <v-list-item-subtitle class="caption">
              {{ item.writer }}
              <span class="mx-auto mr-1 ml-1 caption">|</span>
              {{ $moment(item.createAt).format('YYYY.MM.DD') }}
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
        <colgroup>
          <col style="width: 50px" />
          <col />
          <col style="width: 80px" />
          <col style="width: 120px" />
          <col style="width: 100px" />
        </colgroup>
        <thead>
        <tr>
          <th class="text-center body-1 font-weight-bold">
            No
          </th>
          <th class="text-left body-1 font-weight-bold">
            제목
          </th>
          <th class="text-center body-1 font-weight-bold">
            파일
          </th>
          <th class="text-center body-1 font-weight-bold">
            작성일
          </th>
          <th class="text-center body-1 font-weight-bold">
            조회수
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in items" :key="index" :class="item.noticeYn == 'Y' ? `grey lighten-4 `:``" @click="$router.push(`/notice/${item.noticeId}`)">
          <td class="text-center">
            <span v-if="item.noticeYn != 'Y'" >{{ index }}</span>
            <v-chip v-if="item.noticeYn == 'Y'" dark outlined color="secondary" small class="caption rounded pl-1 pr-1">공지</v-chip>
          </td>
          <td>{{ item.title }}</td>
          <td class="text-center">
            <v-icon color="grey" small v-if="item.attachment">mdi-file-check</v-icon>
          </td>
          <td class="text-center">{{ $moment(item.createAt).format('YYYY.MM.DD') }}</td>
          <td class="text-center">{{ item.pv }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-divider class="grey" />

    <div class="pt-12 pb-6">
      <v-pagination class="elevation-0"
                    color="secondary"
                    v-model="pagination.page"
                    :length="paginationLimit">
      </v-pagination>
    </div>

  </div>
</template>

<script>
import NoticeApi from "@/api/NoticeApi";
export default {
  props:{
    limit: {
      type: Number,
      default : 20
    }
  },
  computed: {
    paginationLimit (){
      return this.pagination.pageCount > 5 ? 5 : this.pagination.pageCount;
    }
  },
  data: ()=> ({
    pagination: {
      page: 1,
      pageCount: 0,
      limit:20,
      count:0,
    },
    query:null,
    searchTypes: ['제목+내용', '제목', '작성자', '내용'],
    searchType: '제목+내용',
    items: []
  }),
  mounted() {
    // console.log(`limit : ${this.limit}`);
    this.search();
  },
  methods:{
    search: function (){
      NoticeApi.getList(this.pagination.page, this.pagination.limit, 'ALL', this.query)
          .then(res => {
            this.items = res.data.result;
            this.pagination.page = res.data.page;
            this.pagination.pageCount = res.data['pageCount'];
            this.pagination.count = res.data['count'];
          });
    }
  }
}
</script>

<style scoped>
</style>