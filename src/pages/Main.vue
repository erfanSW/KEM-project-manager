<template>
  <div>
    <q-btn flat round class="arrow text-indigo-5" @click="scrollDown" size="25px">
      <q-icon name="keyboard_arrow_down" />
    </q-btn>
    <div class="header">
      <div class="q-pa-lg row headerbar">
        <q-btn flat>رزومه ها</q-btn>
        <q-btn flat>پلن ها</q-btn>
        <q-btn flat class="bg-indigo-5 text-white">اسپانسر پرومن شوید!</q-btn>
        <q-btn flat v-if="!isUserLoggedIn" :to="{path:'login'}">ورود</q-btn>
        <q-btn flat v-else @click="_logout">خروج</q-btn>
      </div>
    </div>
    <!-- <q-btn flat outline class=" text-indigo absolute-center q-mt-xl">همین حالا تیم فضایی خودت رو بساز!</q-btn> -->
    <q-btn
      outline
      color="indigo-5"
      class="absolute-center q-mt-xl"
      label="همین حالا تیم فضایی خودت رو بساز!"
    />

    <div class="container">
      <div class="row">
        <h6
          class="col-6"
          style="margin-top:100px;color:#3F3D56"
        >زمان بندی پروژه ها را به خوبی مدیریت کنید</h6>
        <img
          src="../assets/undraw_dev_productivity_umsq.svg"
          class="col-6"
          style="height:300px"
          width="200px"
          height="200px"
          alt
        />
      </div>
      <div class="row q-mt-xl">
        <img src="../assets/undraw_selecting_team_s098.svg" class="col-6" width="200px" alt />
        <h6
          class="col-6"
          style="text-align:left;margin-top:100px"
        >تیم بسازید و مدیریت پروژه را در قالب تیم تجربه کنید</h6>
      </div>
      <div class="row q-mt-xl">
        <h6 class="col-6" style="margin-top:200px">آخرین کامیت هارا بررسی کنید</h6>
        <img src="../assets/undraw_hacker_mindset_gjwq.svg" class="col-6" width="200px" alt />
      </div>
      <div class="row q-mt-xl q-mb-xl">
        <img src="../assets/undraw_personal_info_0okl.svg" class="col-6" width="200px" alt />
        <h6 class="col-6" style="text-align:left;margin-top:100px">برای خود پروفایل و رزومه بسازید</h6>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
  computed:{
    ...mapState('account',
    [
      'isUserLoggedIn'
    ]
    )
  },
  methods: {
    scrollDown() {
      window.scrollBy({
        top: 300,
        behavior: "smooth"
      });
    },
    ...mapActions('account',
      [
        'logout'
      ]
    ),
    _logout() {
      this.logout()
    }
  },
  mounted() {
  },

};
</script>

<style scoped>
.container {
  margin-right: 300px;
  margin-left: 300px;
  margin-top: 200px;
}
.arrow {
  position: fixed;
  bottom: 50%;
}
.header {
  background-image: url("../assets/undraw_launching_125y.svg");
  background-size: 500px;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
[class*="col"] {
  color: #3f3d56 !important;
}
</style>
