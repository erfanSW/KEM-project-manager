<template>
  <div class="col-6 q-pa-lg">
    <q-input label="عنوان" v-model="project.name" :rules="[val => !!val || 'وارد کردن نام ضروری است']"
             stack-label/>
    <!-- select option -->
    <div>
      <div class="q-gutter-md q-mt-md">
        <q-select
          filled
          use-input
          use-chips
          multiple
          input-debounce="0"
          v-model="project.tags"
          @new-value="createValue"
          :options="filterOptions"
          @filter="filterFn"
          label="تگ"
          stack-label
        />
      </div>
    </div>
    <!-- select option -->
    <div >
      <div class="q-gutter-md q-mt-md">
        <q-select
          v-model="project.members"
          label="افراد مشترک"
          stack-label
          multiple
          emit-value
          map-options
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon"/>
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label"></q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="model" :val="scope.opt.value"/>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <q-input type="textarea" class="q-mt-md" label="توضیحات" v-model="project.description"
             :rules="[val => !!val || 'وارد کردن توضیحات ضروری است']" stack-label/>
    <q-btn color="indigo-5" class="full-width" label="ویرایش"></q-btn>
  </div>
</template>

<script>
  import tag_select_mixins from "../../mixins/tag_select_mixins";

  export default {
    name: "Update",
    mixins: [
      tag_select_mixins
    ],
    props: [
      'project'
    ],

  }
</script>

<style scoped>

</style>
