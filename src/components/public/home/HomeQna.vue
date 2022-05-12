<template>
  <div>

    <router-link to="/qna/list"><sub-title title="질문과 답변" /></router-link>

    <div>

      <v-list class="flex-fill pt-0 pb-0" >

        <template v-for="(item, index) in items">

          <v-list-item :key="index" class="pl-1 pr-1" link :to="`/qna/view?qnaId=${item.qnaId}`">

            <v-list-item-content>
              <v-list-item-title class="body-2 mb-2" v-text="((item.replyCnt || 0) > 0) ? `${item.title} [${item.replyCnt}]`:item.title"></v-list-item-title>
              <v-list-item-subtitle class="caption">
                <v-chip small color="grey lighten-3" text-color="grey" class="rounded-lg pl-2 pr-2 mr-1">작성자 : {{ item.writer }}</v-chip>
                <v-chip small color="grey lighten-3" text-color="grey" class="rounded-lg pl-2 pr-2 mr-1">등록일 : {{ $moment(item.createAt).format('YYYY.MM.DD') }}</v-chip>
                <v-chip small color="grey lighten-3" text-color="grey" class="rounded-lg pl-2 pr-2">조회수 : {{ item.pv }}</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-icon small color="grey" class="lighten-2">{{item.privateYn == 'Y' ? 'mdi-lock' : 'mdi-lock-open-outline'}}</v-icon>

          </v-list-item>

          <!-- <v-divider :key="`div-${index}`" :inset="!$vuetify.breakpoint.mdAndDown"  />-->
          <v-divider :key="`div-${index}`"  />

        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import SubTitle from "../../common/SubTitle";
import qnaApi from "@/api/QnaApi";
export default {
  components: {SubTitle},
  mounted() {
    this.search();
  },
  computed: {
    paddingRL (){
      return this.$vuetify.breakpoint.mdAndDown ? 0 : 1;
    }
  },
  methods: {
    search: function(){
      qnaApi.getList(1, 10, 'ALL', null).then(res => {
        this.items = res.data.result;
      })
    }
  },
  data: () => ({
    items: []
  })
}
</script>

<style scoped>

</style>