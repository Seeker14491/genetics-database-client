<template>
  <v-card>
    <v-card-title>Add Filter</v-card-title>

    <v-card-text>
      <v-select v-model="table" label="Table" :items="$store.state.tables" @input="column = null" />

      <div v-if="table">
        <v-select v-model="column" label="Column" :items="schema.columnNames" />
      </div>

      <div v-if="column">
        <v-checkbox v-if="boolean" :label="booleanCheckbox.toString()" v-model="booleanCheckbox" />

        <div v-else-if="integer">
          <div>integer</div>

          <QueryListFilterAdderNumberChooser />
        </div>

        <div v-else-if="real">
          real
        </div>

        <div v-else-if="text">
          text
        </div>

        <div v-else-if="char">
          char
        </div>

        <div v-else-if="date">
          date
        </div>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn text color="primary" @click="addFilter">
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import QueryListFilterAdderNumberChooser from './QueryListAddFilterNumber.vue';

export default Vue.extend({
  name: 'QueryListAddFilter',
  components: { QueryListFilterAdderNumberChooser },
  data: () => ({
    table: null,
    column: null,
    booleanCheckbox: false,
  }),

  computed: {
    schema(): TableSchema {
      return this.$store.state.schema.get(this.table);
    },

    columnType(): string {
      const i = this.schema.columnNames.findIndex((x) => x === this.column);
      if (i === -1) {
        throw new Error('specified column not found');
      }

      return this.schema.columnTypes[i];
    },

    boolean(): boolean {
      return this.columnType === 'boolean';
    },

    integer(): boolean {
      return ['smallint', 'integer', 'bigint'].includes(this.columnType);
    },

    real(): boolean {
      return this.columnType === 'real';
    },

    text(): boolean {
      return this.columnType === 'text';
    },

    char(): boolean {
      return this.columnType === 'char';
    },

    date(): boolean {
      return this.columnType === 'date';
    },
  },

  methods: {
    addFilter() {
      if (!this.column) {
        return;
      }

      let extraData = {};

      if (this.boolean) {
        extraData = { type: 'equals' };
      } else {
        console.log(`Unhandled column type '${this.columnType}'`);
      }

      this.$emit('add-filter', { table: this.table, column: this.column, ...extraData });
    },
  },
});
</script>
