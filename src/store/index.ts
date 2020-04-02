import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    tables: ['individuals', 'projects', 'project_enrollments', 'demographics',
      'biological_measurements', 'psychiatric_disorders', 'medical_history', 'markers'],
    schema: null,
  },
  mutations: {
    setSchema: (state, schema) => state.schema = schema
  },
  actions: {
  },
  modules: {
  },
});
