<template>
  <div :style="{'background-color':color,'width':width}" class="taskTitleContainer">
    <q-btn round flat @click="clickEventEmitter" :icon="icon" aria-label="Menu" class="text-white" />
    <span class="text-white">{{name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      default: "300px"
    },
    color: {
      default: "#5C6BC0"
    },
    name: {
      default: "بدون نام"
    },
    icon: {
      default: "add"
    },
    // this is for vuex/functions
    clickEvent: {
      default: "ms/showModal"
    }
  },
  methods: {
    clickEventEmitter() {
      this.$store.dispatch(this.clickEvent);
    }
  }
};
</script>

<style scoped>
.taskTitleContainer {
  width: 300px;
  border-radius: 6px;
}
.title {
  display: inline;
  color: white;
  font-size: 22px;
  padding: 5px;
}
</style>