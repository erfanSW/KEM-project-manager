<template>
  <div :class="{grey_overlay:grey_overlay}" class="maincontainer">
    <q-btn flat class="bg-indigo-3 text-white arrow" @click="startvideo">
      راهنما
      <q-icon name="play_arrow"/>
    </q-btn>
    <img src="../assets/undraw_launching_125y.svg" v-if="grey_overlay" width="100px"
         class="bg-indigo-3 text-white overlay_content">
    <div class="header">
      <div class="q-pa-lg row headerbar">
        <q-btn flat class="text-blue-grey-8">رزومه ها</q-btn>
        <q-btn flat class="text-blue-grey-8">پلن ها</q-btn>
        <q-btn flat class="bg-indigo-5 text-white">اسپانسر پرومن شوید!</q-btn>
        <q-btn flat v-if="isUserLoggedIn" :to="{path:'/dashboard'}" class="text-blue-grey-8">داشبورد</q-btn>
        <q-btn flat v-if="!isUserLoggedIn" :to="{name:'signup'}">ثبت نام</q-btn>
        <q-btn flat v-if="!isUserLoggedIn" :to="{name:'login'}">ورود</q-btn>
        <q-btn flat v-else @click="_logout" class="text-blue-grey-8">خروج</q-btn>
      </div>
    </div>
    <!-- <q-btn flat outline class=" text-indigo absolute-center q-mt-xl">همین حالا تیم فضایی خودت رو بساز!</q-btn> -->
    <q-btn
      outline
      color="indigo-5"
      class="absolute-center q-mt-xl"
      label="همین الان تجربیات دیگران رو بخون!"
      :to="{path:'blog'}"
    />


    <div class="container">
      <div class="row" style="margin-bottom: 100px">
        <div
          class="col-6 text-h6"
          :class="{whiteboard:firstwb}"
        >زمان بندی پروژه ها را به خوبی مدیریت کنید
          <div>
            <div style="font-size: 12px;" class="text-blue-grey-8 q-mt-sm">
              در واقع پروژه یک فعالیت مقطعی است که برایش نقطه شروع و پایان تعریف شده و با زمان و منابع خاصی محدود شده
              است. بر اساس همین تعریف، پروژه یک فعالیت ادامه دار نیست و کاملا منحصر به فرد است. اما شامل دسته ای از
              فعالیت‌ها می‌شود که برای دستیابی به هدف خاصی طراحی و اجرا می‌شود. بنابراین تیم یک پروژه می‌تواند از افرادی
              تشکیل شود که معمولا با هم کار نمی‌کنند، (و گاهاً از سازمان‌ها و مناطق جغرافیایی متفاوت هستند).
              <q-btn label="ایجاد تسک" class="bg-indigo-5 text-white" :to="{name: 'task'}" style="width: 130px;"/>
            </div>
          </div>
        </div>
        <img
          src="../assets/undraw_dev_productivity_umsq.svg"
          class="col-6"
          style="height:200px"
          :class="{whiteboard:firstwb}"
          width="200px"
          height="200px"
          alt
        />
      </div>
      <div class="row q-mt-xl">
        <img src="../assets/undraw_selecting_team_s098.svg" class="col-6" :class="{whiteboard:secondwb}" height="100px"
             style="width: 400px;"
             alt/>
        <div
          class="col-6 text-h6"
          style="text-align:left;"
          :class="{whiteboard:secondwb}"
        >تیم بسازید و مدیریت پروژه را در قالب تیم تجربه کنید
          <div style="font-size: 12px;" class="text-blue-grey-8 q-mt-sm">
            یک تیم گروهی از افراد است که در ارتباط با هدف مشخصی گرد هم آمده‌اند. از تیم جهت انجام وظایفی که دارای
            پیچیدگی و قابل تقسیم به زیر وظایف ساده‌تر می‌باشند استفاده می‌شود. تیم‌ها به‌طور معمول دارای اعضایی هستند که
            با بر خورداری از مهارت‌های مکمل، سبب ایجاد هم افزایی در طی یک تلاش هماهنگ شده می گردند، به‌طوری‌که نقاط قوت
            هر عضو تیم به حداکثر و نقاط ضعف آن‌ها به حد اقل رسانده می‌شود.
            <q-btn label="ایجاد تیم" class="bg-indigo-5 text-white" :to="{name: 'team'}" style="width: 130px;"/>
          </div>
        </div>
      </div>
      <div class="row q-mt-xl">
        <div class="col-6 text-h6 q-mt-xl" :class="{whiteboard:thirdwb}" style="margin-top: 120px">آخرین کامیت هارا
          بررسی کنید
          <div style="font-size: 12px;" class="text-blue-grey-8 q-mt-sm">
            کامیت در گیت شباهت بسیار زیادی با کامیت در سایر سیستم‌های کنترل نسخه مانند ساب‌ورژن دارد. روند کار به این
            شکل است که کار را آغاز می‌کنید و پیامی جهت توضیح اینکه دلیل تغییر انجام گرفته چیست وارد می‌کنید و فایل تغییر
            می‌یابد. پس دستور git commit را اجرا کنید. با این کار ویرایشگر به‌صورت خودکار باز می‌شود و الگوی زیر را
            نمایش می‌دهد.
            <q-btn label="بزودی ..." disable class="bg-indigo-5 text-white" style="width: 130px;"/>
          </div>
        </div>
        <img src="../assets/undraw_hacker_mindset_gjwq.svg" class="col-6 q-mt-xl" :class="{whiteboard:thirdwb}"
             width="200px"
             alt/>
      </div>
      <div class="row q-mt-xl q-mb-xl">
        <img src="../assets/undraw_personal_info_0okl.svg" class="col-6" :class="{whiteboard:fourthwb}" width="200px"
             alt/>
        <div class="col-6 text-h6" style="text-align:left;" :class="{whiteboard:fourthwb}">برای خود پروفایل و رزومه
          بسازید
          <div style="font-size: 12px;" class="text-blue-grey-8 q-mt-sm">
            رزومه متنی است که می‌تواند بین یک تا چند صفحه متغیر باشد و در آن اطلاعاتی مانند پیشینه تحصیلی و کاری افراد و
            نیز توانایی‌‌ها و اطلاعات شخصی او ذکر می‌شود و به نوعی تبلیغی است که در آن ویژگی‌های خود را به کار‌فرمایان
            عرضه می‌کنند تا آن‌ها با در دست داشتن این اطلاعات اولیه بتوانند توانایی‌ها و مهارت‌های او را برای استخدام
            ارزیابی کنند و بهترین گزینه موجود را انتخاب بکنند.
            <q-btn label="بزودی ..." disable class="bg-indigo-5 text-white" style="width: 130px;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import AuthenticationServices from "../services/AuthenticationService";

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
        // AuthenticationServices
        //   .logout()
        //   .then((res)=> {
        //     this.logout()
        //   })
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
              }, 3000)
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

  @media only screen and(max-width: 800px) {
    .container {
      margin-right: 0px;
      margin-left: 0px;
    }
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
    background-color: rgba(0, 0, 0, 0.9);
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
