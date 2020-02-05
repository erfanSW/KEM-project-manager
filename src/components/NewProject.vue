<template>
  <q-dialog v-model="show" transition-show="flip-down" transition-hide="flip-up">
    <q-card class="bg-white text-black card">
      <q-bar class="bg-indigo-5">
        <q-space />
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
          <div class="col-6">
            <q-input label="عنوان" v-model="project.name" :rules="[val => !!val || 'وارد کردن نام ضروری است']" stack-label />
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
            <!-- select option -->
            <div style="max-width: 300px">
              <div class="q-gutter-md q-mt-md">
                <q-select
                  v-model="project.members"
                  :options="options"
                  label="افراد مشترک"
                  stack-label
                  multiple
                  emit-value
                  map-options
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section avatar>
                        <q-icon :name="scope.opt.icon" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="scope.opt.label"></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-toggle v-model="model" :val="scope.opt.value" />
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <q-input type="textarea" class="q-mt-md" label="توضیحات" v-model="project.description" :rules="[val => !!val || 'وارد کردن توضیحات ضروری است']" stack-label  />
          </div>
          <div class="col-4 q-ml-xl">
            <div class="row q-mt-xs"></div>
            <q-btn class="q-mt-sm bg-indigo-5 text-white full-width" @click="post" style="top:83%;">ایجاد</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
import { mapState, mapActions , mapGetters } from "vuex";
import ProjectService from "../services/ProjectService";
import tag_select_mixin from '../mixins/tag_select_mixins'


export default {
  components: {
  },
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
      options: [],
      model: null,
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
  },
  methods: {
    ...mapActions("ms", ["closeNewProjectModal"]),
    ...mapActions("os", ["loadprojects_toggle"]),

    post() {
      this.project.owner = this.user_id
      console.log(this.project)
      if (!this.project.name) {
        this.$q.notify({
          message: "لطفا نام پروژه را وارد کنید",
          color: "red",
          position: "center"
        })
        return;
      }else if (!this.project.description) {
        this.$q.notify({
          message: "لطفا توضیحات پروژه را وارد کنید",
          color: "red",
          position: "center"
        })
        return;
      }
      ProjectService
        .post(this.project,this.token)
        .then((res) => {
          console.log(res)
          this.loadprojects_toggle()
          this.closeNewProjectModal()
        })
        .catch((err) => {
          console.log(err.response);
          this.closeNewProjectModal();
          for (let key in err.response.data ) {
            console.log(err.response.data[key]);
            this.$q.notify({
              message: key + " => " + err.response.data[key][0],
              color: "red",
              position: "right"
            });
          }
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
