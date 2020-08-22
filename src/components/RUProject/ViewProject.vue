<template>
  <q-dialog
    v-model="view_project_modal"
    persistent
    transition-show="slide-down"
    transition-hide="slide-up"
  >
    <q-dialog v-model="show_delete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar size="25px" icon="close" color="red" text-color="white" />
          <span class="q-ml-sm text-red">آیا از کار خود اطمینان دارید؟</span>
        </q-card-section>

        <q-card-actions align="left">
          <q-btn
            label="حذف"
            class="q-ml-sm"
            @click="delete_project(project.id)"
            :loading="delete_loading"
            dense
            color="red"
          >
            <template v-slot:loading>
              <q-spinner-rings />
            </template>
          </q-btn>
          <q-btn
            class="bg-grey-3 text-blue-grey-8"
            label="لغو"
            dense
            color="black"
            @click="show_delete=false"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card>
      <q-bar class="bg-indigo-5 text-white q-pa-md-xl">
        <q-btn
          dense
          flat
          class="text-white"
          icon="close"
          v-close-popup
          @click="closeViewProjectModal"
        ></q-btn>
        <q-space />
        <q-btn flat color="white" label="حذف" @click="show_delete=true" />
      </q-bar>
      <q-tabs
        v-model="tab"
        inline-label
        class="bg-white text-blue-grey-8 shadow-2"
        active-color="indigo-5"
      >
        <q-tab name="mails" label="نمایه گروه" />
        <q-tab name="alarms" label="اعضا" />
        <q-tab name="movies" label="نقش ها" />
      </q-tabs>

      <q-separator />

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
          <div v-if="updating" class="col-4 col-sm-6 col-md-4 col-xs-12">
            <update :project="project"></update>
          </div>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="col-4 col-sm-6 col-md-4 col-xs-12">
            <edit-member :project="project"></edit-member>
          </div>
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="col-4 col-sm-6 col-md-4 col-xs-12">
            <roles :project="project"></roles>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="row q-pa-xl" v-if="0">
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
        <roles :project="project"></roles>
      </div>
    </div>
  </q-dialog>
</template>


<script>
import { mapState, mapActions } from "vuex";
import ProjectService from "src/services/ProjectService";

export default {
  props: ["project"],
  components: {
    Update: () => import("./Update"),
    ViewCard: () => import("./ViewCard"),
    EditMember: () => import("./EditMember"),
    Roles: () => import("./Roles/Roles"),
  },
  data() {
    return {
      updating: false,
      delete_loading: false,
      show_delete: false,
      add_mode: false,
      role_mode: false,
      tab: "mails",
    };
  },
  computed: {
    ...mapState("ms", ["view_project_modal"]),
  },
  methods: {
    ...mapActions("ms", ["closeViewProjectModal"]),
    delete_project(id) {
      this.delete_loading = true;
      ProjectService.delete(id)
        .then((res) => {
          this.closeViewProjectModal();
          this.$emit("update");
          this.$q.notify({
            message: "با موفقیت انجام شد",
            color: "orange",
          });
        })
        .finally(() => {
          this.delete_loading = false;
          this.show_delete = false;
        });
    },
  },
  mounted() {
    this.updating = false;
  },
};
</script>


<style scoped>
.card {
  width: 700px;
}
</style>
