<template>
  <q-page>
    <div class="q-pa-md" @load="getAll">
      <q-btn outline color="indigo-5" class="q-mt-md q-mb-md q-ml-sm" @click="open_newProject">
        ایجاد پروژه جدید
        <q-icon name="add"/>
      </q-btn>
      <div class="row">
        <div
          v-for="project in projects"
          :key="project.id"
          class="col-md-3 col-sm-6 col-xs-12 q-mt-md project-card"
        >
          <q-img src="../assets/undraw_dev_productivity_umsq.svg" @click="imgaction(project)" :ratio="16/9"
                 class="shadow-6 project_img" contain>
            <div class="absolute-bottom text-center" style="opacity: 0.9;background-color: white;color:black">
              {{project.name}}
            </div>
          </q-img>
        </div>
      </div>
    </div>
    <div class="row" v-if="initialLoad">
      <div class="q-mr-md col-md-3 col-sm-6 col-xs-12 q-mt-md project_img">
        <q-skeleton height="170px" width="330px" class="project_img" square/>
      </div>
      <div class="q-mr-md col-md-3 col-sm-6 col-xs-12 q-mt-md project_img">
        <q-skeleton height="170px" width="330px" class="project_img" square/>
      </div>
      <div class="q-mr-md col-md-3 col-sm-6 col-xs-12 q-mt-md project_img">
        <q-skeleton height="170px" width="330px" class="project_img" square/>
      </div>
      <div class="q-mr-md col-md-3 col-sm-6 col-xs-12 q-mt-md project_img">
        <q-skeleton height="170px" width="330px" class="project_img" square/>
      </div>
    </div>
    <new-project></new-project>
    <view-project :project="viewProject"></view-project>
  </q-page>
</template>

<script>
  import ProjectService from "../services/ProjectService";
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: {
      NewProject: () => import("../components/NewProject"),
      ViewProject: () => import("../components/RUProject/ViewProject")
    },
    data() {
      return {
        projects: [],
        viewProject: null,
        initialLoad: true,
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
      loadprojects: function (val, PrevVal) {
        if (val == true) {
          this.initialLoad = true
          this.getAll()
          this.loadprojects_toggle()
          console.log(this.loadprojects)
        }
      }
    },
    methods: {
      ...mapActions("os",
        [
          'loadprojects_toggle'
        ]
      ),
      ...mapActions("ms",
        [
          'viewProjectModal',
          'closeViewProjectModal'
        ]
      ),
      getImage(path) {
        return require(path);
      },
      imgaction(project) {
        this.viewProject = project
        console.log(this.viewProject)
        this.viewProjectModal()
      },
      open_newProject() {
        this.$store.dispatch("ms/showNewProjectModal");
      },
      getAll() {
        ProjectService
          .get()
          .then((res) => {
            this.projects = res.data
            this.initialLoad = false
          })
      }
    },
    mounted() {
      this.closeViewProjectModal()
      this.getAll()
    }
  };
</script>

<style scoped>
  .project-card:hover {
    cursor: pointer;
  }

  .project_img {
    border-radius: 14px;
    width: 330px;
    transition: transform 0.5s;
  }

  .project_img:hover {
    transform: scale(1.04, 1.04);
  }
</style>
