<template>
  <div class="col-6 q-pa-lg">
    <q-input label="عنوان" v-model="project.name" :rules="[val => !!val || 'وارد کردن نام ضروری است']"
             stack-label/>
    <!-- select option -->
    <div>
      <div class="q-gutter-md q-mt-md">
        <q-select
          filled
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
        />
      </div>
    </div>
    <!-- select option -->
    <div>
      <div class="q-gutter-md q-mt-md">
        <q-select
          v-model="project.members"
          label="افراد مشترک"
          :options="users"
          :option-label="opt=>opt.email"
          :option-value="opt=>opt.id"
          stack-label
          emit-value
          map-options
        >
        </q-select>
      </div>
    </div>
    <q-btn outline color="indigo-5" class="q-mt-md full-width">افزودن</q-btn>
    <q-input type="textarea" class="q-mt-md" label="توضیحات" v-model="project.description"
             :rules="[val => !!val || 'وارد کردن توضیحات ضروری است']" stack-label/>
    <q-btn color="indigo-5" class="full-width" label="ویرایش"></q-btn>
  </div>
</template>

<script>
  import tag_select_mixins from "../../mixins/tag_select_mixins";
  import UsersServices from "../../services/UsersServices";

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
        users: []
      }
    },
    methods: {
      get_users() {
        UsersServices
          .getUsers()
          .then((res) => {
            this.users = res.data
          })
          .catch((err) => {
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
