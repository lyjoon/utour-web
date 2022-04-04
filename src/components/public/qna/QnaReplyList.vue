<template>
  <div class="d-block">
    <div class="caption">전체댓글 : {{ count || '0' }}개</div>
    <secondary-divider />

    <v-list class="pt-0 pb-0">

      <template v-for="(item, index) in items">

        <v-list-item :key="`content-${index}`" dense class="hidden-md-and-down">
          <v-list-item-avatar tile width="180" class="pa-1 ma-0 justify-start body-2">{{item.writer}}</v-list-item-avatar>
          <v-list-item-content >
            <div class="pl-2 pr-2 body-2">
              {{item.content}}
            </div>
          </v-list-item-content>
          <div class="d-inline caption align-center">
            <span class="grey--text">{{ $moment(item.createAt).format("YYYY.MM.DD") }}</span>
            <v-btn icon dark color="grey" small @click="deleteReply(item)">
              <v-icon small>mdi-close-circle</v-icon>
            </v-btn>
          </div>
        </v-list-item>

        <v-list-item :key="`small-content-${index}`" dense class="hidden-lg-and-up">
          <v-list-item-content>
            <v-list-item-subtitle class="caption">{{item.writer}} | {{$moment(item.createAt).format("YYYY.MM.DD")}}</v-list-item-subtitle>
            <div class="mt-1 body-2">{{item.content}}</div>
          </v-list-item-content>
          <v-btn icon dark color="grey" small @click="deleteReply(item)">
            <v-icon small>mdi-close-circle</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider :key="`dvd-${index}`" class="grey lighten-3" v-if="index < (items.length -1)" />

      </template>

    </v-list>
  </div>
</template>

<script>
import SecondaryDivider from "../../common/SecondaryDivider";
import Qna from "../../../api/QnaApi";

export default {
  components: {SecondaryDivider},
  data: () => ({
    qnaId:null,
    count: null,
    page: null,
    items: [
      /**
      {id:1, content:'좋은데?', writer:'홍딸기', createAt:'2022.03.22 14:11:48'},
      {id:2, content:'조아 빠르게가', writer:'윤땡떙', createAt:'2022.03.25 03:09:11'},
      {id:3, content:'?', writer:'함이', createAt:'2022.03.25 04:23:13'},
      {id:4, content:'보상이나 배상부분은 없습니다.', writer:'관리자', createAt:'2022.03.25 18:18:18'},
      {id:5, content:'나는 이 기사를 보면서 이게 pc주의의 결말이 아닌가 싶음.\n' +
            '여성들은 유리천장을 깨부수고 \'평등\'을 이룩하자고 외쳤지만 이게 자신들의 유리바닥을 깨는 결과로 돌아올 줄은 몰랐겠지.\n' +
            '\n' +
            '이코노미스트가 제시한 대안은 모든 성별이 참여할 수 있는 Open과 생물학적 여자만 참여할 수 있는 Female로 나누자고 하지만 나는 이게 해결책이 될 수 없다고 봄.', writer:'ㅇㅇ', createAt:'2022.03.26 15:10:22'},
      */
    ]
  }),
  methods: {
    init: function (qnaId) {
      console.log('qna_reply_list.init.qnaId', qnaId);
      this.qnaId = qnaId;
      this.search();
    },
    search : function() {
      Qna.getReplies(1, this.qnaId).then(res => {
        let result = res.data.result;
        this.count = res.data.count || 0;
        this.items = result;
        this.page = res.data.page;
        this.$emit('updateRepliesCount', this.count);
      });
    },
    deleteReply: function(item){
      Qna.deleteReply(item.qnaId, item.qnaReplyId).then(res => {
        console.log('res', res);
        this.search();
      })
    }
  }
}
</script>

<style scoped>

</style>
