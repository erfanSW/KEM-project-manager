<template>
  <q-dialog v-model="view_project_modal" persistent :maximized="true" transition-show="slide-down"
            transition-hide="slide-up">
    <q-card>
      <q-bar class="bg-indigo-5 text-white q-pa-md-xl">
        <q-btn
          dense
          flat
          class="text-white"
          icon="close"
          size="20px"
          v-close-popup
          @click="closeViewProjectModal"
        ></q-btn>
        <q-space/>
      </q-bar>
      <q-tabs
        v-model="tab"
        inline-label

        class="bg-white text-blue-grey-8 shadow-2"
        active-color="indigo-5"
      >
        <q-tab name="mails" label="نمایه گروه"/>
        <q-tab name="alarms" label="اعضا"/>
        <q-tab name="movies" label="نقش ها"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels
        v-model="tab"
        animated
        align="center"
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel name="mails">
          <div v-if="!updating" class="col-4 col-sm-6 col-md-4 col-xs-12">
            <view-card :project="project"></view-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="col-4 col-sm-6 col-md-4 col-xs-12">
            <edit-member :project="project"></edit-member>
          </div>
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="col-4 col-sm-6 col-md-4 col-xs-12">
            <edit-roles :project="project"></edit-roles>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="row q-pa-xl">
      <div v-if="!updating" class="col-4 col-sm-6 col-md-4 col-xs-12">
        <view-card :project="project"></view-card>
      </div>
      <!--       update part-->
      <div v-if="updating" class="col-4 col-sm-6 col-md-4 col-xs-12">
        <update :project="project"></update>
      </div>
      <!--      edit members -->
      <div class="col-4 col-sm-6 col-md-4 col-xs-12">
        <edit-member :project="project"></edit-member>
      </div>
      <!--      edit roles mode -->
      <div class="col-4 col-sm-6 col-md-4 col-xs-12">
        <edit-roles :project="project"></edit-roles>
      </div>
    </div>
    </q-card>
  </q-dialog>
</template>


<script>
  import {mapState, mapActions} from "vuex";

  export default {
    props: [
      'project'
    ],
    components: {
      Update: () => import('./Update'),
      ViewCard: () => import('./ViewCard'),
      EditMember: () => import('./EditMember'),
      EditRoles: () => import('./EditRoles')
    },
    data() {
      return {
        updating: false,
        add_mode: false,
        role_mode: false,
        tab: 'mails'
      };
    },
    computed: {
      ...mapState("ms",
        [
          'view_project_modal'
        ]
      )
    },
    methods: {
      ...mapActions("ms",
        [
          'closeViewProjectModal'
        ]
      )
    },
    mounted() {
      this.updating = false
    },
  };
</script>


<style scoped>
  .card {
    width: 700px;
  }
</style>
