<template>
  <v-card-text>
    <div class="text--primary">
      {{ $t("cod") }}
    </div>
    <p>當司機抵達時請直接付款給司機</p>
    <v-btn
      text
      @click="cache_checkout()"
      color="#00B8D4"
      block
      :disabled="control.checkout_disabled"
    >
      {{ $t("submit") }}
    </v-btn>
  </v-card-text>
</template>

<script>
export default {
  name: "Cod",
  props: {
    checkall_form: { type: [Boolean] },
  },

  mounted() {
    this.control.all_finish = this.checkall_form;
  },

  data: () => ({
    control: {
      checkout_disabled: true,
      all_finish: false,
    },
  }),

  watch: {
    "checkall_form": function () {
      if(this.checkall_form !== false) {
        this.check_form();
      }
    },
    "control.all_finish": function () {
      if (this.control.all_finish !== false) {
        this.check_form();
      }
    },
  },

  methods: {
    cache_checkout() {
      alert("Success!!");
    },
    check_form() {
      this.control.checkout_disabled = false;
    },
  }
};
</script>
