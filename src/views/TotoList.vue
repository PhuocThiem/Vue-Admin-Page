<template>
  <v-app>
    <ul>
      <li v-for="(item, index) in this.tasks" :key="index">{{ item.text }}</li>
    </ul>
  </v-app>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import Storage from '../constant/Storage'

export default {
  data: () => ({
    tasks: []
  }),
  async mounted () {
    const token = await Storage.getItem()
    const res = await this.$store.dispatch('getTask', token)
    this.tasks = get(res, 'todos')
    console.log('tasks', this.tasks)
  },
  computed: {
    ...mapState({
      addRequesting: state => get('todos.state.task.requeting'),
      getrequesting: state => get('todos.tasks.task.requeting')
    }),
    ...mapGetters({
      task: 'task',
      tasks: 'tasks'
    })
  },

  methods: {
    // create () {
    //   this.tasks.push({
    //     done: false,
    //     text: this.task
    //   })

    //   this.task = null
    // }
  }
}
</script>
