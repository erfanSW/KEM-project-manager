<template>
  <q-dialog v-model="show" transition-show="fade" transition-hide="fade">
    <q-card class="bg-white text-black card" style="width: 300px">
      <q-bar class="bg-indigo-5">
        <q-space/>
        <q-btn
          dense
          flat
          class="text-white"
          icon="close"
          v-close-popup
          @click="closeNewProjectModal"
        ></q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col-12">
            <q-input label="عنوان" v-model="project.name" :rules="[val => !!val || 'وارد کردن نام ضروری است']"
                     stack-label/>
            <!-- select option -->
            <div style="max-width: 310px">
              <div class="q-gutter-md q-mt-md">
                <q-select
                  filled
                  use-input
                  use-chips
                  multiple
                  input-debounce="0"
                  v-model="project.tags"
                  @new-value="createValue"
                  :options="filterOptions"
                  @filter="filterFn"
                  label="تگ"
                  stack-label
                />
              </div>
            </div>
            <q-input type="text" autogrow class="q-mt-md" label="توضیحات" v-model="project.description"
                     :rules="[val => !!val || 'وارد کردن توضیحات ضروری است']" stack-label/>
            <q-btn outline class="text-indigo q-mt-lg full-width" :loading="loading" label="ورود"
                   @click="post">
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
  import {mapState, mapActions, mapGetters} from "vuex";
  import ProjectService from "../services/ProjectService";
  import tag_select_mixin from '../mixins/tag_select_mixins'
  import UsersServices from "../services/UsersServices";


  export default {
    components: {},
    mixins: [
      tag_select_mixin
    ],
    data() {
      return {
        model: [],
        model_: [],
        project: {
          name: null,
          owner: null,
          members: [],
          tags: [],
          description: null,
        },
        users: [],
        model: null,
        loading: false
      };
    },
    props: {},
    computed: {
      ...mapState("ms", {
        show: state => state.new_project_modal
      }),
      ...mapGetters("account",
        [
          "token",
          "user_id"
        ]
      )
    },
    mounted() {
      console.log(this.show);
      this.getUsers()
    },
    methods: {
      ...mapActions("ms", ["closeNewProjectModal"]),
      ...mapActions("os", ["loadprojects_toggle"]),

      post() {
        this.loading = true;
        this.project.owner = this.user_id
        console.log(this.project)
        if (!this.project.name) {
          this.$q.notify({
            message: "لطفا نام پروژه را وارد کنید",
            color: "red",
            position: "center"
          })
          if (!this.project.description) {
            this.$q.notify({
              message: "لطفا توضیحات پروژه را وارد کنید",
              color: "red",
              position: "center"
            })
            return this.loading = false;
          }
          return this.loading = false;
        }
        if (!this.project.description) {
          this.$q.notify({
            message: "لطفا توضیحات پروژه را وارد کنید",
            color: "red",
            position: "center"
          })
          return this.loading = false;
        }
        ProjectService
          .post(this.project, this.token)
          .then((res) => {
            console.log(res)
            this.loadprojects_toggle()
            this.closeNewProjectModal()
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            console.log(err.response);
            this.closeNewProjectModal();
            for (let key in err.response.data) {
              console.log(err.response.data[key]);
              this.$q.notify({
                message: key + " => " + err.response.data[key][0],
                color: "red",
                position: "right"
              });
            }
          })
      },
      getUsers() {
        UsersServices
          .getUsers()
          .then((res) => {
            console.log(res)
            this.users = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  };
</script>


<style scoped>
  .card {
    width: 700px;
  }
</style>
