<template>
  <v-app id="inspire">
    <v-app-bar app dense v-if="this.$route.name !='login'">
      <v-icon @click="drawer = !drawer" class="icon_cart"
        >mdi-cart-variant
      </v-icon>
      <v-toolbar-title>Pondalife</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-btn rounded light color="#64B5F6" dark to="/" v-if="this.$route.name != 'home'" class="mr-3">{{ $t("home") }}</v-btn>
        <v-btn rounded light color="#64B5F6" dark to="/login" v-if="username == null">{{ $t("login") }}</v-btn>
        <v-btn rounded light color="#64B5F6" dark @click="user_logout()" v-if="username != null">{{ $t("logout") }}</v-btn>
        <v-btn @click="navigation_cart_flag = !navigation_cart_flag">123</v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      ref="navigation_cart"
      v-model="drawer"
      fixed
      :temporary="navigation_cart_flag"
      :permanent="!navigation_cart_flag"
    >
    <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="blue--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ username }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data: () => ({
      drawer: null,
      group: null,
      navigation_cart_flag: true,
    }),
    methods:{
      user_logout(){
        this.$store.dispatch("user/logout");
      }
    },
    mounted: function(){
      console.log('path : '+this.$route.name);
      console.log('username : '+this.$store.state.user.name);
    },
    computed: mapState({
      username: state => state.user.name,
    }),
  }
</script>

<style scoped>
@import "../../assets/css/style.css";
</style>