<template>
  <q-dialog v-model="view_project_modal" transition-show="jump-left" transition-hide="jump-right">
    <q-card style="width: 360px">
      <q-bar class="bg-indigo-5">
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
          icon="create"
          v-close-popup
          @click="updating=!updating"
        ></q-btn>
      </q-bar>
      <div v-if="!updating">
        <view-card :project="project"></view-card>
      </div>
<!--       update part-->
      <div v-if="updating">
        <update :project="project"></update>
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
      ViewCard: () => import('./ViewCard')
    },
    data() {
      return {
        updating: false
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
