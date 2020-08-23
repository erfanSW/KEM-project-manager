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
            @click="delete_task(mutable_task.id)"
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
        <q-select
          style="width:120px"
          class="q-ml-sm"
          :options="statuses"
          v-model="status"
          map-options
          option-label="name"
          option-value="id"
          emit-value
          dense
          dark
          label-color="white"
          popup-content-class="bg-indigo text-black"
        />
        <span class="font__small text-white q-ml-md">{{mutable_task.assigned_to.email}}</span>
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
                <q-input
                  v-if="updateSubject"
                  v-model="mutable_task.subject"
                  label="عنوان"
                  stack-label
                />
                <q-item-label v-if="!updateSubject">{{mutable_task.subject}}</q-item-label>
                <div class="row q-mt-xs">
                  <q-item-label
                    caption
                    @click="updateSubject=!updateSubject"
                    class="custome-cursor font__small"
                    v-if="!updateSubject"
                  >ویرایش</q-item-label>
                  <q-btn
                    icon="done"
                    flat
                    size="10px"
                    class="q-ml-md"
                    color="green"
                    v-if="updateSubject"
                    @click="update_subject({
                    id: mutable_task.id,
                    subject: mutable_task.subject
                  })"
                  />
                  <q-btn
                    flat
                    size="10px"
                    icon="close"
                    class="q-ml-md"
                    color="red"
                    v-if="updateSubject"
                    @click="updateSubject=false"
                  />
                </div>
              </q-item-section>
            </q-item>
            <q-item class="q-mb-md">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="import_contacts" />
              </q-item-section>
              <q-item-section>
                <div class>توضیحات</div>
                <q-input
                  v-if="updateDescription"
                  v-model="mutable_task.description"
                  label="عنوان"
                  stack-label
                />
                <div v-else class="text-caption text-blue-grey">{{mutable_task.description}}</div>
                <div class="row q-mt-xs">
                  <q-item-label
                    caption
                    @click="updateDescription=!updateDescription"
                    class="custome-cursor font__small"
                    v-if="!updateDescription"
                  >ویرایش</q-item-label>
                  <q-btn
                    icon="done"
                    flat
                    size="10px"
                    class="q-ml-md"
                    color="green"
                    v-if="updateDescription"
                    @click="update_description({
                    id: mutable_task.id,
                    description: mutable_task.description
                  })"
                  />
                  <q-btn
                    flat
                    size="10px"
                    icon="close"
                    class="q-ml-md"
                    color="red"
                    v-if="updateDescription"
                    @click="updateDescription=false"
                  />
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="indigo-5" flat name="alarm" />
              </q-item-section>
              <q-item-section>
                <q-linear-progress
                  stripe
                  :color="mutable_task.due_days > 0 ? 'indigo-5': 'red'"
                  class="q-mt-md"
                  size="16px"
                  :value="mutable_task.due_days"
                />
                <q-item-label
                  caption
                  class="q-mt-xs"
                  :class="mutable_task.due_days > 0? 'text-grey':'text-red'"
                >{{mutable_task.due_days}} روز ---- {{mutable_task.due_date.split('-').join('/')}}</q-item-label>
                <q-item-label
                  caption
                  @click="updateDuedate=!updateDuedate"
                  class="custome-cursor font__small"
                  v-if="!updateDuedate"
                >ویرایش</q-item-label>
                <q-date
                  v-else
                  v-model="mutable_task.due_date"
                  @input="update_due_date({
                    id: mutable_task.id,
                    due_date: mutable_task.due_date
                  })"
                  mask="YYYY-MM-DD"
                  class="q-mt-md"
                  color="indigo"
                  landscape
                />
              </q-item-section>
            </q-item>

            <q-item class="q-mt-lg" v-for="(cm,index) in comments" :key="index">
              <q-item-section avatar>
                <q-icon color="indigo-5" name="reply" />
              </q-item-section>
              <q-chat-message
                avatar="../statics/ceo.svg"
                :text="[cm.text]"
                bg-color="grey-2"
                :stamp="cm.user.email"
              />
              <q-btn
                label="حذف"
                flat
                dense
                @click="delete_comment(cm.id)"
                class="custome-cursor font__small q-mt-md q-ml-md"
                v-if="$q.cookies.get('user').email == cm.user.email"
              ></q-btn>
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
  props: ["task", "statuses"],
  data() {
    return {
      show_delete: false,
      delete_loading: false,
      model: [],
      model_: [],
      options: [],
      comments: [],
      status: [],
      mutable_task: {},
      model: null,
      updateSubject: false,
      updateDescription: false,
      updateDuedate: false,
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
  watch: {
    show: function (val, prevVal) {
      if (val) {
        this.get_comments();
      }
    },
    status: function (val, preVal) {
      this.update_task({
        id: this.$props.task.id,
        status: val,
      });
    },
  },
  mounted() {
    this.mutable_task = Object.assign({}, this.$props.task);
    this.get_comments();
  },
  updated() {
    // this.get_comments()
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
    update_task(data) {
      TaskService.patch(data)
        .then((res) => {
          this.$emit("update");
          this.$q.notify({
            message: "با موفقیت انجام شد",
            color: "green",
          });
          this.mutable_task = {
            ...res.data,
            assigned_to: this.mutable_task.assigned_to,
            id: this.mutable_task.id,
          };
        })
        .catch((err) =>
          this.$q.notify({
            message: err.response,
            color: "red",
          })
        );
    },
    update_subject(data) {
      this.update_task(data);
      this.updateSubject = false;
    },
    update_description(data) {
      this.update_task(data);
      this.updateDescription = false;
    },
    update_due_date(data) {
      this.update_task(data);
      this.updateDuedate = false;
    },
    delete_comment(id) {
      TaskService.delete_comment(id).then((res) => {
        this.get_comments();
        this.$q.notify({
          message: "با موفقیت انجام شد",
          color: "orange",
        });
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

.font__small {
  font-size: 10px;
}
</style>
