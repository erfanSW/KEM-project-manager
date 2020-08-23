<template>
  <div>
    <q-card class="my-card task-container">
      <q-card-section :style="{'background-color':color}" class="card-title text-white q-mt-md">
        <div class="text-h6">{{task.name}}</div>
        <div class="text-subtitle2">{{task.subject}}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    task: Object,
    width: {
      default: "300px"
    },
    color: {
        default: "#5C6BC0"
    },
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.task-container {
  height: 80px !important;
  width: 300px;
  resize: both;

}
.task-container:hover {
  cursor: pointer;
  resize: both;

}
.card-title {
  /* background-image: linear-gradient(to left, #c9ffbf, #ffafbd) !important; */
}
</style>
