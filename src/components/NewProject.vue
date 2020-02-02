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
            <q-input label="عنوان" stack-label />
            <!-- select option -->
            <div style="max-width: 310px">
              <div class="q-gutter-md q-mt-md">
                <q-select
                  filled
                  use-input
                  use-chips
                  multiple
                  input-debounce="0"
                  v-model="model"
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
                  v-model="model_"
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
            <q-input class="q-mt-md" label="توضیحات" stack-label type="textarea" />
          </div>
          <div class="col-4 q-ml-xl">
            <div class="row q-mt-xs"></div>
            <q-btn class="q-mt-sm bg-indigo-5 text-white full-width" style="top:83%;">ایجاد</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
import { mapState, mapActions } from "vuex";
const stringOptions = ["it", "علمی", "تخیلی", "تخمی"];
export default {
  components: {
    CustomCircle: () => import("./CustomCircle")
  },
  data() {
    return {
      redchecked: true,
      greenchecked: false,
      blueckecked: false,
      orangeckecked: false,
      model: [],
      model_: [],
      options: [
        {
          label: "عرفان چگینی",
          value: "sw",
          icon: "menu"
        },
        {
          label: "مهدی خان محمدی",
          value: "khan",
          icon: "bluetooth"
        },
        {
          label: "محمد مهدی مروی",
          value: "mmm",
          icon: "map"
        },
        {
          label: "میلاد عبداللهی",
          value: "mb",
          icon: "golf_course"
        }
      ],
      model: null,

      filterOptions: stringOptions
    };
  },
  props: {},
  computed: {
    ...mapState("ms", {
      show: state => state.new_project_modal
    })
  },
  mounted() {
    console.log(this.show);
  },
  methods: {
    ...mapActions("ms", ["closeNewProjectModal"]),
    createValue(val, done) {
      if (val.length > 0) {
        if (!stringOptions.includes(val)) {
          stringOptions.push(val);
        }
        done(val, "toggle");
      }
    },

    filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.filterOptions = stringOptions;
        } else {
          const needle = val.toLowerCase();
          this.filterOptions = stringOptions.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    }
  }
};
</script>


<style scoped>
.card {
  width: 700px;
}
</style>