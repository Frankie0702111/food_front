import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import createPersistedState from 'vuex-persistedstate'

// import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
	modules: {
    user,
    cart,
    // permission,
   },
})
