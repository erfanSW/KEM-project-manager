<template>
  <q-page class="flex">
    <div class="row inline q-mt-md">
      <div class="col-lg-2 col-md-4 col-sm-6">
        <banner @click="open_newTask" name="در حال انجام">
        </banner>
        <task-card class="taskcard" v-for="task in tasks" :key="task.id" :task="task" @click.native="$router.go(0)"></task-card>
      </div>
    </div>
    <new-task></new-task>
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
    NewTask: () => import("../components/NewTask")
  },
  data() {
    return {
      show_new_task: false,
      tasks: []
    };
  },
  computed: {
    ...mapGetters('account',
      [
        'token'
      ]
    )
  },
  methods: {
    open_newTask() {
      this.$store.dispatch('ms/showModal')
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
