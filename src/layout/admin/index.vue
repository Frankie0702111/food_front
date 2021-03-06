<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
        <MenuList :routes="menu_list()"></MenuList>
      </v-navigation-drawer>
      <v-app-bar app clipped-left color="white" dense elevation="1">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title class="mr-12 align-center">
          <span class="title">Pondalife</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row align="center" style="max-width: 100%">
          <v-spacer></v-spacer>
          <!-- <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search..."
            single-line
            append-icon="mdi-magnify"
            color="white"
            hide-details
            class="mr-5"
            style="max-width: 50%"
          ></v-text-field> -->
          <div class="text-center">
            <v-btn
              rounded
              light
              color="#64B5F6"
              dark
              to="/"
              v-if="this.$route.name != 'home'"
              class="mr-3"
              >{{ $t("front_end_layout") }}</v-btn
            >
            <v-btn
              rounded
              light
              color="#64B5F6"
              dark
              to="/login"
              v-if="username == null"
              >{{ $t("login") }}</v-btn
            >
            <v-btn
              rounded
              light
              color="#64B5F6"
              dark
              @click="user_logout()"
              v-if="username != null"
              >{{ $t("logout") }}</v-btn
            >
          </div>
        </v-row>
      </v-app-bar>
      <router-view></router-view>
    </v-app>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import MenuList from "./MenuList";
import constantRoutes from "@/router/admin";
export default {
  name: "admin_layout",
  components: { MenuList },
  data: () => ({
    drawer: null,
  }),

  methods: {
    user_logout() {
      this.$store.dispatch("user/logout");
    },
    menu_list() {
      let routes = constantRoutes;
      return routes;
    }
  },

  created() {
  },

  mounted: function () {
    console.log("username : " + this.$store.state.user.name);
  },

  computed: {
    ...mapState({
      username: (state) => state.user.name,
    }),
  },
};
</script>

<style scoped>
</style>