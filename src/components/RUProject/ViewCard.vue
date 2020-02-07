<template>
  <q-card-section>
    <div class="text-h6 q-ml-md q-mb-lg text-indigo-5">{{project.name}}</div>
    <q-item clickable>
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
    <q-card-actions>
      <q-btn color="red" text-color="indigo-5" flat round icon="label"/>
      :
      {{project.tags.join(' , ')}}
    </q-card-actions>
    <q-separator/>
    <q-card-section class="q-pt-xs">
      <div class="text-overline">توضیحات</div>
      <div class="text-caption text-grey">{{project.description}}</div>
    </q-card-section>

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

</style>
