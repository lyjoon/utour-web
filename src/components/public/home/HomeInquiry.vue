<template>
  <v-card elevation="0" class="pt-5 pb-7 pl-5 pr-5 rounded-lg">
    <div class="title font-weight-bold">여행문의하기</div>
    <div class="mt-4">
      <inquiry-form />
    </div>
  </v-card>
</template>

<script>
import InquiryForm from "@/components/public/inquiry/InquiryForm";
export default {
  name: "HomeInquiry",
  components: {InquiryForm}
}
</script>

<style scoped>

</style>