<template>
  <v-app id="inspire">
    <v-app-bar clipped-left app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Admin</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer clipped v-model="drawer" app color="#0091EA" dark>
      <v-list>
        <v-list-item :to="item.to" v-for="(item,index) in menu" :key="index">
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
  </v-app>
</template>
<script>
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
        }
      ]
    }
  }
}
</script>
<style>
</style>
