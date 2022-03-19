<template>
  <v-container>
    <v-layout row wrap>

      <v-flex class="admin-login mx-auto" >
        <v-card class="mx-auto pa-10" rounded elevation="1">
          <v-card-title>관리자 로그인</v-card-title>
          <v-card-subtitle>
            회원가입은 관리자에게 문의해주시기 바랍니다.
          </v-card-subtitle>

          <v-card-text>

            <div>
              <v-text-field placeholder="아이디"
                            clearable
                            prepend-inner-icon="mdi-account"
                            clear-icon="mdi-close-circle"
                            outlined
                            hide-details />
            </div>
            <div class="mt-2">
              <v-text-field type="password"
                            clearable
                            prepend-inner-icon="mdi-lock-question"
                            clear-icon="mdi-close-circle"
                            placeholder="비밀번호"
                            outlined />
            </div>

            <div>
              <v-checkbox class="mt-0" hide-details dense label="로그인유지" />
            </div>
          </v-card-text>

          <v-card-actions class="pl-4 pr-4">
            <v-btn class="primary"
                   block
                   height="56px"
                   outlined
                   elevation="0"
                   to="/admin/main"
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
export default {
  name: "Login"
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