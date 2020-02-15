<template>
  <q-card-section style="width: 300px;height:450px;border-radius: 20px" class="shadow-3">
    <q-item clickable class="">
      <q-item-section avatar>
        <q-icon color="indigo-5" name="storage"/>
      </q-item-section>
      <q-item-section>
        <router-link class="text-black full-width routerlink" :to="{
                name: 'task',
                params: {
                  project_id: project.id
                  }
              }">{{project.name}}
        </router-link>
        <q-item-label caption>صفحه تسک</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable class="q-mt-sm">
      <q-item-section avatar>
        <q-icon color="indigo-5" name="supervisor_account"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>مهدی خان محمدی</q-item-label>
        <q-item-label caption>سازنده</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon color="indigo-5" name="verified_user"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>عرفان چگینی</q-item-label>
        <q-item-label caption>مدیر گروه</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon color="indigo-5" name="label"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{project.tags.join(' , ')}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator/>
    <q-item>
      <q-item-section avatar>
        <q-icon color="indigo-5" name="short_text"/>
      </q-item-section>
      <q-item-section>
        <div>توضیحات</div>
        <div class="text-caption text-grey" style="overflow: auto;max-width: 200px">{{project.description}}</div>
      </q-item-section>
    </q-item>
    <div class="text-caption text-grey" style="font-size: 10px;">
      در این قسمت میتوانید اطلاعات مختصری از بیوگرافی گروه را مشاهده کنید.با توجه به سطح دسترسی تان شما ممکن است مطالب متفاوتی را در بار بالای صفحه مشاهده نمایید.لطفا در مقابل کندی ها صبور باشید و درصورت دیدن باگ سریعا به ما اطلعا دهید و مارا از یاری سبزتان محروم نسازید
    </div>
  </q-card-section>
</template>

<script>
  export default {
    name: "ViewCard",
    props: [
      'project'
    ]
  }
</script>

<style scoped>
  .routerlink {
    text-decoration: none;
  }
</style>
