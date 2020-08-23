<template>
  <div>
    <q-btn
      icon="add"
      label="اضافه کردن ستون"
      color="indigo-5"
      class="q-ml-md"
      @click="open_status_modal"
      outline
    />
    <q-page class="flex">
      <div class="row inline q-mt-md" v-for="(st,i) in statuses" :key="i">
        <div class="col-lg-2 col-md-4 col-sm-6">
          <div>
            <banner
              @selected_status="selected_status=st.id"
              :name="st.name"
              :color="st.color"
              :status="st.id"
              class="q-ml-md"
            ></banner>
            <task-card
              class="taskcard q-ml-md"
              v-for="task in st.tasks"
              :key="task.id"
              :task="task"
              :color="st.color"
              @click.native="taskcardaction(task)"
            ></task-card>
          </div>
        </div>
      </div>
      <new-task :status="selected_status" :project="project_id"></new-task>
      <view-task
        v-if="view_task_modal"
        @update="getAll"
        :statuses="statuses"
        :task="Object.assign({},viewTask)"
        :project="project_id"
      ></view-task>
      <new-status @update="getAllStatuses" :project="project_id"></new-status>
    </q-page>
  </div>
</template>

<script>
import TaskService from "../services/TaskService";
import { mapActions, mapGetters, mapState } from "vuex";
import StatusService from "../services/StatusService";
export default {
  name: "PageIndex",
  components: {
    TaskCard: () => import("../components/TaskCard"),
    Banner: () => import("../components/Banner"),
    NewTask: () => import("../components/NewTask"),
    ViewTask: () => import("../components/ViewTask"),
    NewStatus: () => import("../components/NewStatus"),
  },
  data() {
    return {
      show_new_task: false,
      tasks: [],
      viewTask: {},
      statuses: [],
      selected_status: null,
    };
  },
  computed: {
    ...mapGetters("account", ["token"]),
    ...mapState("ms", ["new_task_modal","view_task_modal"]),
    project_id: function () {
      return this.$route.params.project_id;
    },
  },
  watch: {
    new_task_modal: function (val, prevVal) {
    },
  },
  methods: {
    ...mapActions("ms", ["showModal", "viewTaskModal", "open_status_modal"]),
    open_newTask(status) {
      this.selected_status = status;
      this.showModal();
    },
    getAll() {
      TaskService.getTasks(this.$route.params.project_id)
        .then((res) => {
          this.tasks = res.data;
          StatusService.get(this.$route.params.project_id).then((resu) => {
            let ts = resu.data;
            ts.forEach((stobj) => {
              stobj.tasks = [];
            });
            ts.forEach((stobj) => {
              this.tasks.forEach((tkobj) => {
                if ((tkobj.status == stobj.id) & !!stobj.id & !!tkobj.status) {
                  stobj.tasks.push(tkobj);
                }
              });
            });
            this.statuses = ts;
          });
          this.statuses.forEach((stobj) => {
            stobj.tasks = [];
          });
          this.statuses.forEach((stobj) => {
            this.temptasks.forEach((tkobj) => {
              if ((tkobj.status == stobj.id) & !!stobj.id & !!tkobj.status) {
                stobj.tasks.push(tkobj);
              }
            });
          });
          this.tasks = res.data;
          console.log(this.statuses);
        })
        .catch((err) => {});
    },
    getAllStatuses() {
      StatusService.get(this.project_id).then((res) => {
        this.statuses = res.data;
      });
    },
    taskcardaction(task) {
      this.viewTask = task;
      this.viewTaskModal();
    },
  },
  mounted() {
    this.getAll();
    this.getAllStatuses();
  },
};
</script>

<style scoped>
.col-container {
  margin-right: 90px;
}
.col-lg-2 {
  margin-left: 70px;
}
.col-lg-2:nth-child(1) {
  margin-left: 0;
}
</style>