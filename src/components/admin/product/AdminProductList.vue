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
                        hide-details dense outlined></v-select>
            </div>
            <div class="d-flex ml-1" style="width: 250px;">
              <v-text-field placeholder="검색어" v-model="query" label="검색어" outlined hide-details dense @keyup.enter="search" />
            </div>
            <div class="d-flex ml-1">
              <v-btn color="deep-orange darken-2" height="39px" elevation="0" dark @click="search">검색</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>


    <div>
      <v-divider />

      <v-simple-table fixed-header class="hidden-sm-and-down">
        <template v-slot:default>
          <colgroup>
            <col style="width: 100px" />
            <col  />
            <col style="width: 110px" />
            <col style="width: 110px" />
            <col style="width: 100px" />
            <col style="width: 100px" />
            <col style="width: 120px" />
          </colgroup>
          <thead>
          <tr>
            <th class="text-center body-2 font-weight-bold">ID</th>
            <th class="text-center body-2 font-weight-bold">상품명</th>
            <th class="text-center body-2 font-weight-bold">목적지</th>
            <th class="text-center body-2 font-weight-bold">지역</th>
            <th class="text-center body-2 font-weight-bold">사용유무</th>
            <th class="text-center body-2 font-weight-bold">등록일</th>
            <th class="text-center body-2 font-weight-bold">actions</th>
          </tr>
          </thead>
          <tbody>

          <tr v-if="results != null && results.length < 1">
            <td colspan="6" class="text-center">
              조회 결과가 없습니다.
            </td>
          </tr>

          <tr v-for="(item, index) in results" :key="index" @click.stop="edit(item)" class="cursor-pointer">
            <td class="text-center body-2">
              {{item.productId}}
            </td>

            <td class="text-left body-2">
              {{ item.title }}
            </td>
            <td class="text-center body-2">
              {{ item['arrivalName'] || '-' }}
            </td>
            <td class="text-center body-2">
              {{ item['areaName'] }}
            </td>

            <td class="text-center body-2">
              {{ item['useYn'] == 'Y'  ? '사용':'미사용'}}
            </td>
            <td class="text-center body-2">
              {{ $moment(item['createAt']).format('YYYY.MM.DD') }}
            </td>
            <td class="text-center body-2">
              <v-icon
                  small
                  class="mr-2"
                  @click.stop="edit(item)">
                mdi-pencil
              </v-icon>

              <v-icon
                  small
                  @click.stop="deleteItem(item)">
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

          <v-list-item :key="index" class="pl-0 pr-0" link :to="`/admin/product/edit?productId=${item.productId}`">

            <v-list-item-avatar class="pa-0">
              <country-flag country="TH" size="big" />
            </v-list-item-avatar>

            <v-list-item-content>
              <div class="subtitle-1">
                {{ item.title }}
              </div>
              <v-list-item-subtitle class="caption">
                {{ item.arrivalName }}
                <span class="mx-auto mr-1 ml-1 caption">|</span>
                {{ $moment(item['createAt']).format('YYYY.MM.DD') }}
                <span class="mx-auto mr-1 ml-1 caption">|</span>
                {{ item.productType }}
              </v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>

          <v-divider :key="`dv-${index}`" v-if="index < (results.length - 1)" />

        </template>


      </v-list>

      <v-divider />
    </div>


    <!-- 하단 actions -->
    <div class="pt-4 pb-4">
      <div class="justify-end flex-fill d-flex">
        <v-btn color="grey" dark elevation="0" @click="onCreate">
          <v-icon small class="mr-1">mdi-plus</v-icon> 추가
        </v-btn>
      </div>
    </div>


    <!-- 페이징 -->
    <div class="pt-6 pb-12">
      <v-pagination class="elevation-0"
                    v-model="pagination.page"
                    @input="next"
                    color="deep-orange darken-2"
                    :length="paginationLimit">
      </v-pagination>
    </div>


<!--    <admin-product-create-dialog ref="admin_product_create_dialog" />-->
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import productApi from "@/api/ProductApi";

export default {
  components:{CountryFlag},
  computed: {
    paginationLimit(){
      return this.pagination.pageCount > 5 ? 5 : this.pagination.pageCount;
    },
  },
  mounted() {
    this.search();
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
    edit : function(item){
      this.$router.push(`/admin/product/edit?productId=${item.productId}`);
    },
    deleteItem : function(item){
      let t = this;
      this.$store.commit('confirm', {title:'안내', message:'확인을 누르면 해당 상품정보가 삭제됩니다.', callback: function() {
          // eslint-disable-next-line no-unused-vars
        productApi.delete(item.productId).then(res => {
          t.search();
        });
        }
      })
    },
    search: function(){
      this.pagination.page = 1;
      let parameters = {
        page: this.pagination.page,
        limit: 20,
        queryType: this.queryType.value,
        query: this.query
      };

      productApi.pageList(parameters).then(res => {
        let data = res.data;
        if(data) {
          this.pagination.page = data.page || 1;
          this.pagination.pageCount = data['pageCount'] || 1;
          this.pagination.count = data['count'] || 0;
          this.results = data.result || [];
        }
      });
    },
    next: function(page){
      this.pagination.page = page;
      this.search();
    },
    onCreate: function(){
      this.$router.push("/admin/product/edit");
    }
  },
}
</script>

<style scoped>

</style>