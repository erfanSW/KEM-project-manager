<template>
  <div class=" q-mt-lg">
    <q-select
      v-model="role"
      label="نقش"
      :options="roles"
      option-label="name"
      option-value="id"
      hint="نقش مورد نظر را انتخاب کنید ..."
      stack-label
      map-options
      outlined
    >
    </q-select>
    <q-input v-if="role" label=" نام نقش" class="q-mt-xl" v-model="role.name" stack-label outlined/>
    <q-select
      v-if="role"
      v-model="role.permissions"
      label="دسترسی ها"
      :options="permission_list"
      :option-label="opt=>opt.label"
      :option-value="opt=>opt.value"
      class="q-mt-md"
      multiple
      stack-label
      map-options
      outlined
      emit-value
    >
    </q-select>
    <q-btn class="full-width q-mt-md" label="ذخیره" color="indigo-5" :loading="loading" @click="update_role"
           outline>
      <template v-slot:loading>
        <q-spinner-radio/>
      </template>
    </q-btn>
    <q-btn class="full-width q-mt-md q-mb-md" label="حذف" color="red-5" :loading="delete_loading"
           outline>
      <template v-slot:loading>
        <q-spinner-radio/>
      </template>
    </q-btn>
  </div>
</template>

<script>
  import RoleService from "src/services/RoleService";

  export default {
    name: "EditRoles.vue",
    props: {
      project: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        loading: false,
        delete_loading: false,
        role: null,
        roles: [],
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
      get_roles() {
        RoleService
          .get_roles(this.$props.project)
          .then((res) => {
            this.roles = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      update_role() {
        this.loading = true
        RoleService
          .put(this.role)
          .then((res) => {
            this.$q.notify({
              message: 'با موفقیت انجام شد',
              color: 'green'
            });
            for (let key in this.updating_role) {
              this.updating_role[key] = null
            }
            this.get_roles()
          })
          .catch((err) => {
            console.log(err)
            this.$q.notify({
              message: err,
              color: 'red'
            })
          })
          .finally(() => this.loading = false)
      },
    },
    mounted() {
      this.get_roles()
    }
  }
</script>

<style scoped>

</style>
