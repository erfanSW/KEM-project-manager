<template>
  <div class="q-pa-lg shadow-3" style="width: 300px;height:450px;border-radius: 20px">
    <div v-if="!updating">
      <q-input label="نام نقش" v-model="role.name" stack-label/>
      <div class=" q-mt-md" >
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
        >
        </q-select>
        <q-btn class="full-width q-mt-md q-mb-lg" label="ایجاد نقش" color="indigo-5" :loading="addRoleLoading" @click="add_role"
               outline>
          <template v-slot:loading>
            <q-spinner-radio/>
          </template>
        </q-btn>
        <q-btn flat color="indigo-5" size="10px" @click="updating=true">ویرایش</q-btn>
      </div>
    </div>
    <div v-if="updating">
      <div class=" q-mt-lg" >
        <q-select
          v-model="updating_role"
          label="نقش"
          :options="roles"
          :option-label="opt=>opt.name"
          :option-value="opt=>opt.id"
          hint="نقش مورد نظر را انتخاب کنید ..."
          stack-label
          emit-value
          map-options
        >
        </q-select>
        <q-input label=" نام نقش" class="q-mt-xl" v-model="updating_role.name" stack-label />
        <q-select
          v-model="updating_role.permissions"
          label="دسترسی ها"
          :options="permission_list"
          :option-label="opt=>opt.label"
          :option-value="opt=>opt.value"
          class="q-mt-md"
          multiple
          stack-label
          emit-value
          map-options
        >
        </q-select>
          <q-btn class="full-width q-mt-md" label="ذخیره"  color="indigo-5" :loading="addRoleLoading" @click="add_role"
                 outline>
            <template v-slot:loading>
              <q-spinner-radio/>
            </template>
          </q-btn>
          <q-btn class="full-width q-mt-md q-mb-md" label="حذف"  color="red-5" :loading="addRoleLoading" @click="add_role"
                 outline>
            <template v-slot:loading>
              <q-spinner-radio/>
            </template>
          </q-btn>
          <q-btn icon="keyboard_return" class="q-mt-xs bg-blue text-white" @click="updating=false" size="10px" flat/>
      </div>
    </div>
  </div>
</template>

<script>
  import RoleService from "../../services/RoleService";

  export default {
    name: "EditRoles",
    props: [
      'project'
    ],
    data() {
      return {
        role: {
          name: null,
          permissions: [],
          project: null
        },
        updating_role: {
          name: null,
          permissions: [],
          project: null
        },
        addRoleLoading: false,
        updating: false,
        roles: [],
        permission_list: [
          {
            label: 'دیدن پروژه',
            value: 'view_project'
          },
          {
            label: 'دیدن تسک ها',
            value: 'view_tasks'
          },
          {
            label: 'اضافه کردن تسک',
            value: 'add_task'
          },
          {
            label: 'ویرایش تسک',
            value: 'modify_task'
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
        this.addRoleLoading = true,
          this.role.project = this.$props.project.id
        RoleService
          .add_role(this.role)
          .then((res) => {
            console.log(res);
            this.addRoleLoading = false;
            this.$q.notify({
              message: 'با موفقیت انجام شد',
              color: 'green'
            });
          })
          .catch((err) => {
            console.log(err)
            this.addRoleLoading = false
          })
      },
      get_roles() {
        RoleService
          .get_roles(this.$props.project.id)
          .then((res) => {
            this.roles = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    mounted() {
      this.get_roles();
    }
  }
</script>

<style scoped>

</style>
