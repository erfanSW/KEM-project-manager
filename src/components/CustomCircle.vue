<template>
  <div class="dot" :style="{'background-color':color}">
      <q-icon v-if="checked" name="done" color="white" size="30px" class=""/>
  </div>
</template>

<script>
export default {
    props: {
        color: {
            default : "blue"
        },
        checked: {
          default: false
        }
    }
};
</script>

<style scoped>
.dot {
  width: 30px;
  height: 30px;
  border-radius: 55%;
}
</style>