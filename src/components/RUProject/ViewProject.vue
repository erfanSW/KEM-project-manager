<template>
  <q-dialog v-model="view_project_modal" persistent :maximized="true" transition-show="slide-down"
            transition-hide="slide-up">
    <q-card>
      <q-bar class="bg-indigo-5 q-pa-md-xl">
        <q-btn
          dense
          flat
          class="text-white"
          icon="close"
          v-close-popup
          @click="closeViewProjectModal"
        ></q-btn>
        <q-space/>
        <q-btn
          dense
          flat
          class="text-white"
          icon="edit"
          label="ویرایش"
          v-close-popup
          @click="updating=!updating"
        ></q-btn>
        <q-btn
          dense
          flat
          class="text-white"
          icon="person_add"
          label="اعضا"
          v-close-popup
          @click="add_mode=!add_mode"
        ></q-btn>
        <q-btn
          dense
          flat
          class="text-white"
          icon="accessibility"
          label="نقش"
          v-close-popup
          @click="role_mode=!role_mode"
        ></q-btn>
      </q-bar>
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
        role_mode: false
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
