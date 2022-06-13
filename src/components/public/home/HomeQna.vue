<template>
  <v-card elevation="0" class="pt-5 pb-7 pl-5 pr-5 rounded-lg flex-fill fill-height">

    <div class="title font-weight-bold">질문&답변</div>

    <div class="mt-4">

      <v-list class="flex-fill pt-0 pb-0" >

        <template v-for="(item, index) in items">

          <v-list-item :key="index" class="pl-1 pr-1" link :to="`/qna/view?qnaId=${item.qnaId}`">

            <v-list-item-content>
              <v-list-item-title class="subtitle-1 body-2 mb-2" v-text="((item.replyCnt || 0) > 0) ? `${item.title} [${item.replyCnt}]`:item.title"></v-list-item-title>
              <v-list-item-subtitle class="caption">
                <span class="grey--text">작성자 : {{ item.writer }}</span>
                <span class="body-2 pl-2 pr-2">|</span>
                <span class="grey--text">등록일 : {{ $moment(item.createAt).format('YYYY.MM.DD') }}</span>
                <span class="body-2 pl-2 pr-2">|</span>
                <span class="grey--text">조회수 : {{ item.pv }}</span>
                <!--
                <v-chip small color="grey lighten-3" text-color="grey" class="rounded-lg pl-2 pr-2 mr-1">작성자 : {{ item.writer }}</v-chip>
                <v-chip small color="grey lighten-3" text-color="grey" class="rounded-lg pl-2 pr-2 mr-1">등록일 : {{ $moment(item.createAt).format('YYYY.MM.DD') }}</v-chip>
                <v-chip small color="grey lighten-3" text-color="grey" class="rounded-lg pl-2 pr-2">조회수 : {{ item.pv }}</v-chip>
                -->
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-icon small color="grey" class="lighten-2">{{item.privateYn == 'Y' ? 'mdi-lock' : 'mdi-lock-open-outline'}}</v-icon>

          </v-list-item>

          <!-- <v-divider :key="`div-${index}`" :inset="!$vuetify.breakpoint.mdAndDown"  />-->
          <v-divider :key="`div-${index}`"  />

        </template>
      </v-list>
    </div>
  </v-card>
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