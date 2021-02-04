<template>
  <v-main class="grey lighten-2">
    <v-row class="my-n3">
      <v-col cols="12" v-for="store in store_list" :key="store.id">
        <v-img :src="store.img" aspect-ratio="3"></v-img>
      </v-col>
    </v-row>

    <v-container>
        <v-container>
          <div v-for="menu_list in tmp_category" :key="menu_list.category_id">
            <h2 class="d-flex" v-text="menu_list.name"></h2>
            <v-row>
              <v-col
                cols="12"
              >
                <v-card
                  min-height="100%"
                  max-height="100%"
                  color="#FFFFFF"
                >
                  <div class="d-flex flex-no-wrap justify-space-between"
                  v-for="menu in menu_list.items" :key="menu.id">
                    <div v-for="store in store_list" :key="store.id">
                      <v-card-title
                        class="headline"
                        v-text="menu.name"
                      ></v-card-title>

                      <v-card-subtitle v-text="menu.description"></v-card-subtitle>
                      <v-card-text class="text--primary">
                        <div>{{ $t("money") }} + {{ menu.price }}</div>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn
                          class="ml-2 mt-n3"
                          fab
                          icon
                          height="40px"
                          right
                          width="40px"
                          @click="cart_additems(store.id, store.name, menu.id, menu.name, menu.price)"
                        >
                          <v-icon>mdi-clipboard-plus</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </div>

                    <v-avatar
                      class="ma-3"
                      size="125"
                      tile
                    >
                      <v-img :src="menu.productimg"></v-img>
                    </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>          
        </v-container>
    </v-container>
  </v-main>
</template>

<script>
import resource from "@/api/resource";
const menus_resource = new resource("web_menu");
const stores_resource = new resource("web_store");

export default {
  data: () => ({
    store_list: [],
    test: [],
    tmp_category: []
  }),
  created() {
    this.store_show();
    this.menus_show();
  },
  methods: {
    cart_additems(store_id, store_name, menu_id, menu_name, price) {
      this.$store.dispatch("cart/additems", {
        store_id, store_name, menu_id, menu_name, price
      });
    },
    store_show() {
      stores_resource.show(this.$route.params.id).then((response) => {
        let {result} = response;
        let {store} = result;
        this.store_list.push({
          id: store.id,
          name: store.name,
          img: store.img,
          });
      });
    },
    menus_show() {
      // console.log(this.$route);
      menus_resource.show(this.$route.params.id).then((response) => {
        let {result} = response;




        // Object.entries(result).forEach(([key, value]) => {
        //   console.log(key, value);

        //   value.forEach((e) => {
        //     // console.log(e);
        //     this.test.push({
        //       category_id: e.category.category_id,
        //       category_name: key,
        //       category_description: e.category.category_description,
        //       // items: [{
        //       //   id    : e.id,
        //       //   name  : e.name,
        //       //   price : e.price,
        //       //   productimg  : e.productimg,
        //       //   description : e.description
        //       // }],
        //     });
        //   });
        // });
        // console.log(this.test);

        // Object.keys(result).forEach((ee) => {
        //   console.log(ee, result[ee]);
        // });




        // let tmp_category = [];
        result.forEach(store_item=>{
          let categories  = store_item.category;
          let id          = store_item.id;
          let name        = store_item.name;
          let description = store_item.description;
          let price       = store_item.price;
          let productimg  = store_item.productimg;
          let save_item   = { id, name, description, price, productimg };

          categories.forEach(category_single=>{
            let category_id = category_single.id;
            let category_name = category_single.name;
            let found_idx = this.tmp_category.findIndex(i=>i.name == category_name);

            if (found_idx == -1) { // 找不到結果
                this.tmp_category.push({
                    category_id: category_id,
                    name: category_name,
                    items: [save_item],
                });
            } else { // 找到結果
                this.tmp_category[found_idx]['items'].push(save_item);
            }
          });
        });
        console.log(this.tmp_category);
      });
    },
  },
  mounted: function(){
  this.$parent.$parent.$parent.drawer = null;
  },
  destroyed: function(){
    this.$parent.$parent.$parent.drawer = '';
  }
};
</script>
<style scoped>
</style>