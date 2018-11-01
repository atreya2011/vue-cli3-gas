<template>
  <v-app id="app-root">
    <template v-if="loading">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-progress-circular :size="50" color="primary" indeterminate />
          </v-layout>
        </v-container>
      </v-content>
    </template>
    <template v-else>
      <navigation-drawer v-model="drawer"/>
      <v-toolbar color="blue" dark clipped-left fixed app>
        <v-toolbar-side-icon @click.stop="toggleDrawer"/>
        <v-toolbar-title>Vue CLI3 with GAS</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height grid-list-md>
          <router-view/>
        </v-container>
      </v-content>
      <v-footer color="blue" dark class="app-footer">
        <span>vue-cli3-gas</span>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer";
import { initGas } from "./google/init";

export default {
  name: "App",
  components: {
    NavigationDrawer
  },
  data() {
    return {
      loading: true,
      drawer: null
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },
  async created() {
    await initGas();
    this.loading = false;
  }
};
</script>

<style scoped>
.app-footer {
  justify-content: center;
}
</style>
