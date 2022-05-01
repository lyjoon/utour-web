<template>
  <v-data-table
      :headers="headers"
      :items="results"
      item-key="productId"
      class="elevation-0"
      disable-pagination
      disable-filtering
      disable-sort
      fixed-header
      hide-default-footer
      :footer-props="{'itemsPerPageText':'노출건수'}"
  >
    <template v-slot:item.file_attachment="{ item }">
      <v-icon small v-if="item.attachment">mdi-file-check</v-icon>
      <span v-if="!item.attachment">-</span>
    </template>

    <template v-slot:item.noticeYn="{ item }">
      <span>{{ item.noticeYn == 'Y' ? 'Yes' : 'No' }}</span>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)">
        mdi-pencil
      </v-icon>

      <v-icon
          small
          @click="deleteItem(item)">
        mdi-delete
      </v-icon>

    </template>

    <template v-slot:footer.page-text="items">{{items.pageStart}}/{{items.pageStop }}</template>

  </v-data-table>
</template>

<script>
export default {
  computed:{
    headers(){
      return [
        {
          text: 'No',
          sortable: false,
          align: 'center',
          value: 'noticeId',
        },
        {
          text: '제목',
          width: '50%',
          value: 'title',
          sortable: false,
          align:'start',
        },
        {text: '고정여부', value: 'noticeYn', sortable: false, align:'center'},
        {text: '등록일', value: 'createAt', sortable: false, align:'center'},
        {text: '파일유무', align:'center', width:'80px', value: 'file_attachment' },
        {text: 'Actions', align:'center', value: 'actions' },
      ];
    }
  },
  data: () =>({
    pagination: {
      page: 1,
      pageCount : null
    },
    query:null,
    results:[{
      noticeId: 4,
      title:'정규직',
      noticeYn: 'Y',
      createAt:'2022.07.15',
      attachment: true
    },{
      noticeId: 2,
      title:'내리어라',
      noticeYn: 'N',
      createAt:'2021.08.22',
      attachment: false
    }]
  }),
  methods: {
    editItem : function(item){
      this.$emit('edit', item);
    },
    deleteItem : function(item){
      //this.$emit('edit', item);
      console.log('delete.item', item);
    },
    search: function(){

    }
  }
}
</script>

<style scoped>

</style>