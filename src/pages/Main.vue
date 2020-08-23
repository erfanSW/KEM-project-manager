<template>
  <div :class="{grey_overlay:grey_overlay}" class="maincontainer">
    <q-btn flat class="bg-indigo-3 text-white arrow" @click="startvideo">
      راهنما
      <q-icon name="play_arrow" />
    </q-btn>
    <img
      src="../assets/undraw_launching_125y.svg"
      v-if="grey_overlay"
      width="100px"
      class="bg-indigo-3 text-white overlay_content"
    />
    <div class="header">
      <div class="q-pa-lg row headerbar">
        <q-btn flat class="text-blue-grey-8 hide-in-mobile">رزومه ها</q-btn>
        <q-btn flat class="text-blue-grey-8 hide-in-mobile">پلن ها</q-btn>
        <q-btn flat class="bg-indigo-5 text-white hide-in-mobile">اسپانسر پرومن شوید!</q-btn>
        <q-btn
          flat
          v-if="$q.cookies.get('token')"
          :to="{path:'/project'}"
          class="text-blue-grey-8"
        >داشبورد</q-btn>
        <q-btn flat v-if="!$q.cookies.get('token')" :to="{name:'signup'}">ثبت نام</q-btn>
        <q-btn flat v-if="!$q.cookies.get('token')" :to="{name:'login'}">ورود</q-btn>
        <q-btn flat v-else @click="_logout" class="text-blue-grey-8">خروج</q-btn>
      </div>
    </div>
    <q-btn
      outline
      color="indigo-5"
      id="blog_btn"
      class="q-mt-xl"
      label="همین الان تجربیات دیگران رو بخون!"
      :to="{path:'blog'}"
    />

    <div class="container">
      <div class="row">
        <div
          class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-h6 text-justify"
          :class="{whiteboard:firstwb}"
        >
          زمان بندی پروژه ها را به خوبی مدیریت کنید
          <div class="text-caption">
            لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.
            <div style="font-size: 14px;" class="text-blue-grey-8 q-mt-lg">
              <q-btn label="ایجاد پروژه" class="bg-indigo-5 text-white" style="width: 130px;" />
            </div>
          </div>
        </div>
        <img
          src="../assets/undraw_dev_productivity_umsq.svg"
          class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mt-lg"
          style="height:200px"
          :class="{whiteboard:firstwb}"
          width="200px"
          height="200px"
          alt
        />
      </div>

      <div class="row q-mt-xl">
        <div
          class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-h6 text-justify"
          :class="{whiteboard:firstwb}"
        >
          تیم بسازید و مدیریت پروژه را در قالب تیم تجربه کنید
          <div class="text-caption">
            لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.
            <div style="font-size: 14px;" class="text-blue-grey-8 q-mt-lg">
              <q-btn label="ایجاد پروژه" class="bg-indigo-5 text-white" style="width: 130px;" />
            </div>
          </div>
        </div>
        <img
          src="../assets/undraw_selecting_team_s098.svg"
          class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mt-lg"
          style="height:200px"
          :class="{whiteboard:firstwb}"
          width="200px"
          height="200px"
          alt
        />
      </div>

      <div class="row" style="margin-bottom: 100px">
        <div
          class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-h6 text-justify"
          :class="{whiteboard:firstwb}"
        >
          برای خود پروفایل و رزومه
          بسازید
          <div class="text-caption">
            لورم ایپسوم یا طرح‌نما به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد.
            <div style="font-size: 14px;" class="text-blue-grey-8 q-mt-lg">
              <q-btn label="ایجاد پروژه" class="bg-indigo-5 text-white" style="width: 130px;" />
            </div>
          </div>
        </div>
        <img
          src="../assets/undraw_hacker_mindset_gjwq.svg"
          class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mt-lg"
          style="height:200px"
          :class="{whiteboard:firstwb}"
          width="200px"
          height="200px"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      grey_overlay: false,
      whiteboard: false,
      firstwb: false,
      secondwb: false,
      thirdwb: false,
      fourthwb: false,
    };
  },
  computed: {
    ...mapState("account", ["isUserLoggedIn"]),
  },
  methods: {
    scroll_handler(top) {
      window.scroll({
        top: top,
        behavior: "smooth",
        left: 30,
      });
    },
    ...mapActions("account", ["logout"]),
    _logout() {
      this.$q.cookies.set("user", null);
      this.$q.cookies.set("token", null);
      this.$router.go(0)
    },
    startvideo() {
      this.grey_overlay = true;
      this.firstwb = true;
      this.scroll_handler(200);
      setTimeout(() => {
        this.firstwb = false;
        this.scroll_handler(720);
        this.secondwb = true;
        setTimeout(() => {
          this.secondwb = false;
          this.scroll_handler(1000);
          this.thirdwb = true;
          setTimeout(() => {
            this.thirdwb = false;
            this.scroll_handler(1300);
            this.fourthwb = true;
            setTimeout(() => {
              this.grey_overlay = false;
              this.scroll_handler(0);
            }, 3000);
          }, 1000);
        }, 1000);
      }, 1000);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.container {
  margin-top: 200px;
  margin: 200px;
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 100px 0px;
    padding: 10px;
  }

  .hide-in-mobile {
    display: none;
  }
}

#blog_btn {
  left: 50%;
  transform: translate(-50%, -50%);
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
  transition: background-color, transform 1s ease-in;
}

.maincontainer {
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
  background-color: #fcfcfe;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: red;
}
</style>
