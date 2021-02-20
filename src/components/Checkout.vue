<template>
  <v-card-text>
    <div class="text--primary">
      {{ $t("creditcard") }}
      <v-form ref="form_checkout" lazy-validation @submit.prevent.native>
        <v-row>
          <v-col cols="6">
            <v-text-field
              ref="fullname"
              v-model="form.fullname"
              :rules="rules.fullname"
              :label="'持卡人'+$t('fullname')"
              @keyup="$emit('update:form_data_fullname', form.fullname)"
              outlined
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              ref="creditcard"
              v-model="form.creditcard"
              :rules="rules.creditcard"
              :label="$t('creditcard')+'號碼'"
              @keyup="$emit('update:form_data_creditcard', form.creditcard)"
              counter="16"
              outlined
              clearable
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              ref="valid_thru"
              v-model="form.valid_thru"
              :rules="rules.valid_thru"
              :label="$t('valid_thru')"
              @keyup="$emit('update:form_data_valid_thru', form.valid_thru)"
              suffix="月月/年年"
              outlined
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              ref="cvc"
              v-model="form.cvc"
              :rules="rules.cvc"
              :label="$t('creditcard')+$t('cvc')"
              @keyup="$emit('update:form_data_cvc', form.cvc)"
              counter="3"
              outlined
              clearable
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-btn
        text
        @click="cache_checkout()"
        color="#00B8D4"
        block
        :disabled="control.checkout_disabled"
      >
        {{ $t("submit") }}
      </v-btn>
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: "Checkout",
  props: {
    // form_checkout: { type: [String], default: null },
    form_data_fullname: { type: [String], default: null },
    form_data_creditcard: { type: [String, Number], default: null },
    form_data_valid_thru: { type: [String], default: null },
    form_data_cvc: { type: [String, Number], default: null },
    checkall_form: { type: [Boolean] }
  },
  mounted() {
    this.control.all_finish = this.checkall_form;
  },
  data: () => ({
    control: {
      checkout_disabled: true,
      all_finish: false
    },
    form: {
      fullname: null,
      creditcard: null,
      valid_thru: null,
      cvc: null
    },
    rules: {
      fullname: [
        v => !!v || '請輸入持卡人姓名'
      ],
      creditcard: [
        v => !!v || '請輸入信用卡號碼',
        v => (/\d{15,16}$/.test(v)) || '無效信用卡號碼'
      ],
      valid_thru: [
        v => !!v || '請輸入信用卡有效期限',
        v => (/[\d]{2}\/[\d]{2}$/.test(v)) || '無效有效期限'
      ],
      cvc: [
        v => !!v || '請輸入信用卡安全碼',
        v => (v && v.length >= 1 && v.length <= 3) || '長度介於 1 到 3 之間'
      ]
    },
  }),

  watch: {
    "form.valid_thru": function() {
      if(/^\d{2}$/.test(this.form.valid_thru) && this.form.valid_thru != null) {
        this.form.valid_thru += '/';
      }
    },
    /** old check_form **/
    // "$parent.$parent.$parent.check_form.all_finish": function () {
    //   if(this.$parent.$parent.$parent.check_form.all_finish == true) {
    //     this.check_form();
    //   }
    // },

    "checkall_form": function () {
      if(this.checkall_form !== false) {
        
        this.check_form();
      }
    },
    "control.all_finish": function() {
      if(this.control.all_finish !== false) {
        this.check_form();
      }
    },
  },

  methods: {
    cache_checkout() {
      if(this.$refs.form_checkout.validate()){
        alert('Validete Success!!');
      }
    },
    check_form() {
      this.control.checkout_disabled = false;
    }
  }
};
</script>
