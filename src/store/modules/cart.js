const state = {
  cartitems: [],
};

const mutations = {
  ADD_TO_CART: (state, {store_id, store_name, menu_id, menu_name, price}) => {
    let data = {
      store_id,
      store_name,
      menu_id,
      menu_name,
      price,
      count: 1
    };
    state.cartitems.push({data});
  },
  ADDCOUNT_TO_CART: (state, {menu_id}) => {
    let cartitem = state.cartitems.find(item => item.data.menu_id === menu_id);
    cartitem.data.count++;
  },
  DELETE_ITEM_TO_CART: (state, {menu_id}) => {
    let cartitem = state.cartitems.find(item => item.data.menu_id === menu_id);
    state.cartitems.splice(cartitem, 1);
  },
  DELETE_ALL_ITEM_TO_CART: (state, {store_id}) => {
    let cartitem = state.cartitems.find(item => item.data.store_id != store_id);
    if(cartitem){
      state.cartitems = [];
    }
  }
};

const actions = {
  additems({state, commit}, {store_id, store_name, menu_id, menu_name, price}) {
    let itemincart = state.cartitems.find(item => {
      return item.data.menu_id === menu_id;
    });
    if(itemincart) {
      commit('ADDCOUNT_TO_CART', {menu_id});
    }else{
      commit('ADD_TO_CART', {store_id, store_name, menu_id, menu_name, price});
    }
  },
  deleteitem({commit}, {menu_id}) {
    commit('DELETE_ITEM_TO_CART', {menu_id});
  },
  deleteallitems({commit}, {store_id}) {
    commit('DELETE_ALL_ITEM_TO_CART', {store_id});
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
