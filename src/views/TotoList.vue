<template>
    <v-card
    style="margin: 10px auto; width: 500px"
    >
    <form style="margin: 10px">
      <div class="form-group">
        <label for="exampleInputEmail1">New Task</label>
        <input type="text" class="form-control" v-model="text" placeholder="Input new task">
      </div>
  <button class="btn btn-primary" @click.prevent="addTask">+Add</button>
  </form>
    <v-list
      >
        <v-list-item-group
          color="indigo"
        >
          <v-list-item
            v-for="(item, index) in tasks.data"
            :key="index"
          >
          <v-row>
          <div>
            <v-checkbox v-model="completed" :label="`completed`"></v-checkbox>
          </div>
          <div>
            <v-list-item-content style="margin-top: 8px; margin-left: 10px">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </div>
          </v-row>
            <v-btn color="alert" type="submit" fab @click="deleteTask(item._id,index)" style="margin-top: 5%">
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

export default {
  data: () => ({
    text: '',
    completed: false
  }),
  async mounted () {
    const token = await Storage.getItem()
    this.$store.dispatch('getTask', token)
  },
  computed: {
    ...mapState({
      addRequesting: state => get('todos.state.task.requeting'),
      getrequesting: state => get('todos.state.tasks.requeting')
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
    }
  }
}
</script>
