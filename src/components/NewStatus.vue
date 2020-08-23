<template>
  <q-dialog v-model="show" transition-show="fade" transition-hide="fade">
    <q-card class="bg-white text-black card" style="width: 300px">
      <q-bar class="bg-indigo-5">
        <q-space />
        <q-btn dense flat class="text-white" icon="close" v-close-popup @click="close_status_modal"></q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col-12">
            <q-input
              label="عنوان"
              v-model="status.name"
              :rules="[val => !!val || 'وارد کردن نام ضروری است']"
              stack-label
              outlined
            />
            <!-- select option -->
            <div style="max-width: 310px">
              <div class="q-gutter-md q-mt-md"></div>
            </div>
            <q-color
              v-model="status.color"
              default-view="palette"
              :palette="[
        '#019A9D', '#D9B801', '#E8045A', '#B2028A',
        '#2A0449', '#019A9D'
      ]"
              class="my-picker q-mt-md"
            />
            <q-btn
              outline
              class="text-indigo q-mt-lg full-width"
              :loading="loading"
              label="ایجاد"
              @click="post"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </div>
        <div class="col-4 q-ml-xl">
          <div class="row q-mt-xs"></div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ProjectService from "../services/ProjectService";
import tag_select_mixin from "../mixins/tag_select_mixins";
import UsersServices from "../services/UsersServices";
import StatusService from "../services/StatusService";
export default {
  components: {},
  mixins: [tag_select_mixin],
  data() {
    return {
      model: [],
      model_: [],
      status: {
        name: null,
        color: null,
        project: null,
      },
      users: [],
      model: null,
      loading: false,
    };
  },
  props: ["project"],
  computed: {
    ...mapState("ms", {
      show: (state) => state.new_status_modal,
    }),
    ...mapGetters("account", ["token", "user_id"]),
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions("ms", ["close_status_modal"]),
    ...mapActions("os", ["loadprojects_toggle"]),
    post() {
      this.status.project = this.$props.project;
      const areAllFilledsFilledIn = Object.keys(this.status).every(
        (key) => !!this.status[key]
      );
      if (!areAllFilledsFilledIn) {
        this.$q.notify({
          message: "لطفا همه فیلد هارا وارد کنید",
          color: "red",
        });
        return;
      }
      this.loading = true;
      StatusService.post(this.status)
        .then((res) => {
          this.close_status_modal();
          this.loading = false;
          for (let key in this.status) {
            this.status[key] = null;
          }
          this.$emit("update");
        })
        .catch((err) => {
          this.loading = false;
          this.close_status_modal();
          this.$q.notify({
            message: "این ستون از قبل وجود دارد",
            color: "red",
          });
          // for (let key in err.response.data) {
          //   console.log(err.response.data[key]);
          //   this.$q.notify({
          //     message: key + " => " + err.response.data[key][0],
          //     color: "red",
          //     position: "right"
          //   });
          // }
        });
    },
    getUsers() {
      UsersServices.getUsers()
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {});
    },
  },
};
</script>


<style scoped>
.card {
  width: 700px;
}
</style>