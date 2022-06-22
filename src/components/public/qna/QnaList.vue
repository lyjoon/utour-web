<template>
  <div>
    <div class="mb-4">
      <v-row no-gutters class="align-end">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 5" :class="`mb-${$vuetify.breakpoint.smAndDown ? '2' : '0'}`">
          <div class="d-flex body-2 font-weight-medium text--black align-center">
            전체 {{ pagination.count || 0 }}건 / {{ pagination.pageCount || 0 }}페이지
          </div>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 7">
          <div :class="`d-flex flex-fill ${$vuetify.breakpoint.smAndDown ? 'justify-start' : 'justify-end'}`">
            <div class="d-flex justify-end" style="width: 140px">
              <v-select placeholder="검색항목" class="body-2" v-model="queryType" :items="queryTypeItems" item-value="value" item-text="text" hide-details dense outlined></v-select>
            </div>
            <div class="d-flex ml-1 justify-end" style="width: 300px">
              <v-text-field placeholder="검색어" v-model="query" dense outlined hide-details label="검색어" />
            </div>
            <div class="d-flex ml-1 justify-end">
              <v-btn color="deep-orange darken-2" @click="search" dark height="39px" elevation="0">검색</v-btn>
            </div>

          </div>
        </v-col>
      </v-row>
    </div>

    <v-divider class="grey" />

    <v-simple-table fixed-header class="hidden-md-and-down">
      <template v-slot:default>
        <colgroup>
          <col style="width: 80px" />
          <col />
          <col style="width: 200px" />
          <col style="width: 150px" />
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
            작성자
          </th>
          <th class="text-center body-1 font-weight-bold">
            작성일
          </th>
          <th class="text-center body-1 font-weight-bold">
            조회수
          </th>
        </tr>
        </thead>

        <tbody class="body-2">
        <tr v-if="items != null && items.length < 1">
          <td colspan="5" class="text-center">
            조회 결과가 없습니다.
          </td>
        </tr>
        <tr v-for="(item, index) in items" :key="index" >
          <td class="text-center">{{item.qnaId}}</td>
          <td class="text-left cursor-pointer" @click="view(item)">
            {{ item.title + ((item.replyCnt || 0) > 0 ? ` [${item.replyCnt}]`:'') }}
            <v-icon color="blue-grey lighten-1" small v-if="item['privateYn'] == 'Y'">mdi-lock</v-icon>
          </td>
          <td class="text-center">{{ item.writer }}</td>
          <td class="text-center">{{ $moment(item.createAt).format('YYYY.MM.DD') }}</td>
          <td class="text-center body-2">{{ item.pv }}</td>
        </tr>
        </tbody>

      </template>
    </v-simple-table>

    <v-list class="flex-fill mt-0 hidden-lg-and-up" min-height="550px">

      <v-card v-if="items != null && items.length < 1" min-height="100px" elevation="0">
        <v-card-text class="d-flex flex-fill fill-height align-center justify-center mt-12">
          조회 결과가 없습니다.
        </v-card-text>
      </v-card>

      <template v-for="(item, index) in items">

        <v-list-item :key="index" class="pl-0 pr-0" link @click="view(item)">

          <v-list-item-content>
            <div class="subtitle-1">
              {{ item.title + ((item.replyCnt || 0) > 0 ? ` [${item.replyCnt}]`:'') }}
            </div>
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

        <v-divider :key="`dv-${index}`" v-if="index < (items.length - 1)" />

      </template>
    </v-list>

    <v-divider class="grey" />

    <div>
      <div class="d-flex flex-fill justify-end mt-4">
        <v-btn color="grey2" dark elevation="0" @click="edit">
          <v-icon class="mr-1">mdi-playlist-edit</v-icon>
          <span>작성</span>
        </v-btn>
      </div>
    </div>

    <div class="mt-6 mb-6">
      <v-pagination class="elevation-0"
                    color="grey1"
                    v-model="pagination.page"
                    :length="pagination.pageCount">
      </v-pagination>
    </div>

  </div>
</template>

<script>
import QnaApi from "../../../api/QnaApi"
export default {
  props:{
    limit: {
      type: Number,
      default : 20
    }
  },

  data: ()=> ({
    pagination: {
      page: 1,
      pageCount : 0,
      limit: 20,
      count: 0,
    },
    queryTypeItems: [
        {value:'ALL', text:'제목+내용'},
        {value:'TITLE', text:'제목'},
        {value:'WRITER', text:'작성자'},
        {value:'CONTENT', text:'내용'},
    ],
    queryType: {value:'ALL', text:'제목+내용'},
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
      QnaApi.getList(1, this.pagination.limit, this.queryType.val, this.query).then(res => {
        this.items = res.data.result;
        this.pagination.page = res.data.page;
        this.pagination.pageCount = res.data['pageCount'];
        this.pagination.count = res.data['count'];
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