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
      <q-btn outline color="indigo-5" :loading="updatingLoading" class="q-mt-md q-mb-md q-ml-sm" v-if="updating"
             @click="update_note">
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
          <q-chip square class="text-blue-grey-8">{{n.created_datetime.substring(8,10)}} :
            {{n.created_datetime.substring(5,7)}} : {{n.created_datetime.substring(0,4)}}
          </q-chip>
          <q-btn label="حذف" color="red" :loading="deleteLoading" dense flat @click="delete_note(n.id)">
            <template v-slot:loading>
              <q-spinner-radio/>
            </template>
          </q-btn>
          <q-btn label="ویرایش" color="blue-grey-8" dense flat @click="edit(n)">
          </q-btn>
        </q-card-section>
        <q-card-section style=";opacity:0.9"
                        v-html="n.description" class="text-grey-6 bg-white"/>
        <q-separator/>
      </q-card>
    </div>
  </q-page>
</template>

<script>
  import NoteService from "../services/NoteService";
  import {mapState} from "vuex"

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
        updatingLoading: false,
        updating: false,
      }
    },
    computed: {
      ...mapState('account', [
        'token'
      ])
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
          .get_notes(this.token)
          .then((res) => {
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
          .add_note(this.token, this.note)
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
      update_note() {
        this.updatingLoading = true
        NoteService
          .update_note(this.token, this.updating_note)
          .then((res) => {
            console.log(res)
            this.updatingLoading = false
            this.$q.notify({
              message: 'با موفقیت انجام شد',
              color: 'green'
            })
            this.get_notes()
            this.updating = false
          })
          .catch((err)=> {
            this.$q.notify({
              message: 'ناموفق',
              color: 'red'
            })
            console.log(err)
            this.updatingLoading = false
          })
      },
      delete_note(note) {
        this.deleteLoading = true
        NoteService
          .delete_note(this.token, note)
          .then((res) => {
            console.log(res)
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
