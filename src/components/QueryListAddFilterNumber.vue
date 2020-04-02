<template>
  <v-form ref="form" v-model="valid">
    <v-btn-toggle v-model="toggle" @change="onchange('msg')">
      <v-btn>
        <v-icon>mdi-less-than</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-less-than-or-equal</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-equal</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-greater-than-or-equal</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-greater-than</v-icon>
      </v-btn>
      <v-btn>
        Between
      </v-btn>
    </v-btn-toggle>

    <v-text-field v-if="toggle < 5" v-model="value" label="Value" :rules="[validateNumberInput]" />

    <div v-else>
      <v-text-field v-model="start" label="Start"
                    :rules="[validateNumberInput, validateBetweenInput]" />
      <v-text-field v-model="end" label="End"
                    :rules="[validateNumberInput, validateBetweenInput]" />
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'QueryListAddFilterNumber',

  data: () => ({
    valid: false,
    toggle: 2,
    value: null,
    start: null,
    end: null,
  }),

  computed: {
    valueNum() {
      return Number(this.value);
    },
    startNum() {
      return Number(this.start);
    },
    endNum() {
      return Number(this.end);
    },
  },

  methods: {
    onchange() {
      let x1;
      switch (this.toggle) {
        case 0:
          x1 = '<';
          break;
        case 1:
          x1 = '<=';
          break;
        case 2:
          x1 = '=';
          break;
        case 3:
          x1 = '>=';
          break;
        case 4:
          x1 = '>';
          break;
        case 5:
          x1 = 'between';
          break;
        default:
          throw new Error('unexpected variant');
      }

      let comparisonOrBetween: ComparisonOrBetween<number>;
      if (x1 === 'between') {
        comparisonOrBetween = {
          kind: 'between',
          start: this.startNum,
          end: this.endNum,
        };
      } else {
        comparisonOrBetween = {
          kind: 'one-value',
          value: this.valueNum,
          comparisonType: x1,
        };
      }

      const filter: IntegerFilter = {
        kind: 'integer',
        comparisonOrBetween,
      };

      this.$emit('input', filter);
    },

    validateNumberInput(n: string) {
      return !Number.isNaN(Number(n)) || 'Invalid number';
    },

    validateBetweenInput() {
      if (!this.start || !this.end) {
        return true;
      }

      return this.startNum <= this.endNum || 'Start must be less than or equal to End';
    },
  },

  created() {
    this.onchange();
  },
});
</script>
