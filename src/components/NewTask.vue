<template>
  <q-dialog v-model="show" transition-show="flip-down" transition-hide="flip-up">
    <q-card class="bg-white text-black card">
      <q-bar class="bg-indigo-5">
        <q-space />
        <q-btn dense flat class="text-white" icon="close" v-close-popup @click="closeModal"></q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col-12 col-sm-6">
            <q-input label="عنوان" stack-label />
            <!-- select option -->
            <div style="max-width: 300px">
              <div class="q-gutter-md q-mt-md">
                <q-select

                  v-model="model"
                  :options="options"
                  label="توسط"
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
            <!-- date -->
            <q-input class="q-mt-md" v-model="task.dueDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="task.dueDate" color="indigo-5" class="bg-indigo-5 text-white" calendar="persian" mask="YYYY-MM-DD HH:mm" />
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="date" color="indigo-5" class="bg-indigo-5 text-white" mask="YYYY-MM-DD HH:mm" format24h />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <!-- date -->
            <!-- select option -->
            <q-input type="text" label="علت تعیین زمان" class="q-mt-md" autogrow stack-label  />
            <q-input type="textarea" label="توضیحات" class="q-mt-md" stack-label  />
          </div>
          <div class="col-12 col-sm-4 q-ml-xl">
            <q-file clearable color="white" standout bottom-slots label="پیوست" counter>
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-select
              filled
              use-input
              use-chips
              multiple
              input-debounce="0"
              v-model="task.tags"
              @new-value="createValue"
              :options="filterOptions"
              @filter="filterFn"
              label="تگ"
              stack-label
            />
            <q-btn class="q-mt-sm bg-indigo-5 text-white full-width" style="top:80%;">ایجاد</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
import { mapState, mapActions } from "vuex";
import  tag_select_mixin from '../mixins/tag_select_mixins'
export default {
  components: {
  },
  mixins: [
    tag_select_mixin
  ],
  data() {
    return {
      task: {
        subject: null,
        description: null,
        owner: null,
        project: null,
        tags: [],
        dueDate: null,
        dueDescription: null,
        assignedTo: null,
        status: null,
      }
    };
  },
  props: {},
  computed: {
    ...mapState("ms", {
      show: state => state.new_task_modal
    })
  },
  mounted() {
    console.log(this.show);
  },
  methods: {
    ...mapActions("ms", ["closeModal"])
  }
};
</script>


<style scoped>
.card {
  width: 700px;
}
</style>
