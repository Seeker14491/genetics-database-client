<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" v-for="schemaItem in schema" :key="schemaItem.table">
          <v-card class="mb-2">
            <v-container>
              <v-card-title>{{schemaItem.table}}</v-card-title>
              <v-row>
                <v-col>
                  <v-select label="Column" :items="schemaItem.columnNames" />
                </v-col>
                <v-col>
                  <v-text-field label="Value" />
                </v-col>
              </v-row>
              <v-btn :fab="true" small color="accent" dark>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

const backendUrl = 'https://genetics-database.herokuapp.com';

const tables = ['individuals', 'projects', 'project_enrollments', 'demographics',
  'biological_measurements', 'psychiatric_disorders', 'medical_history', 'markers'];

export default {
  name: 'Query',

  data: () => ({
    schema: null,
  }),

  async created() {
    const requests = tables.map(async (table) => {
      const { data } = (await axios.get(
        `${backendUrl}/api/raw-query?query=SELECT * FROM ${table} LIMIT 0`,
      ));

      return {
        table, columnNames: data.columnNames, columnTypes: data.columnTypes,
      };
    });

    this.schema = await Promise.all(requests);
  },
};
</script>
