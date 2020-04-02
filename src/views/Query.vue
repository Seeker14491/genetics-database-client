<template>
  <v-container>
    <QueryList />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import QueryList from '../components/QueryList.vue';

export default Vue.extend({
  name: 'Query',
  components: { QueryList },
});
</script>
