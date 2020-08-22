<template>
  <div class="q-pa-lg" style="width: 300px;height:450px;border-radius: 20px">
    <div>
      <div class="text-h6 text-blue-grey-8">مدیریت نقش ها</div>
      <create :project="project.id" v-if="!updating"/>
      <edit :project="project.id" v-if="updating"/>
      <q-btn flat color="indigo-5" size="12px" @click="updating=true" v-if="!updating">ویرایش</q-btn>
      <q-btn icon="keyboard_return" class="q-mt-xs bg-blue text-white" @click="updating=false" v-if="updating" size="10px" flat/>
      <div class="text-caption text-grey" style="font-size: 10px;">
        * در این قسمت میتوانید با توجه به نیازتان و توانایی افراد و همچنین شناخت شما از افراد و نقش آنها نقش های
        متفاوتی برای آن ها تعریف کنید که بتوانند اعمال کنترل شده ای همچون افزودن را انجام دهند.همچنین سازنده گروه
        همچون خدا بر گروه حکمرانی میکند و میتواند خدایانی را در کنار تخت خود بنشاند
      </div>
    </div>
  </div>
</template>

<script>
  import RoleService from "src/services/RoleService";

  export default {
    name: "EditRoles",
    props: [
      'project'
    ],
    components: {
      Create: () => import('./Create'),
      Edit: () => import('./Edit')
    },
    data() {
      return {
        updating: false,
        roles: [],
      }
    },
    methods: {
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
