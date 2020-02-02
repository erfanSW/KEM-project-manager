<template>
  <div>
    <q-card class="my-card task-container">
      <q-card-section :style="{'background-color':color}" class="card-title text-white q-mt-md">
        <div class="text-h6">{{task.name}}</div>
        <div class="text-subtitle2">مسئول : {{task.performer}}</div>
      </q-card-section>
      <q-card-actions align="around">
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['آقا ریدی با این انجام وظایفت']"
          bg-color="grey-2"
          stamp="خان"
        />
      </q-card-actions>
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
  height: 170px !important;
  width: 300px;
}
.card-title {
  /* background-image: linear-gradient(to left, #c9ffbf, #ffafbd) !important; */
}
</style>