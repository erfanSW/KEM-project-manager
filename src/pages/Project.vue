<template>
  <q-page>
    <div class="container">
      <q-btn outline color="indigo-5" class="q-mt-md q-mb-md q-ml-sm" @click="open_newProject">
        ایجاد پروژه جدید
        <q-icon name="add" />
      </q-btn>
      <div class="row">
        <div
          v-for="(project,index) in projects"
          :key="index"
          @click.native="this.$router.go(0)"
          class="col-md-3 col-sm-6 col-xs-12 q-mr-md q-mt-md project-card"
        >
          <q-img :src="project.src" @click="imgaction" style="height:200px">
            <div class="absolute-bottom text-center">{{project.name}}</div>
          </q-img>
        </div>
      </div>
    </div>
    <new-project></new-project>
  </q-page>
</template>

<script>
export default {
  components: {
    NewProject: () => import("../components/NewProject")
  },
  data() {
    return {
      projects: [
        {
          name: "پرومن",
          src: "../statics/undraw_projections_7g6a.svg"
        },
        {
          name: "کامنتور",
          src: "../statics/gamer-colour.svg"
        },
        {
          name: "فاش",
          src: "../statics/ceo.svg"
        },
        {
          name: "پرومن",
          src: "../statics/undraw_projections_7g6a.svg"
        },
        {
          name: "کامنتور",
          src: "../statics/gamer-colour.svg"
        },
        {
          name: "فاش",
          src: "../statics/ceo.svg"
        }
      ]
    };
  },
  methods: {
    getImage(path) {
      return require(path);
    },
    imgaction() {
      this.$router.push("task");
    },
    open_newProject() {
      this.$store.dispatch("ms/showNewProjectModal");
    }
  }
};
</script>

<style scoped>
.project-card:hover {
  cursor: pointer;
}
</style>