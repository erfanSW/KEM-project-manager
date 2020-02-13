<template>
  <q-dialog v-model="show" transition-show="fade" transition-hide="fade">
    <q-card class="bg-white text-black card shadow" style="width: 300px;border-radius: 0px 0px 20px 20px;">
      <q-bar class="bg-indigo-5">
        <q-space />
        <q-btn dense flat class="text-white" icon="close" v-close-popup @click="closeModal"></q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col-12 q-pa-md">
            <q-input label="عنوان" v-model="task.subject" stack-label />
            <q-input type="text" autogrow label="توضیحات" class="q-mt-md" v-model="task.description" stack-label  />
            <!-- select option -->
            <div style="max-width: 300px">
              <div class="q-gutter-md q-mt-md">
                <q-select
                  label="توسط"
                  v-model="task.assigned_to"
                  :options="members"
                  :option-label="opt=>opt.id"
                  :option-value="opt=>opt.id"
                  stack-label
                  emit-value
                  map-options
                >
                </q-select>
              </div>
            </div>
            <!-- date -->
            <q-input class="q-mt-md" v-model="task.due_date">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="task.due_date" color="indigo-5" class="bg-indigo-5 text-white" calendar="persian" mask="YYYY-MM-DD HH:mm" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <!-- date -->
            <!-- select option -->
            <q-input type="text" label="علت تعیین زمان" class="q-mt-md" v-model="task.due_description" autogrow stack-label  />
            <q-btn class="q-mt-lg bg-indigo-5 text-white full-width" label="ایجاد" :loading="add_task_loading" @click="add_task">
              <template v-slot:loading>
                <q-spinner-radio/>
              </template>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script>
import { mapState, mapActions } from "vuex";
import  tag_select_mixin from '../mixins/tag_select_mixins'
import MemberService from "../services/MemberService";
import TaskService from "../services/TaskService";
export default {
  components: {
  },
  mixins: [
    tag_select_mixin
  ],
  props: [
    'project'
  ],
  data() {
    return {
      task: {
        subject: null,
        description: null,
        owner: null,
        project: null,
        due_date: null,
        due_description: null,
        due_days: null,
        assigned_to: null,
        status: null,
      },
      members: [],
      add_task_loading: false
    };
  },
  computed: {
    ...mapState("ms", {
      show: state => state.new_task_modal
    }),
    ...mapState("account", {
      owner: state => state.user.id
    })
  },
  methods: {
    ...mapActions("ms", ["closeModal"]),
    get_members() {
      MemberService
        .get_members(this.$props.project)
        .then((res) => {
          console.log(res)
          this.members = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    add_task() {
      this.task.owner = this.owner;
      this.task.project = this.$props.project
      this.add_task_loading = true
      TaskService
        .add_task(this.task)
        .then((res)=> {
          console.log(res)
          this.add_task_loading = false
          this.$q.notify({
            message: 'با موفقیت ایجاد شد'
          })
        })
        .catch((err) => {
          this.add_task_loading = false
          console.log(err)
        })
    }
  },
  mounted() {
    console.log(this.$props.project)
    this.get_members();
  }
};
</script>


<style scoped>

</style>
