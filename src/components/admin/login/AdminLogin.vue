<template>
  <v-container>
    <v-layout row wrap>


      <v-flex class="admin-login mx-auto" >

        <v-alert
            class="ma-0 rounded-t"
            rounded="0"
            dismissible
            v-model="error.flag"
            type="error"
            title="Info">
          <div class="caption">
            {{error.message}}
          </div>
        </v-alert>

        <v-card class="mx-auto pa-10" rounded elevation="1">

          <v-card-title>관리자 로그인</v-card-title>
          <v-card-subtitle>
            회원가입은 관리자에게 문의해주시기 바랍니다.
          </v-card-subtitle>

          <v-card-text>
            <v-form ref="frm" lazy-validation>
              <div>
                <v-text-field placeholder="아이디"
                              clearable
                              v-model="loginId"
                              :rules="rules.loginId"
                              prepend-inner-icon="mdi-account"
                              clear-icon="mdi-close-circle"
                              outlined />
              </div>
              <div class="mt-2">
                <v-text-field type="password"
                              clearable
                              v-model="password"
                              :rules="rules.password"
                              prepend-inner-icon="mdi-lock-question"
                              clear-icon="mdi-close-circle"
                              placeholder="비밀번호"
                              @keyup.enter="doSubmit"
                              outlined />
              </div>
              <div>
                <v-checkbox class="mt-0" hide-details dense label="로그인유지" />
              </div>
            </v-form>
          </v-card-text>

          <v-card-actions class="pl-4 pr-4">
            <v-btn class="primary"
                   block
                   height="56px"
                   outlined
                   elevation="0"
                   @click="doSubmit"
                   color="white">
              <span class="text-h6">SIGN IN</span>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
import LoginApi from "../../../api/LoginApi"

export default {
  name: "AdminLogin",
  data:() => ({
    loginId: null,
    password: null,
    token: null,
    error: {
      code: null,
      message: null,
      flag: false
    },
    rules: {
      loginId: [
        v => !!v || 'ID를 입력해주세요.',
        v => (v && v.length <= 20) || '20자를 넘길 수 없습니다.',
      ],
      password: [
        v => !!v || '비밀번호를 입력해주세요.',
        v => (v && v.length <= 20) || '20자를 넘길 수 없습니다.',
      ]
    }
  }),
  methods:{
    doSubmit: function(){
      let valid = this.$refs.frm.validate();
      if(valid) {
        // eslint-disable-next-line no-unused-vars
        LoginApi.login(this.loginId, this.password).then(res => {
          this.$store.state.auth.token = res.data.result;
          this.$router.push('/admin/home');
        }, error => {
          this.error.flag = true;
          this.error.code = error.response.status;
          this.error.message = error.response.data.message;
          setInterval(()=> {
            this.error.flag = false;
            this.error.code = null;
            this.error.message = null;
          }, 5000);
        });
      }
    }
  }
}
</script>

<style scoped>
  .admin-login{
    max-width: 660px;
    margin-top: 66px;
  }

  .admin_login_input {
    border-radius: 3px;
    height: 50px;
    border: 1px solid #c8c8c8;
    background-color: #f7f7f7;
    display: flex;
    width: 100%;
    padding: 5px;
  }

</style>