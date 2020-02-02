<template>
  <div class="container">
    <q-card class="absolute-center my-card task-container">
      <q-badge @click.native="back" color="blue" align="bottom">
        <q-btn flat outline class="text-white" id="backbtn">
          <q-icon name="keyboard_return" />
        </q-btn>
      </q-badge>
      <q-card-section class="card-title text-white q-mt-md">
        <div class="row a-pa-md">
          <div class="col-6 q-mr-xl">
            <q-input type="text" label="نام کاربری" stack-label></q-input>
            <q-input class="q-mt-sm" type="password" label="کلمه عبور" stack-label></q-input>
            <q-checkbox
              class="text-indigo-5 q-mt-lg"
              v-model="cb"
              label="قوانین و مقررات را میپذیرم"
            />
            <q-btn outline class="text-indigo q-mt-lg full-width" label="ورود"></q-btn>
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
export default {
  data() {
    return {
      cb: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
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