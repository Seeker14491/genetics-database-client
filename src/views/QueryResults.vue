<template>
  <v-data-table
    :headers="[{ text: 'key1', value: 'key1' }, { text: 'key2', value: 'key2' }]"
    :items="[{ key1: 'val1', key2: 42 }, { key1: 'foo', key2: 100 }]"
  />
</template>

<script>
export default {
  name: 'QueryResults',
};
</script>
