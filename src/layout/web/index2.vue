<<<<<<< HEAD
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
=======
<template>
  <v-app>
    <div class="back">
      <div class="menu">
        <ul>
          <li>
            <a @click="123"><v-icon>mdi-account-reactivate-outline</v-icon>{{ $t('login') }}</a>
          </li>
          <li v-for="item in routes" :key="item.name">
            <a @click="123"><v-icon>{{ (item.icon) }}</v-icon>{{ $t(item.title) }}</a>
          </li>
          <!-- <li><a @click="123"><v-icon>mdi-cart-variant</v-icon>購物車</a></li> -->
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            clipped-right
          >
            <v-list
              nav
              dense
            >
              <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
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
                  <v-list-item-title>Account</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </ul>
      </div>
      <div class="container">
        <!-- <v-card>
          <v-tabs color="deep-purple accent-4" right>
            <v-tab>Landscape</v-tab>
            <v-tab>City</v-tab>
            <v-tab>Abstract</v-tab>

            <v-tab-item v-for="n in 3" :key="n">
              <v-container fluid>
                <v-row>
                  <v-col v-for="i in 6" :key="i" cols="12" md="4">
                    <v-img
                      :src="`https://picsum.photos/500/300?image=${
                        i * n * 5 + 10
                      }`"
                      :lazy-src="`https://picsum.photos/10/6?image=${
                        i * n * 5 + 10
                      }`"
                      aspect-ratio="1"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card> -->
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "web_layout",
  data: ()=> ({
    routes:[
      {name: "cart", title: "shopping_cart", icon:"mdi-cart-variant"}
    ],
    drawer: false,
    group: null,
  }),
  created() {},
  methods: {
    isActive(name) {
      return this.$route.name == name;
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/style.css";
>>>>>>> 755cf319a6a8f8ac997dc373bd87831f59b57fa7
</style>