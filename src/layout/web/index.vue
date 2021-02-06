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
        elevation="1"
      >
        <v-app-bar-nav-icon @click="cart_check()">
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"> -->
          <v-icon>mdi-cart-variant</v-icon>
          <v-badge
            color="blue"
            :content="this.$store.state.cart.totalcount"
            bordered
            offset-x="1"
            offset-y="-2"
            v-if="this.$store.state.cart.totalcount > 0"
          >
          </v-badge>
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
    }),
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
      console.log('totalcount : '+this.cart.totalcount);
      console.log('fullpath : '+this.$route.fullPath);
      console.log('username : '+this.$store.state.user.name);
    },
    computed: {
      ...mapState({
        username: state => state.user.name,
      }),

      // cartitems => v-for
      cartitems() {
        return this.$store.state.cart.cartitems;
      },
    }
  }
</script>

<style scoped>
@import "../../assets/css/style.css";
</style>