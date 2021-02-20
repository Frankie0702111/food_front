const state = {
  cartitems: [],
  totalcount: 0,
  totalprice: 0,
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
    state.totalcount ++;
    state.totalprice += price;
    console.log(`ADD_TO_CART: ${state.totalcount}`);
    console.log(`ADD_TO_CART - totalprice: ${state.totalprice}`);
    state.cartitems.push({data});
  },
  ADDCOUNT_TO_CART: (state, {menu_id, price}) => {
    let cartitem = state.cartitems.find(item => item.data.menu_id === menu_id);
    cartitem.data.count++;
    state.totalcount++;
    state.totalprice += price;
    console.log(`ADDCOUNT_TO_CART: ${state.totalcount}`);
    console.log(`ADDCOUNT_TO_CART - totalprice: ${state.totalprice}`);
  },
  DELETE_ITEM_TO_CART: (state, {menu_id, totalprice}) => {
    let cartitem = state.cartitems.find(item => item.data.menu_id === menu_id);
    let remaining = state.cartitems.filter(i => i.data.menu_id != cartitem.data.menu_id);
    console.log(remaining);
    state.cartitems = remaining;
    // state.cartitems.splice(cartitem, 1);
    state.totalcount -= cartitem.data.count;
    state.totalprice -= totalprice;
    console.log(`DELETE_ITEM_TO_CART: ${state.totalcount}`);
    console.log(`DELETE_ITEM_TO_CART - totalprice: ${state.totalprice}`);
  },
  DELETE_ALL_ITEM_TO_CART: (state, {store_id}) => {
    let cartitem = state.cartitems.find(item => item.data.store_id != store_id);
    if(cartitem){
      state.cartitems = [];
      state.totalcount = 0;
      state.totalprice = 0;
    }
    console.log(`DELETE_ALL_ITEM_TO_CART: ${state.totalcount}`);
    console.log(`DELETE_ALL_ITEM_TO_CART - totalprice: ${state.totalprice}`);
  }
};

const actions = {
  additems({state, commit}, {store_id, store_name, menu_id, menu_name, price}) {
    let itemincart = state.cartitems.find(item => {
      return item.data.menu_id === menu_id;
    });
    if(itemincart) {
      commit('ADDCOUNT_TO_CART', {menu_id, price});
    }else{
      commit('ADD_TO_CART', {store_id, store_name, menu_id, menu_name, price});
    }
  },
  deleteitem({commit}, {menu_id, totalprice}) {
    commit('DELETE_ITEM_TO_CART', {menu_id, totalprice});
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
