<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Genetics Database</v-toolbar-title>
    <v-spacer />
    <v-btn class="red lighten-1" dark to="/query-results">Run Query</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TheNavBar',
});
</script>
