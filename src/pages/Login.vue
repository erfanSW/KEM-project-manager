<template>
  <div class="container">
    <q-card class="absolute-center" style="width:600px">
      <q-badge @click.native="back" color="blue" align="bottom">
        <q-btn flat outline class="text-white" id="backbtn">
          <q-icon name="keyboard_return"/>
        </q-btn>
      </q-badge>
      <q-card-section class="card-title text-white q-mt-md">
        <div class="row q-pa-md">
          <div class="col-6 q-mr-xl">
            <q-input type="text" label="ایمیل" v-model="user.email" stack-label></q-input>
            <q-input class="q-mt-sm" type="password" label="کلمه عبور" v-model="user.password" stack-label></q-input>
          <q-btn outline class="text-indigo q-mt-lg full-width" :loading="login_loading" :disable="!user.email && !user.password" label="ورود"
                   @click="login">
              <template v-slot:loading>
                <q-spinner-radio/>
              </template>
            </q-btn>
          </div>
          <img
            class="col-6 q-ml-lg"
            src="../assets/undraw_Login_v483.svg"
            width="50px"
            style="width:140px;height:200px"
            alt
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import AuthenticationService from "../services/AuthenticationService";
  import {mapActions} from "vuex";

  export default {
    data() {
      return {
        cb: false,
        user: {
          email: null,
          password: null
        },
        login_loading: false
      };
    },
    methods: {
      back() {
        this.$router.push({
          name: 'main'
        });
      },
      login() {
        this.login_loading = true
        AuthenticationService
          .login(this.user)
          .then((res) => {
            this.login_loading = false
            this.$q.cookies.set('user', res.data.user, {
              expires: res.data.expires_in + 's'
            })
            this.$q.cookies.set('token', res.data.token, {
              expires: res.data.expires_in + 's'
            })
            this.back()
          })
          .catch((error) => {
            this.login_loading = false
            console.log(error.response)
            this.$q.notify({
              message: error.response,
              color: "red"
            })
          })
      },
      logout() {

      }
    },
    beforeCreate() {
      if (this.$store.getters['account/isUserLoggedIn']) {
        this.$router.go(-1)
      }
    }
  };
</script>

<style scoped>
  /* #backbtn {
    position: fixed;
    margin-top: 20%;
  } */
</style>
