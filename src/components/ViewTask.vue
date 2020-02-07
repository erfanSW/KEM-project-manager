<template>
  <q-dialog v-model="show" transition-show="fade" transition-hide="fade">
    <q-card class="bg-white text-black card">
      <q-bar class="bg-indigo-5">
        <q-space/>
        <q-btn
          dense
          flat
          class="text-white"
          icon="close"
          v-close-popup
          @click="closeTaskModal"
        ></q-btn>
      </q-bar>
      <div>
        <q-card>
          <q-card-section>
            <q-item class="q-mb-md">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="eco"/>
              </q-item-section>
              <q-item-section>
                <q-input v-if="updateSubject" v-model="task.subject" label="عنوان" stack-label/>
                <q-item-label v-if="!updateSubject">{{task.subject}}</q-item-label>
                <div class="row q-mt-xs">
                  <q-item-label caption @click="updateSubject=!updateSubject" class="custome-cursor">ویرایش</q-item-label>
                  <q-icon name="done" class="q-ml-md" color="green" v-if="updateSubject" />
                  <q-icon name="close" class="q-ml-md" color="red" v-if="updateSubject" />
                </div>

              </q-item-section>
            </q-item>
            <q-item class="q-mb-md">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="import_contacts"/>
              </q-item-section>
              <q-item-section>
                <div class="">توضیحات</div>
                <div class="text-caption text-grey">
                  در این شرایط باید خون سردی خود را حفظ کنیم
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="indigo-5" name="alarm"/>
              </q-item-section>
              <q-item-section>
                <q-linear-progress stripe color="indigo-5" class="q-mt-md" size="16px" value="0.8"/>
                <q-item-label caption class="q-mt-xs ">۱۲ روز و ۱۹ ساعت باقیمانده</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="q-mt-lg">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="reply"/>
              </q-item-section>
              <q-chat-message
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                :text="['آقا ریدی با این انجام وظایفت']"
                bg-color="grey-2"
                stamp="خان"
              />
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="indigo-5" name="reply"/>
              </q-item-section>
              <q-chat-message
                avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                :text="['تو گوخوری؟']"
                bg-color="grey-2"
                stamp="عرفان"
              />
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="indigo-5" name="send"/>
              </q-item-section>
              <q-item-section class="q-mt-lg">
                <q-editor min-height="5rem"/>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </q-dialog>
</template>


<script>
  import {mapState, mapActions} from "vuex";
  import tag_select_mixins from "../mixins/tag_select_mixins";

  export default {
    components: {},
    mixins: [tag_select_mixins],
    props: [
      'task'
    ],
    data() {
      return {
        model: [],
        model_: [],
        options: [],
        model: null,
        updateSubject: false
      };
    },
    computed: {
      ...mapState("ms", {
        show: state => state.view_task_modal
      })
    },
    mounted() {
    },
    methods: {
      ...mapActions("ms", ["closeTaskModal"]),
    }
  };
</script>


<style scoped>
  .card {
    width: 700px;
  }

  .custome-cursor {
    cursor: pointer;
  }
</style>
