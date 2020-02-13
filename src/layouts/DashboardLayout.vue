<template>
  <q-layout view="lHh Lpr lFf">
    <q-header  reveal style="opacity: 1">
      <q-toolbar style="background-color: white;" class="text-blue-grey-8">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>عرفان چگینی</q-toolbar-title>
        <q-btn icon="power_settings_new" class="q-mr-lg" size="17px" round flat />
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
        <q-item clickable tag="a" :to="{name:'main'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>خانه</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{name: 'project'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>پروژه ها</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{name:'team'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>تیم ها</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{name:'note'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="notes" />
          </q-item-section>
          <q-item-section>
            <q-item-label>یادداشت ها</q-item-label>
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
