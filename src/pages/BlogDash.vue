<template>
  <q-page class="q-pa-md blog-container">
    <div class="row">
      <q-input color="grey-3" label-color="indigo-5" outlined v-model="note.title" class="q-mr-xl" dense
               label="عنوان">
        <template v-slot:append>
          <q-icon name="title" color="indigo-5"/>
        </template>
      </q-input>
      <q-btn outline color="indigo-5" :loading="noteLoading" class="q-mt-md q-mb-md q-ml-sm"
             @click="add_note">
        <q-icon name="note_add"/>
        <template v-slot:loading>
          <q-spinner-radio/>
        </template>
      </q-btn>

    </div>
    <q-editor v-model="note.description" min-height="5rem" style="width: 500px"/>


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


    <div class="q-mt-md" style="width: 500px">
      <q-card flat bordered>
        <q-card-section class="row bg-white">
          <div class="text-h6 text-blue-grey-8">بررسی راهکارهای مدیریتی در کسب و کار</div>
          <q-space/>
          <q-btn label="حذف" color="red" :loading="deleteLoading" dense outline size="10px" style="width: 50px" @click="delete_note(n.id)">
            <template v-slot:loading>
              <q-spinner-radio/>
            </template>
          </q-btn>
          <q-btn label="ویرایش" color="blue" :loading="deleteLoading" dense outline size="10px" style="width: 50px" class="q-ml-sm" @click="delete_note(n.id)">
            <template v-slot:loading>
              <q-spinner-radio/>
            </template>
          </q-btn>
        </q-card-section>
        <q-card-section style=";opacity:0.9"
                        v-html="'در ای ن مقاله سعی خواهیم کرد مقاله ای را تحت عنوان مقالاتی در عنوان علوم و جهش های حمایشی در روند بهبود یکتایی سیستم  انجام میگیرد.'" class="text-grey-6 bg-white"/>
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
  .blog-container {
    margin: 0 auto;
    width: 40%
  }
  @media only screen and (max-width: 700px) {
    .blog-container {
      margin: 0 ;
    }
  }
</style>
