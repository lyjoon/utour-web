<template>
  <div id="app" >
    <router-view/>
    <loading />
    <snackbar />
    <alert />
    <confirm />
  </div>
</template>

<script>
  import Loading from "./components/common/Loading";
  import Snackbar from "@/components/common/Snackbar";
  import Alert from "@/components/common/Alert";
  import Confirm from "@/components/common/Confirm";
  export default {
    name: 'App',
    components: {Confirm, Alert, Snackbar, Loading},
  }
</script>

<style>
  #app {
    font-family: 'Noto Sans KR', sans-serif;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  /*#app .container{min-width: 1024px}*/
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Roboto&display=swap');

  @font-face {
    /*font-family: Helvetica, Arial, sans-serif;*/
    font-family: 'noto', Apple SD Gothic Neo, 돋움, dotum, sans-serif;
  }
</style>
