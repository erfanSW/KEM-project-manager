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
                  <q-item-label caption @click="updateSubject=!updateSubject" class="custome-cursor">ویرایش
                  </q-item-label>
                  <q-icon name="done" class="q-ml-md" color="green" v-if="updateSubject"/>
                  <q-icon name="close" class="q-ml-md" color="red" v-if="updateSubject"/>
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
                <q-linear-progress stripe color="indigo-5" class="q-mt-md" size="16px" :value="0.4"/>
                <q-item-label caption class="q-mt-xs ">۱۲ روز و ۱۹ ساعت باقیمانده</q-item-label>
              </q-item-section>
            </q-item>


            <q-item class="q-mt-lg" v-for="(cm,index) in comments" :key="index">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="reply"/>
              </q-item-section>
              <q-chat-message
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                :text="[cm.text]"
                bg-color="grey-2"
                stamp="خان"
              />
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-btn flat icon="send" :loading="add_cm_loading" color="indigo-5" @click="add_comment">
                  <template v-slot:loading>
                    <q-spinner-radio/>
                  </template>
                </q-btn>
              </q-item-section>
              <q-item-section class="q-mt-lg">
                <q-editor min-height="5rem" v-model="comment.text"/>
              </q-item-section>
            </q-item>
            <div class="row q-mt-xl" style="margin-right: 90px">
              <q-select label="وضعیت" :options="statuses" :option-label="opt=>opt.name"
                        style="width: 200px;height: 20px" :option-value="opt=>opt.id"
                        v-model="task.status"
                        outlined>
              </q-select>
              <q-btn label="تغییر" outline color="indigo-5" class="q-ml-md" @click="update_task" flat/>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </q-dialog>
</template>


<script>
  import {mapState, mapActions} from "vuex";
  import tag_select_mixins from "../mixins/tag_select_mixins";
  import TaskService from "../services/TaskService";
  import StatusService from "../services/StatusService";

  export default {
    components: {},
    mixins: [tag_select_mixins],
    props: [
      'task',
      'project'
    ],
    data() {
      return {
        model: [],
        model_: [],
        options: [],
        comments: [],
        statuses: [],
        model: null,
        updateSubject: false,
        comment: {
          user: null,
          text: "",
          task: null
        },
        add_cm_loading: false
      };
    },
    computed: {
      ...mapState("ms", {
        show: state => state.view_task_modal
      }),
      ...mapState("account", [
        'token',
        'user'
      ])
    },
    mounted() {
      this.get_comments()
    },
    updated() {
      // this.get_comments()
    },
    watch: {
      show: function (val, prevVal) {
        if (val) {
          this.get_comments()
        }
      }
    },
    methods: {
      ...mapActions("ms", ["closeTaskModal"]),
      add_comment() {
        this.add_cm_loading = true
        this.comment.user = this.user.id
        this.comment.task = this.$props.task.id
        TaskService.add_comment(this.comment)
          .then((res) => {
            this.comment.text = ""
            console.log(res)
            this.get_comments()
            this.add_cm_loading = false
          })
          .catch((err) => {
            console.log(err.response)
            this.add_cm_loading = false
          })
      }, get_comments() {
        TaskService
          .get_comments(this.$props.task.id)
          .then((res) => {
            this.comments = res.data
          })
      }, getAllStatuses() {
        StatusService
          .get(this.$props.project)
          .then((res) => {
            this.statuses = res.data
          })
      }, update_task(){
          TaskService
            .put(this.$props.task)
            .then((res)=> {
              console.log(res)
              this.closeTaskModal()
            })
      },
    }, mounted() {
      this.getAllStatuses()
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
