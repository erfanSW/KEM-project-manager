<template>
  <div class="col-6 q-pa-lg shadow-3" style="width: 300px;height:450px;border-radius: 20px">
    <q-input label="عنوان" v-model="project.name" :rules="[val => !!val || 'وارد کردن نام ضروری است']"
             stack-label outlined/>
    <!-- select option -->
    <div>
      <div class="q-gutter-md q-mt-md">
        <q-select
          use-input
          use-chips
          multiple
          input-debounce="0"
          v-model="project.tags"
          @new-value="createValue"
          :options="filterOptions"
          @filter="filterFn"
          label="تگ"
          stack-label
          outlined
        />
      </div>
    </div>
    <!-- select option -->
    <q-input type="textarea" class="q-mt-md" label="توضیحات" v-model="project.description"
             :rules="[val => !!val || 'وارد کردن توضیحات ضروری است']" stack-label outlined/>
    <q-btn color="indigo-5" class="full-width" label="ویرایش" @click="update"></q-btn>
  </div>
</template>

<script>
  import tag_select_mixins from "../../mixins/tag_select_mixins";
  import ProjectService from "../../services/ProjectService";

  export default {
    name: "Update",
    mixins: [
      tag_select_mixins
    ],
    props: [
      'project'
    ],
    data() {
      return {
      }
    },
    methods: {
      update() {
        ProjectService
          .put(this.$props.project)
          .then((res)=> {
            console.log(res)
          })
          .catch((err)=> {
            console.log(err)
          })
      }
    },
    mounted() {
      this.get_users()
    }

  }
</script>

<style scoped>

</style>
