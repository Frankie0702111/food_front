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
</style>