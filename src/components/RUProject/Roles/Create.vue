<template>
  <div class=" q-mt-md">
    <q-input label="نام نقش" class="q-mt-md" v-model="role.name" stack-label outlined/>
    <q-select
      v-model="role.permissions"
      label="دسترسی ها"
      :options="permission_list"
      :option-label="opt=>opt.label"
      :option-value="opt=>opt.value"
      multiple
      stack-label
      emit-value
      map-options
      outlined
    >
    </q-select>
    <q-btn class="full-width q-mt-md q-mb-sm" label="ایجاد نقش" color="indigo-5" :loading="loading"
           @click="add_role"
    >
      <template v-slot:loading>
        <q-spinner-radio/>
      </template>
    </q-btn>
  </div>
</template>

<script>
  import RoleService from "../../../services/RoleService";

  export default {
    name: "Create",
    props: {
      project: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        role: {
          name: null,
          permissions: [],
          project: null
        },
        loading: false,
        permission_list: [
          {
            label: 'دیدن پروژه',
            value: 'view_project'
          },
          {
            label: 'دیدن تسک ها',
            value: 'view_task'
          },
          {
            label: 'اضافه کردن تسک',
            value: 'add_task'
          },
          {
            label: 'ویرایش تسک',
            value: 'change_task'
          }, {
            label: 'کامنت گذاشتن در تسک',
            value: 'comment_task'
          }, {
            label: 'حذف تسک',
            value: 'delete_task'
          }
        ]
      }
    }, methods: {
      add_role() {
        this.loading = true
        this.role.project = this.$props.project
        RoleService
          .add_role(this.role)
          .then((res) => {
            console.log(res);
            this.loading = false;
            this.$q.notify({
              message: 'با موفقیت انجام شد',
              color: 'green'
            });
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
            this.$q.notify({
              message: err,
              color: 'red'
            })
          })
      },
    }
  }
</script>

<style scoped>

</style>
