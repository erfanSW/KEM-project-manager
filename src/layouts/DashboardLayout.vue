<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated reveal>
      <q-toolbar class="bg-indigo-5">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>عرفان چگینی</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
    >
      <q-list class="mydrawer">
        <q-item clickable tag="a" :to="{path:'/main'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>خانه</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{path:'task'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="queue" />
          </q-item-section>
          <q-item-section>
            <q-item-label>وظایف</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{path:'project'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>پروژه ها</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{path:'team'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>تیم ها</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "DashboardLayout",

  data() {
    return {
      leftDrawerOpen: false,
      miniState: true
    };
  },
  mounted() {
    if (!this.$store.getters['account/isUserLoggedIn']) {
      this.$route.push('/login')
    }
  }
};
</script>
