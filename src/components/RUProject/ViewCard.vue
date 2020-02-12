<template>
  <q-card-section>
    <router-link class="text-h6 q-ml-lg q-mb-xl text-indigo-5 routerlink" :to="{
                name: 'task',
                params: {
                  project_id: project.id
                  }
              }">{{project.name}}
    </router-link>
    <q-separator color="indigo-5 q-mt-md"/>
    <q-item clickable class="q-mt-xl">
      <q-item-section avatar>
        <q-icon color="indigo-5" name="accessibility"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>مهدی خان محمدی</q-item-label>
        <q-item-label caption>سازنده</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator/>
    <q-item clickable>
      <q-item-section avatar>
        <q-icon color="indigo-5" name="accessibility"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>عرفان چگینی</q-item-label>
        <q-item-label caption>مدیر گروه</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator/>
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
          <q-icon color="indigo-5" name="label"/>
        </q-item-section>
        <q-item-section>
          <div>توضیحات</div>
          <div class="text-caption text-grey">{{project.description}}</div>
        </q-item-section>
      </q-item>

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
    margin-top: 100px !important;
  }
</style>
