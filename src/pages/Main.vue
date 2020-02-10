<template>
  <div :class="{grey_overlay:grey_overlay}">
    <q-btn flat class="bg-indigo-3 text-white arrow" @click="startvideo">
      راهنما
      <q-icon name="play_arrow"/>
    </q-btn>
    <img src="../assets/undraw_launching_125y.svg" v-if="grey_overlay" width="100px" class="bg-indigo-3 text-white overlay_content">
    <div class="header">
      <div class="q-pa-lg row headerbar">
        <q-btn flat>رزومه ها</q-btn>
        <q-btn flat>پلن ها</q-btn>
        <q-btn flat class="bg-indigo-5 text-white">اسپانسر پرومن شوید!</q-btn>
        <q-btn flat v-if="isUserLoggedIn" :to="{path:'team'}">داشبورد</q-btn>
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
          style="margin-top:100px;color:#3F3D56;height: 40px"
          :class="{whiteboard:firstwb}"
        >زمان بندی پروژه ها را به خوبی مدیریت کنید</h6>
        <img
          src="../assets/undraw_dev_productivity_umsq.svg"
          class="col-6"
          style="height:300px"
          :class="{whiteboard:firstwb}"
          width="200px"
          height="200px"
          alt
        />
      </div>
      <div class="row q-mt-xl">
        <img src="../assets/undraw_selecting_team_s098.svg" class="col-6" :class="{whiteboard:secondwb}" width="200px"
             alt/>
        <h6
          class="col-6"
          style="text-align:left;margin-top:100px;height: 40px"
          :class="{whiteboard:secondwb}"
        >تیم بسازید و مدیریت پروژه را در قالب تیم تجربه کنید</h6>
      </div>
      <div class="row q-mt-xl">
        <h6 class="col-6" style="margin-top:200px;height: 40px" :class="{whiteboard:thirdwb}">آخرین کامیت هارا بررسی کنید</h6>
        <img src="../assets/undraw_hacker_mindset_gjwq.svg" class="col-6" :class="{whiteboard:thirdwb}" width="200px"
             alt/>
      </div>
      <div class="row q-mt-xl">
        <img src="../assets/undraw_personal_info_0okl.svg" class="col-6" :class="{whiteboard:fourthwb}" width="200px" alt/>
        <h6 class="col-6" style="text-align:left;margin-top:100px;height: 40px" :class="{whiteboard:fourthwb}">برای خود پروفایل و رزومه بسازید</h6>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        grey_overlay: false,
        whiteboard: false,
        firstwb: false,
        secondwb: false,
        thirdwb: false,
        fourthwb: false
      }
    },
    computed: {
      ...mapState('account',
        [
          'isUserLoggedIn'
        ]
      )
    },
    methods: {
      scroll_handler(top) {
        window.scroll({
          top: top,
          behavior: "smooth",
          left: 30
        });
      },
      ...mapActions('account',
        [
          'logout'
        ]
      ),
      _logout() {
        this.logout()
      },
      startvideo() {
        this.grey_overlay = true;
        this.firstwb = true
        this.scroll_handler(200)
        setTimeout(() => {
          this.firstwb = false
          this.scroll_handler(720);
          this.secondwb = true;
          setTimeout(() => {
            this.secondwb = false
            this.scroll_handler(1000);
            this.thirdwb = true
            setTimeout(() => {
              this.thirdwb = false
              this.scroll_handler(1300);
              this.fourthwb = true
              setTimeout(() => {
                this.grey_overlay = false;
                this.scroll_handler(0)
              },3000)
            }, 1000);
          }, 1000);
        }, 1000);

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
    bottom: 93%;
    right: 0;
  }

  .overlay_content {
    position: fixed;
    bottom: 60%;
    transition: position 1s;
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


  .grey_overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .whiteboard {
    padding: 10px;
    background-color: white;
    color: white;
    border-radius: 10px;
    transition: background-color,transform 1s ease-in;
  }
</style>
