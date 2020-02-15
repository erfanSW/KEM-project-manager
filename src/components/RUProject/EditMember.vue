<template>
  <div class="shadow-3" style="border-radius: 20px;width: 300px;height: 450px;">
    <div class="q-pa-lg" v-if="!updating" style="width: 300px;">
      <div class="text-h6 text-blue-grey-8">مدیریت اعضا</div>
      <div class="q-gutter-md q-mt-md">
        <q-select
          v-model="member.role"
          v-if="hasRole"
          label="نقش"
          :options="roles"
          :option-label="opt=>opt.name"
          :option-value="opt=>opt.id"
          stack-label
          emit-value
          map-options
          outlined
        >
        </q-select>
        <div class="text-caption" v-else>
          نقشی وجود ندارد.
          بر روی نشان
          <q-icon name="accessibility" size="20px"/>
          در بالا
          کلیک کنید تا نقش جدید تعریف کنید.
        </div>
      </div>
      <div class="q-gutter-md q-mt-md">
        <q-select
          v-model="member.user"
          label="افراد در دسترس"
          :options="users"
          :option-label="opt=>opt.email"
          :option-value="opt=>opt.id"
          stack-label
          emit-value
          map-options
          outlined
        >
        </q-select>
      </div>
      <q-checkbox
        class="text-indigo-5 q-mt-lg"
        v-model="member.is_admin"
        label="ادمین"
      />
      <q-btn color="indigo-5" class="q-mt-md q-mb-sm full-width" @click="add_member" :loading="add_member_loading" label="افزودن">
        <template v-slot:loading>
          <q-spinner-radio/>
        </template>
      </q-btn>
      <q-btn flat color="indigo-5" size="12px" @click="updating=true">ویرایش</q-btn>
      <div class="text-caption text-grey" style="font-size: 10px;">
        در این قسمت میتوانید با توجه به نیازتان و توانایی افراد و همچنین شناخت شما از افراد و نقش آنها نقش های متفاوتی برای آن ها تعریف کنید که بتوانند اعمال کنترل شده ای همچون افزودن را انجام دهند.
      </div>
    </div>
    <div v-if="updating" class="q-pa-lg">
      <div>
        <q-select
          v-model="updating_member"
          label="شخص"
          :options="members"
          :option-label="opt=>opt.id"
          :option-value="opt=>opt.id"
          hint="شخص مورد نظر را انتخاب کنید ..."
          class="q-mb-xl"
          stack-label
          map-options
          outlined
          emit-value
        >
        </q-select>
        <q-select
          v-model="updating_member.role"
          v-if="hasRole"
          label="نقش"
          :options="roles"
          :option-label="opt=>opt.name"
          :option-value="opt=>opt.id"
          stack-label
          emit-value
          map-options
          outlined
        >
        </q-select>
        <q-checkbox
          class="text-indigo-5 q-mt-lg"
          v-model="updating_member.is_admin"
          label="ادمین"
        />

        <q-btn class="full-width q-mt-md" label="ذخیره" color="indigo-5" :loading="addRoleLoading" @click="add_role"
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
        <q-btn icon="keyboard_return" class="q-mt-md bg-blue text-white" @click="updating=false"
               size="10px" flat/>
      </div>
    </div>
  </div>
</template>

<script>
  import UsersServices from "../../services/UsersServices";
  import RoleService from "../../services/RoleService";
  import MemberService from "../../services/MemberService";

  export default {
    name: "EditMember",
    props: [
      'project'
    ],
    data() {
      return {
        users: [],
        roles: [],
        members: [],
        member: {
          user: null,
          project: null,
          role: null,
          is_admin: false
        },
        updating_member: {
          user: null,
          project: null,
          role: null,
          is_admin: false
        },
        updating: false,
        add_member_loading: false
      }
    },
    computed: {
      hasRole: function () {
        if (this.roles.length > 0) {
          return true
        } else {
          return false
        }
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
      },
      add_member() {
        this.add_member_loading = true
        this.member.project = this.$props.project.id
        console.log(this.member)
        MemberService
          .add_member(this.member)
          .then((res) => {
            console.log(res)
            this.add_member_loading = false
            this.$q.notify({
              message: 'با موفقیت ایجاد شد',
              color: 'green'
            })
            this.get_members()
          })
          .catch((err) => {
            this.add_member_loading = false
            console.log(err)
            this.$q.notify({
              message: err,
              color: 'red'
            })
          })
      }, get_members() {
        MemberService
          .get_members(this.$props.project.id)
          .then((res) => {
            console.log(res)
            this.members = res.data
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    mounted() {
      this.get_users();
      this.get_roles();
      this.get_members();
    }
  }
</script>

<style scoped>

</style>
