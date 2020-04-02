<template>
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
  </v-btn-toggle>
</template>

<script>
export default {
  name: 'QueryListFilterAdderNumberChooser',

  props: {
    value: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    toggle: 2,
  }),

  methods: {
    onchange() {
      let out;
      switch (this.toggle) {
        case 0:
          out = '<';
          break;
        case 1:
          out = '<=';
          break;
        case 2:
          out = '=';
          break;
        case 3:
          out = '>=';
          break;
        case 4:
          out = '>';
          break;
        default:
          throw new Error('unexpected variant');
      }

      this.$emit('input', out);
    },
  },

  created() {
    this.onchange();
  },
};
</script>
