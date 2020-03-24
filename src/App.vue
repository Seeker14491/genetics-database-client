<template>
  <v-app>
    <TheNavBar />
    <v-content class="ma-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TheNavBar from './components/TheNavBar.vue';

export default {
  name: 'App',

  components: {
    TheNavBar,
  },
};
</script>
