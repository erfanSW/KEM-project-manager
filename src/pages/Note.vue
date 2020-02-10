<template>
  <q-page class="q-pa-md">
    <div class="row">
      <q-input color="grey-3" label-color="indigo-5" outlined v-model="note.title" v-if="creating" class="q-mr-xl" dense
               label="عنوان">
        <template v-slot:append>
          <q-icon name="title" color="indigo-5"/>
        </template>
      </q-input>
      <q-btn outline color="indigo-5" class="q-mt-md q-mb-md q-ml-sm" v-if="!creating" @click="open_editor">
        <q-icon name="add"/>
      </q-btn>
      <q-btn outline color="indigo-5" class="q-mt-md q-mb-md q-ml-sm" v-if="creating" @click="close_editor">
        <q-icon name="close"/>
      </q-btn>
      <q-btn outline color="indigo-5" class="q-mt-md q-mb-md q-ml-sm" v-if="creating" @click="add_note">
        <q-icon name="note_add"/>
      </q-btn>
    </div>

    <q-editor v-model="note.description" v-if="creating" min-height="5rem"/>

    <div v-for="n in note_list" class="q-mt-md">
      <q-card flat bordered>
        <q-card-section class="row">
          <div class="text-h6 text-blue-grey-8">{{n.title}}</div>
          <q-space/>
          <q-chip square class="bg-blue-grey-8 text-white">12 : 12 : 1398</q-chip>
        </q-card-section>
        <q-card-section style=";opacity:0.9"
                        v-html="n.description" class="text-white bg-indigo-5"/>
        <q-separator/>
      </q-card>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: "Note",
    data() {
      return {
        note: {
          title: null,
          description: ""
        },
        note_list: [],
        creating: false
      }
    },
    methods: {
      open_editor() {
        this.note = {
          title: null,
          description: ''
        }
        console.log(this.note)
        this.creating = true
      },
      close_editor() {
        this.note = {
          title: null,
          description: ''
        }
        this.creating = false
      },
      add_note() {
        this.note_list.push(
          this.note
        )
        this.creating = false
      }
    }
  }
</script>

<style scoped>

</style>
