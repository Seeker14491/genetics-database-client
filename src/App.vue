<template>
  <v-app>
    <div class="fill-height d-flex align-center justify-center" v-if="loadingState !== 'ready'">
      <v-progress-circular indeterminate size="70" width="7" color="primary"
                           v-if="loadingState === 'loading'"/>

      <v-alert type="error" v-if="loadingState === 'failed'">
        Error loading app.
      </v-alert>
    </div>

    <div v-else-if="loadingState === 'ready'">
      <TheNavBar />
      <v-content class="ma-4">
        <router-view />
      </v-content>
    </div>

    <div v-else-if="loadingState === 'failed'">
      App loading failed.
    </div>
  </v-app>
</template>

<script>
import axios from 'axios';
import TheNavBar from './components/TheNavBar.vue';

const backendUrl = 'https://genetics-database.herokuapp.com';

export default {
  name: 'App',

  components: {
    TheNavBar,
  },

  data: () => ({
    loadingState: 'loading',
  }),

  async created() {
    try {
      const requests = this.store.tables.map(async (table) => {
        const { data } = await axios.get(
          `${backendUrl}/api/raw-query?query=SELECT * FROM ${table} LIMIT 0`,
        );

        return [table, {
          columnNames: data.columnNames, columnTypes: data.columnTypes,
        }];
      });

      const responses = await Promise.all(requests);
      const schema = new Map(responses);

      this.store.setSchemaAction(schema);
      this.loadingState = 'ready';
    } catch (e) {
      this.loadingState = 'failed';
      throw e;
    }
  },
};
</script>
