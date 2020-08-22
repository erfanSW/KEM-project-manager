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
      <q-btn outline color="indigo-5" :loading="noteLoading" class="q-mt-md q-mb-md q-ml-sm" v-if="creating"
             @click="add_note">
        <q-icon name="note_add"/>
        <template v-slot:loading>
          <q-spinner-radio/>
        </template>
      </q-btn>
    </div>

    <q-editor v-model="note.description" v-if="creating" min-height="5rem"/>

    <div class="row" v-if="updating">
      <q-input color="grey-3" label-color="indigo-5" outlined v-model="updating_note.title" v-if="updating"
               class="q-mr-xl" dense
               label="عنوان">
        <template v-slot:append>
          <q-icon name="title" color="indigo-5"/>
        </template>
      </q-input>
      <q-btn outline color="indigo-5" class="q-mt-md q-mb-md q-ml-sm" v-if="updating" @click="close_updator">
        <q-icon name="close"/>
      </q-btn>
      <q-btn outline color="indigo-5" :loading="noteLoading" class="q-mt-md q-mb-md q-ml-sm" v-if="updating"
             @click="add_note">
        <q-icon name="note_add"/>
        <template v-slot:loading>
          <q-spinner-radio/>
        </template>
      </q-btn>
    </div>

    <q-editor v-model="updating_note.description" v-if="updating" min-height="5rem"/>


    <div v-for="(n,index) in note_list" :key="index" class="q-mt-md">
      <q-card flat bordered>
        <q-card-section class="row">
          <div class="text-h6 text-blue-grey-8">{{n.title}}</div>
          <q-space/>
          <q-chip square class="bg-blue-grey-8 text-white">{{n.created_datetime.substring(8,10)}} :
            {{n.created_datetime.substring(5,7)}} : {{n.created_datetime.substring(0,4)}}
          </q-chip>
          <q-btn icon="delete" color="red" :loading="deleteLoading" dense flat @click="delete_note(n.id)">
            <template v-slot:loading>
              <q-spinner-radio/>
            </template>
          </q-btn>
          <q-btn icon="edit" color="blue-grey-8" dense flat @click="edit(n)"></q-btn>
        </q-card-section>
        <q-card-section style=";opacity:0.9"
                        v-html="n.description" class="text-white bg-indigo-5"/>
        <q-separator/>
      </q-card>
    </div>
  </q-page>
</template>

<script>
  import NoteService from "../services/NoteService";

  export default {
    name: "Note",
    data() {
      return {
        note: {
          title: null,
          description: ""
        },
        updating_note: {
          title: null,
          description: ""
        },
        note_list: [],
        creating: false,
        noteLoading: false,
        deleteLoading: false,
        updating: false,
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
      open_updator() {
        this.note = {
          title: null,
          description: ''
        }
        console.log(this.note)
        this.updating = true
      },
      close_updator() {
        this.updating_note = {
          title: null,
          description: ''
        }
        this.updating = false
      },
      get_notes() {
        NoteService
          .get_notes().then((res) => {
            this.note_list = res.data
          })
          .catch()
      },
      add_note() {
        this.noteLoading = true;
        this.creating = false
        if (!this.note.title && !this.note.description) {
          return;
        }
        NoteService
          .add_note(this.note)
          .then((res) => {
            this.get_notes()
          })
          .catch(err => console.log(err))
        this.noteLoading = false;
      },
      edit(note) {
        this.updating_note = note;
        this.updating = true;
        window.scroll({
          top: 0,
          behavior: "smooth",
          left: 30
        });
      },
      delete_note(note) {
        this.deleteLoading = true
        NoteService
          .delete_note(note)
          .then((res) => {
            this.deleteLoading = false
            this.get_notes();
          })
          .catch((err) => {
            this.deleteLoading = false
            console.log(err)
          })
      }
    },
    mounted() {
      this.get_notes()
    }
  }
</script>

<style scoped>

</style>
