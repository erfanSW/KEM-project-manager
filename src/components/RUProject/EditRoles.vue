<template>
  <div class="q-pa-lg" style="width: 300px;height:450px;border-radius: 20px">
    <div v-if="!updating">
      <div class="text-h6 text-blue-grey-8">مدیریت نقش ها</div>
      <q-input label="نام نقش" class="q-mt-md" v-model="role.name" stack-label outlined/>
      <div class=" q-mt-md">
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
        <q-btn class="full-width q-mt-md q-mb-sm" label="ایجاد نقش" color="indigo-5" :loading="addRoleLoading"
               @click="add_role"
        >
          <template v-slot:loading>
            <q-spinner-radio/>
          </template>
        </q-btn>
        <q-btn flat color="indigo-5" size="12px" @click="updating=true">ویرایش</q-btn>
        <div class="text-caption text-grey" style="font-size: 10px;">
          * در این قسمت میتوانید با توجه به نیازتان و توانایی افراد و همچنین شناخت شما از افراد و نقش آنها نقش های
          متفاوتی برای آن ها تعریف کنید که بتوانند اعمال کنترل شده ای همچون افزودن را انجام دهند.همچنین سازنده گروه
          همچون خدا بر گروه حکمرانی میکند و میتواند خدایانی را در کنار تخت خود بنشاند
        </div>
      </div>
    </div>
    <div v-if="updating">
      <div class=" q-mt-lg">
        <q-select
          v-model="updating_role"
          label="نقش"
          :options="roles"
          :option-label="opt=>opt.name"
          :option-value="opt=>opt.id"
          hint="نقش مورد نظر را انتخاب کنید ..."
          stack-label
          map-options
          outlined
        >
        </q-select>
        <q-input label=" نام نقش" class="q-mt-xl" v-model="updating_role.name" stack-label outlined/>
        <q-select
          v-model="updating_role.permissions"
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
        <q-btn class="full-width q-mt-md" label="ذخیره" color="indigo-5" :loading="updateRoleLoading" @click="update_role"
               outline>
          <template v-slot:loading>
            <q-spinner-radio/>
          </template>
        </q-btn>
        <q-btn class="full-width q-mt-md q-mb-md" label="حذف" color="red-5" :loading="addRoleLoading" @click="add_role"
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
        updateRoleLoading: false,
        updating: false,
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
    },
    methods: {
      add_role() {
        this.addRoleLoading = true
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
            this.$q.notify({
              message: err,
              color: 'red'
            })
          })
      },
      update_role() {
        this.updateRoleLoading = true
        this.role.project = this.$props.project.id
        RoleService
          .put(this.updating_role)
          .then((res) => {
            console.log(res);
            this.updateRoleLoading = false;
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
            this.updateRoleLoading = false
            this.$q.notify({
              message: err,
              color: 'red'
            })
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
