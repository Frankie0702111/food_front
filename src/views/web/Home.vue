<template>
  <v-main class="lighten-2">
    <v-carousel hide-delimiters progress>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>

    <v-container>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 0,
        }"
        transition="fade-transition"
      >
        <v-row>
          <v-col v-for="store_list in stores_list" v-bind:key="store_list.id" cols="3">
            <v-card class="mx-auto" max-width="350" elevation="0" @click="duplicate_store(store_list.id)">
            <!-- <v-card class="mx-auto" max-width="350" :to="{path:`/menu/${store_list.id}`}"> -->
              <div class="wei-grid">
                <v-img
                  class="white--text align-end wei-image1"
                  height="200px"
                  :src="store_list.img"
                ></v-img>
              </div>
              <v-card-subtitle class="pb-0">
                {{ store_list.name }}
                <v-card-text class="text--primary">
                  <v-row>
                    <v-rating
                      :value="store_list.rating"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="13"
                    ></v-rating>
                    <div class="grey--text ml-2">
                      {{ store_list.rating }}
                    </div>
                  </v-row>
                </v-card-text>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-lazy>
    </v-container>
  </v-main>
</template>

<script>
import resource from "@/api/resource";
const stores_resource = new resource("web_store");
export default {
  data: () => ({
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
    stores_list:[],
    isActive:false,
  }),
  created() {
    this.stores();
  },
  methods: {
    stores() {
      stores_resource.index(/**{sortDesc:'false',sortBy:'id',itemsPerPage:100,page:1}**/).then((response) => {
        /** 解構 **/
        let { result } = response;
        /** 非解構用法 **/
        // let result = response.result;

        let { data } = result;

        data.forEach((e) => {
          let name = e.name.replace(/ \(.+\)/,'');
          this.stores_list.push({
            id: e.id,
            img: e.img,
            name: name,
            rating: e.rating
          });
        });
      });
    },
    duplicate_store(store_id) {
      if(this.$store.state.cart.cartitems.length > 0 && store_id != this.$store.state.cart.cartitems[0].data.store_id){
        this.$store.dispatch("cart/deleteallitems", {store_id}).then(() => {
          this.$router.push({ path: '/menu/'+store_id });
        });
      } else {
        this.$router.push({ path: '/menu/'+store_id });
      }
    }
  },
  mounted: function(){
  }
};
</script>
<style scoped>
.v-card__subtitle, .v-card__text, .v-card__title {
  padding: 10px;
}

.wei-grid {
position: relative;
/* left: -10px;
width: 200px;
height: 200px;
margin: 0px 10px 0px 10px; */
overflow: hidden;
}

.wei-image1 {
transition: transform 1s ease;
width: 100%;
height: 100%;
}

.wei-grid:hover .wei-image1, .wei-grid:focus .wei-image1 {
transform: scale(1.4);
-ms-transform: scale(1.4);
-webkit-transform: scale(1.4);
}
</style>