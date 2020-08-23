<template>
  <q-card-section style="width: 300px;height:450px;border-radius: 20px">
    <q-item clickable class>
      <q-item-section avatar>
        <q-icon color="indigo-5" name="storage" />
      </q-item-section>
      <q-item-section>
        <router-link
          class="text-black full-width routerlink"
          :to="{
                name: 'task',
                params: {
                  project_id: project.id
                  }
              }"
        >ورود به صفحه تسک های {{project.name}}</router-link>
        <q-item-label caption>کلیک کنید</q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-for="(member,index) in members" :key="index" clickable class="q-mt-sm">
      <q-item-section avatar>
        <q-icon color="indigo-5" name="supervisor_account" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{member.email}}</q-item-label>
        <q-item-label caption>{{roles.find(role => role.id == member.role).name}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon color="indigo-5" name="label" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{project.tags.join(' , ')}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section avatar>
        <q-icon color="indigo-5" name="short_text" />
      </q-item-section>
      <q-item-section>
        <div>توضیحات</div>
        <div
          class="text-caption text-grey"
          style="overflow: auto;max-width: 200px"
        >{{project.description}}</div>
      </q-item-section>
    </q-item>
    <div
      class="text-caption text-grey"
      style="font-size: 10px;"
    >در این قسمت میتوانید اطلاعات مختصری از بیوگرافی گروه را مشاهده کنید.با توجه به سطح دسترسی تان شما ممکن است مطالب متفاوتی را در بار بالای صفحه مشاهده نمایید.لطفا در مقابل کندی ها صبور باشید و درصورت دیدن باگ سریعا به ما اطلعا دهید و مارا از یاری سبزتان محروم نسازید</div>
  </q-card-section>
</template>

<script>
import MemberService from "../../services/MemberService";
import RoleService from "../../services/RoleService";

export default {
  name: "ViewCard",
  props: ["project"],

  data() {
    return {
      members: [],
      roles: [],
    };
  },
  methods: {
    get_members() {
      MemberService.get_members(this.$props.project.id)
        .then((res) => {
          console.log(res);
          this.members = res.data;
          this.members.forEach((member) => {
            member.email = member.user.email;
          });
          console.log(this.members);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get_roles() {
      RoleService.get_roles(this.$props.project.id)
        .then((res) => {
          this.roles = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.get_members();
    this.get_roles();
  },
};
</script>

<style scoped>
.routerlink {
  text-decoration: none;
}
</style>
