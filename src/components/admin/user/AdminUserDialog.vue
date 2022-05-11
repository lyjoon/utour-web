<template>
  <v-dialog
            width="500px"
            persistent
            v-model="dialog">
    <v-card elevation="0">
      <v-toolbar elevation="0">
        <div class="d-flex flex-fill align-center">
          <v-toolbar-title>사용자등록</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="close" color="grey" outlined tile class="rounded toolbar-btn-outlined" small>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <v-divider class="mb-4" />
      <v-card-text>
        <v-form ref="frm" lazy-validation>
          <div>
            <v-text-field outlined
                          dense
                          v-model="command.userId"
                          :rules="rules.userId"
                          :disabled="disabled"
                          maxlength="50"
                          placeholder="Email(ID)를 입력주세요."
                          label="ID or E-Mail"  />
          </div>
          <div>
            <v-text-field outlined
                          dense
                          v-model="command.name"
                          :rules="rules.name"
                          :disabled="adminDisabled"
                          maxlength="10"
                          placeholder="이름"
                          label="이름"  />
          </div>
          <div>
            <v-text-field outlined
                          dense
                          type="password"
                          maxlength="30"
                          v-model="command.password"
                          :rules="rules.password"
                          placeholder="비밀번호"
                          label="비밀번호" />
          </div>
          <div>
            <div class="d-flex flex-fill align-center">
              <div class="d-flex pl-1">

                <v-switch
                    v-model="switchUseYn"
                    dense
                    inset
                    :disabled="adminDisabled"
                    color="blue">
                  <template v-slot:label>
                    <span class="body-2">사용(활성화) 여부</span>
                  </template>
                </v-switch>
              </div>
              <v-spacer />
              <div class="d-flex">
                <v-btn color="deep-orange darken-2" class="mr-2" dark elevation="0" @click="save">
                  <v-icon small class="mr-1">mdi-content-save</v-icon> 저장
                </v-btn>
                <v-btn color="grey" v-if="(command.userId || '') != '' && !adminDisabled" dark elevation="0" class="mr-2" @click="remove">
                  <v-icon small class="mr-1" >mdi-delete</v-icon> 삭제
                </v-btn>
              </div>
            </div>
          </div>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import userApi from "@/api/UserApi";

export default {
  data:()=>({
    dialog: false,
    command :{
      userId: null,
      name: null,
      useYn: null,
      password:null,
      createAt: null,
    },
    switchUseYn: false,
    disabled: false,
    adminDisabled: false,
    rules: {
      userId: [
        v => !!v || '이메일 주소(ID)를 입력해주세요.',
        v => (v && v.length <= 50) || '최대 50자까지 입력 가능합니다.',
        v => ('admin' == v ? true : /.+@.+\..+/.test(v)) || '이메일 형식이 아닙니다.',
      ],
      name: [
        v => !!v || '이름을 입력해주세요.',
        v => (v && v.length <= 10) || '이름은 최대 10자까지 입력 가능합니다.',
      ],
      password: [
        v => !!v || '비밀번호를 입력해주세요.',
      ]
    }
  }),
  methods:{
    open: function (userId) {
      this.clear();
      this.dialog = true;
      if(userId) {
        userApi.get(userId).then(res => {
          let resultData = res.data.result;
          if(resultData) {
            this.disabled = true;
            Object.keys(this.command).forEach(key => {
              this.command[key] = resultData[key];
              if(this.command.useYn == 'Y') {
                this.switchUseYn = true;
              }
            });
            if(this.command.userId == 'admin') {
              this.adminDisabled = true;
            }
          }
        })
      }
    },
    clear: function(){

      Object.keys(this.command).forEach(key => {
        this.command[key] = null;
      });

      this.switchUseYn = false;
      this.disabled = false;
      this.adminDisabled = false;

      if(this.$refs.frm) {
        this.$refs.frm.reset();
        this.$refs.frm.resetValidation();
      }
    },
    close: function() {
      this.clear();
      this.dialog = false;
    },
    save: function(){
      //this.$store.commit("alert", {message:'준비중입니다.', title:'안내'});
      let avail = this.$refs.frm.validate();
      if(avail) {
        this.command.useYn = this.switchUseYn ? 'Y' : 'N';
        // eslint-disable-next-line no-unused-vars
        userApi.save(this.command).then(res => {
          this.$emit("completed");
          this.close();
        });
      }
    },
    remove: function(){
      if(confirm('삭제하시겠습니까?')) {
        // eslint-disable-next-line no-unused-vars
        userApi.delete(this.command.userId).then(res => {
          this.$emit("completed");
          this.close();
        })
      }
    }
  }
}
</script>

<style scoped>

</style>