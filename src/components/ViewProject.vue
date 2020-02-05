<template>
  <q-dialog v-model="view_project_modal" position="right">
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
      </q-bar>
      <q-card-section>
        <div class="text-h6" >{{project.name}}</div>
        <div class="text-overline">سازنده : {{project.owner}}</div>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="indigo-5" name="accessibility" />
          </q-item-section>
          <q-item-section>
            <q-item-label>عرفان چگینی</q-item-label>
            <q-item-label caption>مدیر گروه</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-card-section class="q-pt-xs">
          <div class="text-overline">توضیحات</div>
          <div class="text-caption text-grey">{{project.description}}</div>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn color="red" text-color="indigo-5" flat round icon="label" />:
          {{project.tags.join(' , ')}}
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
  import { mapState,mapActions } from "vuex";
  export default {
    props: [
      'project'
    ],
    data() {
      return {
      };
    },
    computed: {
      ...mapState("ms",
        [
        'view_project_modal'
        ]
      )
    },
    methods:{
      ...mapActions("ms",
        [
          'closeViewProjectModal'
        ]
      )
    },
    mounted() {
    },
  };
</script>


<style scoped>
  .card {
    width: 700px;
  }
</style>
