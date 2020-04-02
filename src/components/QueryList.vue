<template>
  <div>
    <v-list>
      <v-list-item v-for="filter in filters" :key="filter.id">
        <v-chip label>{{filter.table}}</v-chip>
        <span style="font-size: 3em">.</span>
        <v-chip label>{{filter.column}}</v-chip>
      </v-list-item>
    </v-list>

    <v-dialog v-model="addFilterDialog">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary">
          Add filter
        </v-btn>
      </template>

      <QueryListFilterAdder @add-filter="addFilter" />
    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import QueryListFilterAdder from './QueryListFilterAdder.vue';

export default {
  name: 'QueryList',

  components: { QueryListFilterAdder },

  data: () => ({
    filters: [],
    addFilterDialog: false,
  }),

  methods: {
    addFilter(filter) {
      this.filters = [...this.filters, { ...filter, id: uuidv4() }];

      this.addFilterDialog = false;
    },
  },
};
</script>
