<template>
  <q-page>
    <div class="container" @load="getAll">
      <q-btn outline color="indigo-5" class="q-mt-md q-mb-md q-ml-sm" @click="open_newProject">
        ایجاد پروژه جدید
        <q-icon name="add" />
      </q-btn>
      <div class="row">
        <div
          v-for="project in projects"
          :key="project.id"
          class="col-md-3 col-sm-6 col-xs-12 q-mr-md q-mt-md project-card"
        >
          <q-img src="../statics/undraw_work_together_h63l.svg" @click="imgaction(project)" :ratio="20/9">
            <div class="absolute-bottom text-center">{{project.name}}</div>
          </q-img>
        </div>
      </div>
    </div>
    <div class="row q-pa-lg" v-if="initialLoad" >
      <div class="q-ma-xs">
        <q-skeleton height="200px" width="400px" class="" square />
        <q-skeleton class="bg-indigo-5" height="50px" width="400px" />
      </div>
      <div class="q-ma-xs">
        <q-skeleton height="200px" width="400px" class="" square />
        <q-skeleton class="bg-indigo-5" height="50px" width="400px" />
      </div>
      <div class="q-ma-xs">
        <q-skeleton height="200px" width="400px" class="" square />
        <q-skeleton class="bg-indigo-5" height="50px" width="400px" />
      </div>
    </div>
    <new-project></new-project>
    <view-project :project="viewProject"></view-project>
  </q-page>
</template>

<script>
import ProjectService from "../services/ProjectService";
import {mapActions,mapGetters} from 'vuex'

export default {
  components: {
    NewProject: () => import("../components/NewProject"),
    ViewProject: () => import("../components/ViewProject")
  },
  data() {
    return {
      projects: [],
      viewProject: null,
      initialLoad:true,
    };
  },
  computed: {
    ...mapGetters('account',
      [
        'token'
      ]
    ),
    ...mapGetters('os',
      [
        'loadprojects'
      ]
    )
  },
  watch: {
    loadprojects: function (val,PrevVal) {
      if (val == true) {
        this.initialLoad = true
        this.getAll()
        this.loadprojects_toggle()
        console.log(this.loadprojects)
      }
    }
  },
  methods: {
    ...mapActions ("os",
      [
        'loadprojects_toggle'
      ]
    ),
    ...mapActions("ms",
      [
        'viewProjectModal'
      ]
    ),
    getImage(path) {
      return require(path);
    },
    imgaction(project) {
      this.viewProject = project
      this.viewProjectModal()
    },
    open_newProject() {
      this.$store.dispatch("ms/showNewProjectModal");
    },
    getAll() {
      ProjectService
        .get(this.token)
        .then((res) => {
          this.projects = res.data
          this.initialLoad = false
        })
    }
  },
  mounted() {
    this.getAll()
  }
};
</script>

<style scoped>
.project-card:hover {
  cursor: pointer;
}
</style>
