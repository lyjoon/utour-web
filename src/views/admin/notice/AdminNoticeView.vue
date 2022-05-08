<template>
  <v-container>
    <v-card elevation="0">
      <v-card-title v-text="command.title" ></v-card-title>
      <v-card-subtitle>
        <div class="d-flex flex-fill justify-start mt-3">
          <v-chip color="teal lighten-4" small class="teal--text">
            {{command.writer}}
          </v-chip>

          <v-chip dark color="indigo lighten-4" small class="ml-1 indigo--text">
            {{$moment(command.createAt).format("YYYY.MM.DD")}}
          </v-chip>

        </div>
      </v-card-subtitle>

      <v-card-text >
        <v-divider />
        <div style="min-height: 500px;">
          <toast-viewer ref="viewer"></toast-viewer>
        </div>
        <v-divider />
      </v-card-text>

      <v-card-text v-if="attachments.length > 0">

        <div class="mt-4 mb-4">
          <div class="mb-2">첨부파일</div>
          <v-sheet height="100px" rounded class="pa-2 overflow-y-auto ma-0" color="grey lighten-4">
            <ul>
              <li style="list-style: disc" v-for="item in attachments" :key="item.idx" class="body-2">
                <a @click="downloadFile(item)">{{item.originName}}</a>
              </li>
            </ul>
          </v-sheet>
        </div>

      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-fill justify-end pa-2">
          <v-btn dark elevation="0" @click="$router.push('/admin/notice/list')" color="grey darken-2" class="ml-2"><v-icon small class="mr-1">mdi-view-list</v-icon>목록으로</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ToastViewer from "@/components/common/ToastViewer";
import noticeApi from "@/api/NoticeApi";
export default {
  components: {ToastViewer},
  data: ()=>({
    command: {
      noticeId:null,
      title:null,
      content:null,
      noticeYn:null,
      writer: '관리자',
      createAt:null,
    },
    searchNoticeId:null,
    attachments: []
  }),
  mounted() {
    let noticeId = this.$route.query.noticeId || this.$route.params.noticeId;
    this.searchNoticeId = noticeId;
    this.search();
  },
  methods:{
    search : function(){
      noticeApi.get(this.searchNoticeId).then(res => {
        console.log('res', res);
        let result = res.data.result;
        let keyList = Object.keys(this.command);
        keyList.forEach(k => {
          this.command[k] = result[k];
        });
        this.attachments = result.attachments;
        this.$refs.viewer.setMarkdown(this.command.content);
      })
    },
    downloadFile: function(item){
      noticeApi.download(item.noticeId, item.attachId, item.originName);
    }
  }
}
</script>

<style scoped>

</style>