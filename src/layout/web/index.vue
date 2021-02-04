<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer
        ref="navigation_cart"
        v-model="drawer"
        app
        clipped
      >
        <v-list dense>
          <v-list-item
            v-for="item in cartitems"
            :key="item.data.menu_id"
          >
            <v-list-item-action>
              <v-btn
                class="mr-n3"
                fab
                icon
                height= "35px"
                width= "35px"
                @click="cart_destroy(item.data.menu_id)"
              >
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.data.menu_name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('money')+' : '+item.data.price }}
                {{ $t('quantity')+' : '+item.data.count }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
        clipped-left
        color="white"
        dense
      >
        <v-app-bar-nav-icon @click="cart_check()">
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"> -->
          <v-icon>mdi-cart-variant</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title class="mr-12 align-center">
          <span class="title">Pondalife</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row
          align="center"
          style="max-width: 100%"
        >
        <v-spacer></v-spacer>
          <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search..."
            single-line
            append-icon="mdi-magnify"
            color="white"
            hide-details
            class="mr-5"
            style="max-width: 50%"
          ></v-text-field>
          <div class="text-center">
            <v-btn rounded light color="#64B5F6" dark to="/" v-if="this.$route.name != 'home'" class="mr-3">{{ $t("home") }}</v-btn>
            <v-btn rounded light color="#64B5F6" dark to="/login" v-if="username == null">{{ $t("login") }}</v-btn>
            <v-btn rounded light color="#64B5F6" dark @click="user_logout()" v-if="username != null">{{ $t("logout") }}</v-btn>
          </div>
        </v-row>
      </v-app-bar>

      <router-view></router-view>
      <!-- <v-main>
        <v-container class="fill-height">
          <v-row
            justify="center"
            align="center"
          >
            <v-col class="shrink">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :href="source"
                    icon
                    large
                    target="_blank"
                    v-on="on"
                  >
                    <v-icon large>mdi-code-tags</v-icon>
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-main> -->
    </v-app>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data: () => ({
      drawer: false,
      cart: {
        totalcount: null,
      },
      // newcart:[],
    }),
    watch: {
      // newcart:function(){
      //   //重新做items
      //   //統計總數量
      // },
      'cart.totalcount': function (){
        this.totalcount = 0;
        this.$store.state.cart.cartitems.forEach((e) => {
          this.totalcount += e.data.count;
        });
        console.log(this.totalcount);
      },
      '$store.state.cart.cartitems': function (){
        if(this.$store.state.cart.cartitems.length < 1){
          this.totalcount = 0;
        }
        console.log(this.totalcount);
      }
    },
    methods:{
      user_logout() {
        this.$store.dispatch("user/logout");
      },
      cart_destroy(menu_id) {
        this.$store.dispatch("cart/deleteitem", {menu_id});
      },
      cart_check() {
        if(this.$store.state.cart.cartitems.length > 0 && this.$route.fullPath != '/menu/'+this.$store.state.cart.cartitems[0].data.store_id) {
          this.$router.push({ path: '/menu/'+this.$store.state.cart.cartitems[0].data.store_id });
        } else {
          this.drawer = !this.drawer;
        }
      }
    },
    mounted: function(){
      // console.log(this.drawer);
      console.log('fullpath : '+this.$route.fullPath);
      console.log('path : '+this.$route.name);
      console.log('username : '+this.$store.state.user.name);
    },
    computed: {
      ...mapState({
        username: state => state.user.name,
      }),
      
      // cartitems => v-for
      cartitems() {
        console.log(this.$store.state.cart.cartitems);
        this.$store.state.cart.cartitems.forEach((e) => {
          this.cart.totalcount += e.data.count;
        });
        return this.$store.state.cart.cartitems;
      },
    }
  }
</script>

<style scoped>
@import "../../assets/css/style.css";
</style>