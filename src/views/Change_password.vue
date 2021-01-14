<template>
    <div class="card card-signin">
        <div class="card-body">
            <h5 class="card-title text-center">修改密碼</h5>
            <h3 class="card-title text-center" v-show="$store.state.user.change_password">第一次登入請先修改密碼</h3>
            <v-form
                @submit.native.prevent
                ref="form"
                lazy-validation
            >
                <v-text-field
                    rounded
                    solo
                    outlined
                    type="password"
                    v-model="form.password"
                    :rules="rules.password"
                    :label="$t('password')"
                    required     
                >      
                </v-text-field>
                <v-text-field
                    rounded
                    solo
                    outlined
                    type="password"
                    v-model="form.password_confirmation"
                    :rules="rules.password_confirmation"
                    :label="$t('password_confirmation')"
                    required     
                >      
                </v-text-field>
                <hr class="my-4">
                <v-btn width="100%" type="submit" @click="submit" x-large color="#333" dark>{{ $t('submit') }}</v-btn>
            </v-form>
        </div>
    </div>            
</template>

<script>
import { change_password } from '@/api/auth';

export default {
    name: 'change_password',
    data: () => ({
        showpassword: false,
        showpassword_confirmation: false,
        form: {
            password: null,
            password_confirmation: null,
        },
        rules: {
            password: [
                v => !!v || '請填寫密碼',
                v => (v && v.length  >= 6 && v.length  <= 12) || '長度介於 6 到 12 之間',
            ],
            password_confirmation: [
                v => !!v || '請填寫密碼',
                v => (v && v.length  >= 6 && v.length  <= 12) || '長度介於 6 到 12 之間',
            ],
        }
    }),
    created(){
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    methods: {
        submit () {
            if(this.$refs.form.validate()){
                change_password(this.form).then(() => {
                    this.$swal({
                        title:'修改密碼成功',
                        icon:'success'
                    });
                    this.$store.dispatch('user/logout')
                })
                .finally(() => { 
                });
            }
        }

    }
}
</script>

<style lang="scss" scoped>

</style>>