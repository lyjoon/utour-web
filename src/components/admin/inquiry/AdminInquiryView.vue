<template>
  <div class="pa-4">
    <div class="">
      <div class="mb-2 d-flex align-end">
        <v-chip dark class="rounded pa-2" :color="command.status == 'COMPLETE' ? 'blue lighten-1' : 'deep-orange lighten-1'">{{getStatus}}</v-chip>
        <div class="title text-h6 ml-2">{{ command.title || '-' }}</div>
      </div>
      <div class="mt-2 mb-4 body-2 grey--text">
          <v-chip small class="pa-2 rounded-lg mt-1 mr-1" dark color="grey lighten-1">
            작성자 : {{ command.writer || 'N/A' }}
          </v-chip>
          <v-chip small class="pa-2 rounded-lg mt-1 mr-1" dark color="grey lighten-1">
            등록일 : {{ $moment(command.createAt).format('YYYY.MM.DD') || '-' }}
          </v-chip>
          <v-chip small class="pa-2 rounded-lg mt-1 mr-1" dark color="grey lighten-1" >
            Email : {{ command.email }}
          </v-chip>
          <v-chip small class="pa-2 rounded-lg mt-1" dark color="grey lighten-1">
            연락처 : {{ command.contact }}
          </v-chip>
      </div>
    </div>

    <v-divider />

    <div>
      <v-sheet min-height="550px">
        <toast-viewer ref="viewer" />
      </v-sheet>
    </div>

    <v-divider />

    <div class="mt-4 mb-6">
      <div class="d-flex flex-fill justify-end align-center">
        <div>
          <v-switch
              v-model="switchStatus"
              dense
              inset
              @change="updateStatus"
              color="blue lighten-1">
            <template v-slot:label>
              <span class="body-2">해당 문의에 대한 마킹상태</span>
            </template>
          </v-switch>
        </div>

        <v-spacer />

        <v-btn class="ml-6" large color="grey lighten-1" dark elevation="0" link to="/admin/inquiry/list">
          <v-icon class="mr-1" small>mdi-format-list-bulleted</v-icon><span>글목록</span>
        </v-btn>
      </div>
    </div>

  </div>
</template>

<script>
import ToastViewer from "@/components/common/ToastViewer";
import inquiryApi from "@/api/InquiryApi";
export default {
  components: {ToastViewer},
  data: ()=>({
    command: {
      inquiryId:null,
      title:null,
      content:null,
      noticeYn:null,
      writer: null,
      contact: null,
      email: null,
      status: null,
      createAt:null,
    },
    searchInquiryId:null,
    attachments: [],
    switchStatus: false,
  }),
  mounted() {
    let inquiryId = this.$route.query.inquiryId || this.$route.params.inquiryId;
    this.searchInquiryId = inquiryId;
    this.search();
  },
  computed:{
    getStatus(){
      switch (this.command.status) {
        case 'WAIT':
          return '대기';
        case 'COMPLETE':
          return '확인완료';
        default:
          return '-';
      }
    }
  },
  methods:{
    search : function(){
      inquiryApi.get(this.searchInquiryId).then(res => {
        let result = res.data.result;
        let keyList = Object.keys(this.command);
        keyList.forEach(k => {
          this.command[k] = result[k];
        });
        this.attachments = result.attachments;
        this.$refs.viewer.setMarkdown(this.command.content);
        this.switchStatus = this.command.status == 'COMPLETE';
      })
    },
    updateStatus: function() {
      let statusCode = this.switchStatus ? 'COMPLETE' : 'WAIT';
      // eslint-disable-next-line no-unused-vars
      inquiryApi.setStatus(this.command.inquiryId, statusCode).then(res => this.search()).catch(error => this.search())
    }
  }
}
</script>

<style scoped>

</style>