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
            v-for="item in items"
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
          <v-list>
            <v-list-item
              v-for="item in items2"
              :key="item.text"
              link
            >
              <v-list-item-avatar>
                <img
                  :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                  alt=""
                >
              </v-list-item-avatar>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list-item
            class="mt-4"
            link
          >
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
        clipped-left
        color="white"
        dense
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
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
      items: [
        { icon: 'mdi-trending-up', text: 'Most Popular' },
        { icon: 'mdi-youtube-subscription', text: 'Subscriptions' },
        { icon: 'mdi-history', text: 'History' },
        { icon: 'mdi-playlist-play', text: 'Playlists' },
        { icon: 'mdi-clock', text: 'Watch Later' },
      ],
      // items2: [
      //   { picture: 28, text: 'Joseph' },
      //   { picture: 38, text: 'Apple' },
      //   { picture: 48, text: 'Xbox Ahoy' },
      //   { picture: 58, text: 'Nokia' },
      //   { picture: 78, text: 'MKBHD' },
      // ],
    }),
    methods:{
      user_logout(){
        this.$store.dispatch("user/logout");
      }
    },
    mounted: function(){
      // console.log(this.drawer);
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