<template>
  <q-page class="flex">
    <div class="row inline q-mt-md">
      <div class="col-lg-2 col-md-4 col-sm-6">
        <banner @click="open_newTask" name="در حال انجام">
        </banner>
        <task-card class="taskcard" v-for="task in tasks" :key="task.id" :task="task" @click.native="taskcardaction(task)"></task-card>
      </div>
    </div>
    <new-task></new-task>
    <view-task :task="viewTask" ></view-task>
  </q-page>
</template>

<script>
import TaskService from "../services/TaskService";
import {mapActions,mapGetters} from 'vuex'

export default {
  name: "PageIndex",
  components: {
    TaskCard: () => import("../components/TaskCard"),
    Banner: () => import("../components/Banner"),
    NewTask: () => import("../components/NewTask"),
    ViewTask: () => import("../components/ViewTask")
  },
  data() {
    return {
      show_new_task: false,
      tasks: [],
      viewTask: {}
    };
  },
  computed: {
    ...mapGetters('account',
      [
        'token'
      ]
    ),
  },
  methods: {
    ...mapActions('ms',
      [
        'showModal',
        'viewTaskModal'
      ]
    ),
    open_newTask() {
      this.showModal()
    },
    getAll() {
      TaskService.getTasks(this.token)
        .then((res) => {
        console.log(res)
        this.tasks = res.data
      })
      .catch((err) => {
        console.log(err.response)
      })
    },
    taskcardaction(task) {
      this.viewTask = task
      console.log(this.viewTask)
      this.viewTaskModal()
    }
  },
  mounted() {
      this.getAll()
  }
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
