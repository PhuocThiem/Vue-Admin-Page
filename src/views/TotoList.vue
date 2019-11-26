<template>
  <v-card style="margin: 30px auto; width: 800px; padding: 50px">
    <form style="margin: 10px">
      <div class="form-group">
        <label style="font-size: 30px">New Task</label>
        <input type="text" class="form-control" v-model="text" placeholder="Input new task" />
      </div>
      <button class="btn btn-primary" @click.prevent="addTask">+Add</button>
    </form>
    <v-list style="padding-left: 10px">
      <label style="font-size: 30px">List Task: {{ counterTask() }}    |<span style="color: #2E7D32"> Done: {{ counterDone() }}</span>    |<span style="color: #1E88E5">Todo: {{ counterTodo() }}</span>
      </label>
      <v-list-item-group color="indigo">
        <v-list-item v-for="(item, index) in tasks.data" :key="item._id" style="background-color: #ECEFF1; margin-bottom: 5px; padding-left: 20px">
          <v-row>
            <div>
              <v-checkbox v-model="item.completed" color="green" @change="updateStatus(item._id, item.text, item.completed)"></v-checkbox>
            </div>
            <div>
              <v-list-item-content style="margin-top: 8px; margin-left: 10px">
                <v-list-item-title v-text="item.text"></v-list-item-title>
                <div v-if="item.completed && item.completedAt">Completed Date: {{ formatTime(item.completedAt) }}</div>
              </v-list-item-content>
            </div>
          </v-row>
          <v-btn color="alert" type="submit" fab @click="deleteTask(item._id, index)" style="margin-top: 3%">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import Storage from '../constant/Storage'
import moment from 'moment'

export default {
  data: () => ({
    text: ''
    // checkbox: false
  }),
  async mounted () {
    const token = await Storage.getItem()
    this.$store.dispatch('getTask', token)
  },
  computed: {
    ...mapState({
      addRequesting: state => get('todos.state.task.requeting'),
      getRequesting: state => get('todos.state.tasks.requeting'),
      deleteRequesting: state => get('todos.state.task.requeting'),
      patchRequesting: state => get('todos.state.task.requeting')
    }),
    ...mapGetters({
      task: 'task',
      tasks: 'tasks'
    })
  },

  methods: {
    async addTask (text) {
      const token = await Storage.getItem()
      const task = this.text
      await this.$store.dispatch('addNewTask', { task, token })
      return this.tasks.data.push(this.task)
    },
    async deleteTask (id, index) {
      const token = await Storage.getItem()
      this.$store.dispatch('deleteTask', { id, token })
      return this.tasks.data.splice(index, 1)
    },
    async updateStatus (id, text, completed) {
      const token = await Storage.getItem()
      console.log('status', completed)
      await this.$store.dispatch('updateTask', { id, text, completed, token })
    },
    formatTime (s) {
      return moment(s).format('YYYY-MM-DD HH:mm')
    },
    counterTask () {
      return this.tasks.data.length
    },
    counterDone () {
      let counter = 0
      for (let index = 0; index < this.tasks.data.length; index++) {
        if (this.tasks.data[index].completed === true) {
          counter++
        }
      }
      return counter
    },
    counterTodo () {
      return this.tasks.data.length - this.counterDone()
    }
  }
}
</script>
