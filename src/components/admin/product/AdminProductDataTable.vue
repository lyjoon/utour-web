<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="results"
        item-key="productId"
        page="1"
        class="elevation-0"
        :footer-props="{'itemsPerPageText':'노출건수'}"
    >
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
  </div>
</template>

<script>
export default {
  name: "AdminProductDataTable",
  computed: {
    headers(){
      return [
        {
          text: '상품 ID',
          sortable: false,
          align: 'center',
          value: 'productId',
          width: '100px'
        },
        {text: '상품명', value: 'title', sortable: false,align:'center'},
        {text: '설명', value: 'description', sortable: false,align:'center', width:'15%'},
        {
          text: '국가',
          value: 'nationName',
          sortable: false,
          align:'center',
          width: '120px'
        },
        {text: '지역/도시', value: 'areaName', sortable: false, width: '120px'},
        {text: '상품유형', value: 'productType',align:'center', width: '100px' },
        //{text: '작성일', value: 'createAt',align:'center' },
        {text: 'Actions', align:'center', width: '100px', value: 'actions' },
      ];
    }
  },
  methods: {
    editItem : function(item){
      console.log('edit.item', item);
    },
    deleteItem : function(item){
      console.log('delete.item', item);
    }
  },
  data: () =>({
    results:[
        {
      productId: 1,
      title:'정규직',
      description: '그때만큼재미있을까',
      nationName: '셉',
      areaName:'셉시티',
      productType:'호텔',
      createAt:'2022.07.15'
    },{
      productId: 1,
      title:'정규직',
      description: '그때만큼재미있을까',
      nationName: '셉',
      areaName:'셉시티',
      productType:'호텔',
      createAt:'2022.07.15'
    },{
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },
      {
        productId: 1,
        title:'정규직',
        description: '그때만큼재미있을까',
        nationName: '셉',
        areaName:'셉시티',
        productType:'호텔',
        createAt:'2022.07.15'
      },

    ]
  })
}
</script>

<style scoped>

</style>