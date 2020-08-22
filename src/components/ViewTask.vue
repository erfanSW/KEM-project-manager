<template>
  <q-dialog v-model="show" transition-show="fade" transition-hide="fade">
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
            @click="delete_task(task.id)"
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
    <q-card class="bg-white text-black card">
      <q-bar class="bg-indigo-5">
        <q-btn dense flat class="text-white" icon="close" v-close-popup @click="closeTaskModal"></q-btn>
        <q-space />
        <q-btn flat color="white" label="حذف" @click="show_delete=true" />
      </q-bar>
      <div>
        <q-card>
          <q-card-section>
            <q-item class="q-mb-md">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="eco" />
              </q-item-section>
              <q-item-section>
                <q-input v-if="updateSubject" v-model="task.subject" label="عنوان" stack-label />
                <q-item-label v-if="!updateSubject">{{task.subject}}</q-item-label>
                <div class="row q-mt-xs">
                  <q-item-label
                    caption
                    @click="updateSubject=!updateSubject"
                    class="custome-cursor"
                  >ویرایش</q-item-label>
                  <q-icon name="done" class="q-ml-md" color="green" v-if="updateSubject" />
                  <q-icon name="close" class="q-ml-md" color="red" v-if="updateSubject" />
                </div>
              </q-item-section>
            </q-item>
            <q-item class="q-mb-md">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="import_contacts" />
              </q-item-section>
              <q-item-section>
                <div class>توضیحات</div>
                <div class="text-caption text-grey"></div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="indigo-5" name="alarm" />
              </q-item-section>
              <q-item-section>
                <q-linear-progress
                  stripe
                  color="indigo-5"
                  class="q-mt-md"
                  size="16px"
                  :value="0.4"
                />
                <q-item-label caption class="q-mt-xs">۱۲ روز و ۱۹ ساعت باقیمانده</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="q-mt-lg" v-for="(cm,index) in comments" :key="index">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="reply" />
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
                <q-btn
                  flat
                  icon="send"
                  :loading="add_cm_loading"
                  color="indigo-5"
                  @click="add_comment"
                >
                  <template v-slot:loading>
                    <q-spinner-radio />
                  </template>
                </q-btn>
              </q-item-section>
              <q-item-section class="q-mt-lg">
                <q-editor min-height="5rem" v-model="comment.text" />
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </q-dialog>
</template>


<script>
import { mapState, mapActions } from "vuex";
import tag_select_mixins from "../mixins/tag_select_mixins";
import TaskService from "../services/TaskService";

export default {
  components: {},
  mixins: [tag_select_mixins],
  props: ["task"],
  data() {
    return {
      show_delete: false,
      delete_loading: false,
      model: [],
      model_: [],
      options: [],
      comments: [],
      model: null,
      updateSubject: false,
      comment: {
        user: null,
        text: "",
        task: null,
      },
      add_cm_loading: false,
    };
  },
  computed: {
    ...mapState("ms", {
      show: (state) => state.view_task_modal,
    }),
    ...mapState("account", ["token", "user"]),
  },
  mounted() {
    this.get_comments();
  },
  updated() {
    // this.get_comments()
  },
  watch: {
    show: function (val, prevVal) {
      if (val) {
        this.get_comments();
      }
    },
  },
  methods: {
    ...mapActions("ms", ["closeTaskModal"]),
    add_comment() {
      this.add_cm_loading = true;
      this.comment.user = this.$q.cookies.get("user").id;
      this.comment.task = this.$props.task.id;
      TaskService.add_comment(this.comment)
        .then((res) => {
          this.comment.text = "";
          this.get_comments();
          this.add_cm_loading = false;
        })
        .catch((err) => {
          console.log(err.response);
          this.add_cm_loading = false;
        });
    },
    get_comments() {
      TaskService.get_comments(this.$props.task.id).then((res) => {
        this.comments = res.data;
      });
    },
    delete_task(id) {
      this.delete_loading = true;
      TaskService.delete_task(id)
        .then((res) => {
          this.closeTaskModal();
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
