<template>
  <v-list>
    <div
      v-for="(item, i) in routes"
      :key="i"
    >
      <template v-if="checkChild(item)">
        <v-list-item
          v-if="hasOneChild(item)"
          :to="resolvePath(item.path,item)"
          ripple="ripple"
        >
          <v-list-item-icon>
            <v-icon>{{ getListIcon(item) }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ getListTitle(item) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          :prepend-icon="getListIcon(item)"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ getListTitle(item) }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <Menu-List
            :routes="item.children"
            :base-path="resolvePath(item.path)"
          />
        </v-list-group>
      </template>
    </div>
  </v-list>
</template>

<script>
import { resolve } from 'path';
export default {
  name: "MenuList",
  props: {
    routes: { type: Array, default: () => {} },
    basePath: { type: String, default: '' }
  },

  data: () => ({}),

  methods: {
    checkChild(item) {
      if(item.children && item.children.length == 0) {
        return false;
      }
      return true;
    },

    hasOneChild(item) {
      if(!item.children){
        return true;
      }
      if(item.children && item.name == "dashboard") {
        return true;
      }
      return false;
    },

    resolvePath(path, item = {}) {
      if(item.redirect) return item.redirect;
      return resolve(this.basePath, path);
    },

    getListIcon(item) {
      return item.meta ? item.meta.icon : ' ';
    },

    getListTitle(item) {
      return item.meta ? item.meta.title : ' ';
    }
  },
};
</script>

<style scoped>
</style>