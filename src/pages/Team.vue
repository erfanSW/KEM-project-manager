<template>
  <q-page>
    <div class="container">
      <q-btn outline color="indigo-5" class="q-mt-md q-mb-md q-ml-sm" @click="open_newTeam">
        ایجاد تیم جدید
        <q-icon name="add" />
      </q-btn>
      <div class="row">
        <div
          v-for="(project,index) in projects"
          :key="index"
          @click.native="this.$router.go(0)"
          class="col-md-3 col-sm-6 col-xs-12 q-mr-md q-mt-md project-card"
        >
          <q-img :src="project.src" @click="imgaction" class="img" :alter="project.name">
            <div class="absolute-bottom-right text-center">{{project.name}}</div>
            <div class="absolute-top-left text-center">{{project.type}}</div>
          </q-img>
        </div>
      </div>
    </div>
    <new-team></new-team>
  </q-page>
</template>

<script>
export default {
  components: {
    newTeam: () => import("../components/NewTeam")
  },
  data() {
    return {
      projects: [
        {
          name: "پرومن",
          src: "../statics/undraw_team_ih79.svg",
          type: "دورکاری"
        }
      ]
    };
  },
  methods: {
    getImage(path) {
      return require(path);
    },
    imgaction() {
      this.$router.push("project");
    },
    open_newTeam() {
      this.$store.dispatch("ms/showNewTeamModal");
    }
  }
};
</script>

<style scoped>
.project-card:hover {
  cursor: pointer;
}
.img {
    width: 300px;
    height: 300px;
}
</style>
