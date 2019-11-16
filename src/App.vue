<template>
  <v-app id="inspire">
    <div
      v-if="
        _.get($route, 'meta.public', false) &&
          _.get($route, 'meta.onlyWhenLogout', false)
      "
    >
      <router-view />
    </div>
    <div v-else>
      <v-app-bar clipped-left app color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Admin</v-toolbar-title>
        <div class="my-2" style="margin-left: 90%">
            <v-btn color="warning" type="submit" fab dark @click="signOut">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </div>
      </v-app-bar>
      <v-navigation-drawer clipped v-model="drawer" app color="#0091EA" dark>
        <v-list>
          <v-list-item :to="item.to" v-for="(item, index) in menu" :key="index">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer color="indigo" app>
        <span class="white--text">&copy; Duong Phuoc Thiem</span>
      </v-footer>
    </div>
  </v-app>
</template>
<script>
import Storage from './constant/Storage'
import { SET_TOKEN_TO_HEADERS } from './constant/muationTypes'
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      menu: [
        {
          name: 'Home',
          to: '/',
          icon: 'mdi-home-account '
        },
        {
          name: 'Users',
          to: '/users',
          icon: 'mdi-shield-account '
        },
        {
          name: 'Todo List',
          to: '/todos',
          icon: 'mdi-format-list-checks '
        }
      ]
    }
  },
  created () {
    const token = Storage.getItem()
    if (token) {
      this.$store.commit(SET_TOKEN_TO_HEADERS, token)
    }
  },
  methods: {
    async signOut () {
      await this.$store.dispatch('signOut')
      location.reload()
    }
  }
}
</script>
<style>
</style>
