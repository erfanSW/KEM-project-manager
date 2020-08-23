<template>
  <div>
    <q-card class="absolute-center my-card task-container container">
      <q-badge @click.native="back" color="blue" align="bottom">
        <q-btn flat outline class="text-white" id="backbtn">
          <q-icon name="keyboard_return" />
        </q-btn>
      </q-badge>
      <q-card-section class="card-title text-white q-mt-md">
        <div class="row a-pa-md q-mb-lg">
          <div class="col-6 q-mr-xl">
            <q-input type="text" label="ایمیل" v-model="user.email" stack-label></q-input>
            <q-input class="q-mt-sm" type="password" label="کلمه عبور" v-model="user.password" stack-label></q-input>
            <q-checkbox
              class="text-indigo-5 q-mt-lg"
              v-model="cb"
              label="قوانین و مقررات را میپذیرم"
            />
            <q-btn outline class="q-mt-lg" :loading="login_loading" style="color: #6A61FA;width: 99%" :disable="!cb" color="#6A61FA" label="ثبت نام" @click="signup">
              <template v-slot:loading>
                <q-spinner-radio />
              </template>
            </q-btn>
          </div>
          <img
            class="col-6 q-ml-lg signupimg"
            src="../assets/undraw_welcome_cats_thqn.svg"
            width="100px"
            style="width:220px;height:200px"
            alt
          />
        </div>
        <router-link :to="{name: 'login'}" class="routerlink">قبلا اکانت داشته اید؟</router-link>
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
    signup() {
      this.login_loading = true
      AuthenticationService
        .signup(this.user)
        .then((res) => {
          this.login_loading = false
          this.$router.push({
          name: 'login'
        })
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
  .container{
    width: 650px;
  }
  .routerlink {
    text-decoration: none;
    font-size: 13px;
    color: #6A61FA;
  }
  .signupimg {
    transition: transform 20s ease;
  }
  .signupimg:hover {
    transform: rotate(1440deg);
    transform-origin: center;
  }
</style>
