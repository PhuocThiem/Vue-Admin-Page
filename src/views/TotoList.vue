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
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
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
    text: ''
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
    async addTask () {
      const token = await Storage.getItem()
      const task = this.text
      this.$store.dispatch('addNewTask', { task, token })
      this.tasks.data.push(this.task)
    }
  }
}
</script>
