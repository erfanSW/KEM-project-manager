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
              @click="open_newTask"
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
      <new-task :project="project_id"></new-task>
      <view-task :task="viewTask" :project="project_id"></view-task>
      <new-status @update="getAll" :project="project_id"></new-status>
    </q-page>
  </div>
</template>

<script>
import TaskService from "../services/TaskService";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "PageIndex",
  components: {
    TaskCard: () => import("../components/TaskCard"),
    Banner: () => import("../components/Banner"),
    NewTask: () => import("../components/NewTask"),
    ViewTask: () => import("../components/ViewTask"),
  },
  data() {
    return {
      show_new_task: false,
      delete_loading: false,
      tasks: [],
      viewTask: {},
    };
  },
  computed: {
    ...mapGetters("account", ["token"]),
    ...mapState("ms", ["new_task_modal"]),
    project_id: function () {
      return this.$route.params;
    },
  },
  watch: {
    new_task_modal: function (val, prevVal) {
      if (val == false && prevVal == true) {
        this.getAll();
      }
    },
  },
  methods: {
    ...mapActions("ms", ["showModal", "viewTaskModal"]),
    open_newTask() {
      this.showModal();
    },
    getAll() {
      TaskService.getTasks(this.project_id)
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((err) => {});
    },
    taskcardaction(task) {
      this.viewTask = task;
      this.viewTaskModal();
    },
  },
  mounted() {
    this.getAll();
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
