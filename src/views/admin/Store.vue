<template>
  <v-main class="lighten-2">
    <v-card>
      <v-data-table
        :headers="table.headers"
        :items="table.data"
        class="elevation-1"
        height="82vh"
        :server-items-length="table.total"
        :footer-props="{
          itemsPerPageOptions: [10,25,50,500],
        }"
        :options.sync="table.options"
        @update:options="paginate"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog
             v-model="dialog"
             max-width="500px"
             scrollable
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ $t("create") }}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">
                    {{ textMap[dialogStatus] }}
                  </span>
                </v-card-title>
                <v-card-text style="height: 500px">
                  <v-container>
                    <v-form
                      ref="form"
                      lazy-validation
                      @submit.prevent.native>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.name"
                            :rules="form.rules.name"
                            :label="$t('store_name')"
                            clearable
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.rating"
                            :rules="form.rules.rating"
                            :label="$t('rating')"
                            suffix="0.0"
                            clearable
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.tel"
                            :rules="form.rules.tel"
                            :label="$t('tel')"
                            counter="12"
                            clearable
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.img"
                            :rules="form.rules.img"
                            :label="$t('img')"
                            clearable
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.time"
                            :rules="form.rules.time"
                            :label="$t('opening_time')"
                            suffix="週一 - 週日 上午9:00 - 下午6:00"
                            clearable
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.address"
                            :rules="form.rules.address"
                            :label="$t('address')"
                            clearable
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.latitude"
                            :rules="form.rules.latitude"
                            :label="$t('latitude')"
                            required
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.longitude"
                            :rules="form.rules.longitude"
                            :label="$t('longitude')"
                            required
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.data.distance"
                            :rules="form.rules.distance"
                            :label="$t('distance')"
                            required
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-for="cuisine in flags.cuisines"
                            :key="cuisine.key"
                            v-model="form.data.cuisines_id"
                            :rules="form.rules.cuisines"
                            :items="cuisine.data"
                            :label="cuisine.name"
                            chips
                            multiple
                            persistent-hint
                            item-text="name"
                            item-value="name_id"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-for="characteristic in flags.characteristics"
                            :key="characteristic.key"
                            v-model="form.data.characteristics_id"
                            :rules="form.rules.characteristics"
                            :items="characteristic.data"
                            :label="characteristic.name"
                            chips
                            multiple
                            persistent-hint
                            item-text="name"
                            item-value="name_id"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close()"
                  >
                    {{ $t("cancel") }}
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogStatus === 'create' ? createitem() : updateitem()"
                  >
                    {{ $t("submit") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="updatedialog(item.id)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteitem(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
        <!-- <template v-slot:no-data>
          <v-btn color="primary" @click="initialize()"> Reset </v-btn>
        </template> -->
      </v-data-table>
    </v-card>
  </v-main>
</template>

<script>
import resource from "@/api/resource";
import swal from 'sweetalert2';
const stores_resource = new resource("store");
const cuisine_resource = new resource("cuisine");
const characteristic_resource = new resource("characteristic");
export default {
  namd: "Store",
  data: () => ({
    loading: false,
    dialog: false,
    dialogStatus: 'create',
    table: {
      headers: [
        { text: "名稱", value: "name", sortable: false, align: "start" },
        { text: "評分", value: "rating", sortable: false },
        { text: "地址", value: "address", sortable: false },
        { text: "電話", value: "tel", sortable: false },
        { text: "操作", value: "actions", sortable: false },
      ],
      data: [],
      options: {
        page: 1,
        itemsPerPage: 10
      },
      total: 1,
    },

    search: {
      data: {
        page: 1,
        itemsPerPage: 10
      },
    },

    form: {
      rules: {
        name: [
          v => !!v || "請輸入店家名稱",
          // v => /^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(v) || "無效店家名稱"
        ],
        rating: [
          v => !!v || "請輸入Googla Maps 評論分數",
          v => /^(([0-9]{1}|0)\.([1-9]{1})|[0-9]{1})$/.test(v) || "無效評論分數"
        ],
        tel: [
          v => !!v || "請輸入電話號碼",
          v => /((\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4})|(09\d{2}(\d{6}|-?\d{3}-?\d{3}|-?\d{6}))$/.test(v) && v.length > 6 && v.length <= 12 || "無效電話號碼"
        ],
        img: [
          v => !!v || "請輸入圖片網址(ex.https://imgur.com/)"
        ],
        time: [
          v => !!v || "請輸入開店時間"
        ],
        address: [
          v => !!v || "請輸入地址"
        ],
        latitude: [
          v => !!v || "請輸入緯度"
        ],
        longitude: [
          v => !!v || "請輸入經度"
        ],
        distance: [
          v => !!v || "請輸入距離"
        ],
        cuisines: [
          v => !!v && v.length > 0 || "請輸入菜系"
        ],
        characteristics: [
          v => !!v && v.length > 0 || "請輸入特點"
        ]
      },
      default: {
        data: []
      },
      data: {
        latitude: "24.146496",
        longitude: "120.663581",
        distance: "1.0204794111",
      }
    },

    textMap: {
      create: "新增",
      update: "修改",
    },

    flags: {
      cuisines: [],
      characteristics: []
    },

    defaultItem: {
      name: null,
      rating: 0,
      tel: null,
      img: null,
      opening_time: null,
      address: null,
      latitude: "24.146496",
      longitude: "120.663581",
      distance: "1.0204794111",
      cuisines_id: null,
      characteristics_id: null
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.cuisines();
    this.characteristics();
  },

  methods: {
    cuisines() {
      cuisine_resource.index(this.form.data).then(response => {
        console.log("cuisines : ", response.result);
        this.flags.cuisines = response.result;
      });
    },

    characteristics() {
      characteristic_resource.index(this.form.data).then(response => {
        console.log("characteristics", response.result);
        this.flags.characteristics = response.result;
      });
    },
    index() {
      stores_resource.index(this.search.data).then((response) => {
        console.log("Admin Store data : ",response.result);
        this.table.data = response.result.data;
        this.table.total = response.result.total;
        // console.log("store data test : ",this.table.data);
      });
      // .finally(() => {
      //   this.loading = false;
      // });
    },

    // initialize() {
    //   this.index();
    // },

    createitem() {
      if(this.$refs.form.validate()) {
        console.log('match', this.form.data);
        stores_resource.store(this.form.data).then(() => {
          this.index();
          this.close();
        })
      }
    },

    updatedialog(id) {
      stores_resource.show(id).then(response => {
        this.dialogStatus = 'update';
        this.dialog = true;
        this.form.data = response.result.store;
        this.form.data.cuisines_id = response.result.cuisine;
        this.form.data.characteristics_id = response.result.characteristic;
        console.log("show form data : ", this.form.data);
      })
    },

    updateitem() {
      if(this.$refs.form.validate()) {
        console.log(this.form.data);
        stores_resource.update(this.form.data.id, this.form.data).then(() => {
          this.index();
          this.close();
        });
      }
    },

    deleteitem(id) {
      console.log("you sure?", id);
      swal.fire({
        icon: 'warning',
        title: '確定刪除?',
        showCancelButton: true,
        confirmButtonText: '確定'
      }).then((result) => {
        if(result.value) {
          stores_resource.delete(id).then(() => {
            this.index();
            swal.fire({
              icon: 'success',
              title: '刪除成功'
            });
          });
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.form.data = Object.assign({}, this.defaultItem);
        this.$refs.form.resetValidation();
        this.dialogStatus = 'create';
      });
    },

    paginate ({ page,itemsPerPage,sortBy,sortDesc }) {
      this.search.data.page = page;
      this.search.data.itemsPerPage = itemsPerPage;
      this.search.data.sortBy = sortBy[0];
      this.search.data.sortDesc = sortDesc[0];
      this.index();
    },
  },

  mounted: function () {
    console.log("Store : ", this.table.data);
  },
};
</script>
<style scoped>
</style>