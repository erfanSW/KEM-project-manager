<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal style="opacity: 1">
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
        <q-btn color="red" flat icon="notifications" size="17px">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>بدون هشدار</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn icon="power_settings_new" class="q-mr-lg" size="17px" @click="_logout" round flat />
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
        <q-item clickable tag="a" :to="{path:'/'}">
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
            <q-item-label>پروژه</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{name:'note'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="notes" />
          </q-item-section>
          <q-item-section>
            <q-item-label>یادداشت</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{name:'blogdash'}">
          <q-item-section avatar>
            <q-icon color="blue-grey-8" name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>بلاگ</q-item-label>
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
import NotificationService from "src/services/NotificationService";

export default {
  name: "DashboardLayout",

  data() {
    return {
      leftDrawerOpen: false,
      miniState: true,
    };
  },
  methods: {
    _logout() {
      this.$q.cookies.set("user", null);
      this.$q.cookies.set("token", null);
      this.$router.push({
        path: "/",
      });
    },
    get_notifications() {
      NotificationService.get_all(this.$q.cookies.get("user").id);
    },
  },
  mounted() {
    if (!this.$q.cookies.get("user")) {
      this.$router.push({
        path: "/login",
      });
    }
    this.get_notifications();
  },
};
</script>
