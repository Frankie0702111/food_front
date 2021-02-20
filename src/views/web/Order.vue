<template>
  <v-main class="lighten-2">
    <v-container>
      <v-row>
        <v-col cols="7">
          <v-row>
            <v-col cols="12">
              <template>
                <v-card class="mx-auto" max-width="100%">
                  <v-card-text>
                    <p class="display-1 text--primary mb-6">
                      <v-avatar color="#00BCD4" size="25" rounded>
                        <span class="white--text headline">1</span>
                      </v-avatar>
                      送餐詳情
                    </p>
                    <div class="text--primary">
                      <v-form
                        ref="form_address"
                        lazy-validation
                        @submit.prevent.native
                      >
                        <v-text-field
                          ref="address"
                          v-model="form.address"
                          :rules="rules.address"
                          :label="'送餐' + $t('address')"
                          counter="35"
                          outlined
                          clearable
                          required
                          :disabled="control.address_disabled"
                        ></v-text-field>
                      </v-form>
                      <v-btn
                        text
                        @click="cache_address(form.address)"
                        color="#00B8D4"
                        block
                        :disabled="control.address_disabled"
                      >
                        {{ $t("submit") }}
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </template>
            </v-col>

            <v-col cols="12">
              <template>
                <v-card class="mx-auto" max-width="100%">
                  <v-card-text>
                    <p class="display-1 text--primary mb-6">
                      <v-avatar color="#00BCD4" size="25" rounded>
                        <span class="white--text headline">2</span>
                      </v-avatar>
                      個人資料
                    </p>
                    <div class="text--primary">
                      <v-form
                        ref="form_detail"
                        lazy-validation
                        @submit.prevent.native
                      >
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              ref="email"
                              v-model="form.email"
                              :rules="rules.email"
                              :label="$t('email')"
                              outlined
                              clearable
                              required
                              :disabled="control.detail_disabled"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              ref="firstname"
                              v-model="form.firstname"
                              :rules="rules.firstname"
                              :label="$t('firstname')"
                              outlined
                              clearable
                              required
                              :disabled="control.detail_disabled"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="form.lastname"
                              :rules="rules.lastname"
                              :label="$t('lastname')"
                              outlined
                              clearable
                              required
                              :disabled="control.detail_disabled"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              ref="phone"
                              v-model="form.phone"
                              :rules="rules.phone"
                              :label="$t('phone')"
                              counter="10"
                              outlined
                              clearable
                              required
                              :disabled="control.detail_disabled"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-btn
                        text
                        @click="
                          cache_user_data(
                            form.email,
                            form.firstname,
                            form.lastname,
                            form.phone
                          )"
                        color="#00B8D4"
                        block
                        :disabled="control.detail_disabled"
                      >
                        {{ $t("submit") }}
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </template>
            </v-col>

            <v-col cols="12">
              <template>
                <v-card class="mx-auto" max-width="100%">
                  <v-card-text>
                    <p class="display-1 text--primary mb-6">
                      <v-avatar color="#00BCD4" size="25" rounded>
                        <span class="white--text headline">3</span>
                      </v-avatar>
                      付款方式
                    </p>
                    <v-row>
                      <v-col cols="6">
                        <v-card
                          class="mx-auto"
                          max-width="200"
                          max-height="200"
                          elevation="0"
                          style="border: solid 1px #e0e0e0"
                          @click="check_cod_or_creditcard('cod')"
                        >
                          <v-card-title class="justify-center">
                            <v-icon size="80px" color="#2E7D32">
                              mdi-cash-multiple
                            </v-icon>
                          </v-card-title>
                          <v-card-text class="text-center"
                            >貨到付款</v-card-text
                          >
                        </v-card>
                      </v-col>
                      <v-col cols="6">
                        <v-card
                          class="mx-auto"
                          max-width="200"
                          max-height="200"
                          elevation="0"
                          style="border: solid 1px #e0e0e0"
                          @click="check_cod_or_creditcard('creditcard')"
                        >
                          <v-card-title class="justify-center">
                            <v-icon size="80px"
                              >mdi-credit-card-wireless</v-icon
                            >
                          </v-card-title>
                          <v-card-text class="text-center">信用卡</v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                    <Checkout
                      :form_checkout="form_data.form_checkout"
                      :form_data_fullname.sync="form_data.fullname"
                      :form_data_creditcard.sync="form_data.creditcard"
                      :form_data_valid_thru.sync="form_data.valid_thru"
                      :form_data_cvc.sync="form_data.cvc"
                      :checkall_form="check_form.all_finish"
                      v-if="control.creditcard"
                    ></Checkout>
                    <Cod
                    :checkall_form="check_form.all_finish"
                    v-if="control.cod"
                    ></Cod>
                  </v-card-text>
                </v-card>
              </template>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5">
          <template>
            <v-card class="mx-auto" max-width="100%" elevation="0">
              <v-card-text>
                <p
                  class="title text--primary"
                  v-if="$store.state.cart.cartitems.length > 0"
                >
                  {{
                    "您的訂單" + $store.state.cart.cartitems[0].data.store_name
                  }}
                </p>
                <div
                  class="text--primary d-flex"
                  v-for="cartitem in cartitems"
                  :key="cartitem.data.menu_id"
                >
                  <v-row>
                    <v-col cols="1" class="font-weight-bold text--primary">
                      {{ cartitem.data.count }}
                    </v-col>
                    <v-col cols="1" class="text--primary ml-n3"> X </v-col>
                    <v-col cols="6" class="text--primary ml-n3">
                      {{ cartitem.data.menu_name }}
                    </v-col>
                    <v-col cols="2" class="text--primary">
                      {{ $t("money") + cartitem.data.price }}
                    </v-col>
                  </v-row>
                </div>
                <v-row>
                  <v-col cols="10">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
                <v-row justify="space-between" class="title text--primary">
                  <v-col cols="5">
                    {{ $t("totalprice") }}
                  </v-col>
                  <v-col cols="5">
                    {{ $t("money") + $store.state.cart.totalprice }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Checkout from "@/components/Checkout";
import Cod from "@/components/Cod";
// import resource from "@/api/resource";
// const stores_resource = new resource("web_store");
export default {
  name: "Order",
  components: { Checkout, Cod },
  data: () => ({
    control: {
      address_disabled: false,
      detail_disabled: false,
      cod: true,
      creditcard: false,
    },
    check_form: {
      address_finish: false,
      details_finish: false,
      all_finish: false,
    },
    form: {
      address: null,
      email: null,
      firstname: null,
      lastname: null,
      phone: "09",
      fullname: null,
    },
    form_data: {
      address: null,
      email: null,
      firstname: null,
      lastnameL: null,
      phone: null,
      fullname: null,
      creditcard: null,
      valid_thru: null,
      cvc: null,
      form_checkout: null,
    },
    rules: {
      firstname: [(v) => !!v || "請輸入您的姓氏"],
      lastname: [(v) => !!v || "請輸入您的名字"],
      address: [
        (v) => !!v || "請輸入您的送餐地址",
        (v) =>
          (v && v.length >= 1 && v.length <= 35) || "長度介於 1 到 35 之間",
      ],
      email: [
        (v) => !!v || "請輸入您的電子郵件",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            v
          ) || "無效電子郵件",
      ],
      phone: [
        (v) => !!v || "請輸入您的手機號碼",
        (v) => (/^[0-9]\d{9}$/.test(v) && v.length == 10) || "無效手機號碼",
      ],
    },
  }),

  watch: {
    // "form.phone": function(newval) {
    //   this.test111(newval);
    // },
    // "form_data.fullname": function() {
    //   if(this.form_data.fullname != null) {
    //     console.log('order watch fullname: ',this.form_data.fullname);
    //   }
    // }
    "$store.state.totalcount": function() {
      this.check_cart();
    }
  },

  created() {
    this.check_toke();
    this.check_cart();
  },

  methods: {
    cache_address(address) {
      console.log(this.$refs);
      // console.log(this.$refs.address.$options.propsData.value);
      if (this.$refs.form_address.validate()) {
        this.form_data.address = address;
        this.control.address_disabled = true;
        this.check_form.address_finish = true;
        if (
          this.check_form.address_finish == true &&
          this.check_form.details_finish == true
        )
          this.check_form.all_finish = true;
        alert("Get cache_address - Success");
      }
      console.log("cache_address : ", this.form_data);
    },
    cache_user_data(email, firstname, lastname, phone) {
      if (this.$refs.form_detail.validate()) {
        this.form_data.email = email;
        this.form_data.firstname = firstname;
        this.form_data.lastnameL = lastname;
        this.form_data.phone = phone;
        this.control.detail_disabled = true;
        this.check_form.details_finish = true;
        if (
          this.check_form.address_finish == true &&
          this.check_form.details_finish == true
        )
          this.check_form.all_finish = true;
        alert("Get cache_user_data - Success");
      }
      console.log("cache_user_data : ", this.form_data);
    },

    check_cod_or_creditcard(distinguish) {
      if(distinguish == 'cod') {
        this.control.cod = true;
        this.control.creditcard = false;
      } else if(distinguish == 'creditcard') {
        this.control.cod = false;
        this.control.creditcard = true;
      } else {
        this.control.cod = false;
        this.control.creditcard = false;
      }
    },
    check_toke(){
      if(this.$store.state.user.token == null){
        this.$router.push({ path: '/login/' });
      }
    },
    check_cart(){
      if(this.$store.state.cart.totalcount == 0 && this.$route.fullPath == '/order') {
        this.$router.push({ path: '/' });
      }
    }
    // test watch table value from "form.phone"
    // test111(value) {
    //   console.log(value);
    // }
  },

  mounted: function () {
    console.log("origin : ", this.form_data);
    console.log("vuex cart : ", this.$store.state.cart);
  },

  computed: {
    cartitems() {
      return this.$store.state.cart.cartitems;
    },
  },
};
</script>

<style scoped>
</style>