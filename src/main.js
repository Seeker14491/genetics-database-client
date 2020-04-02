import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const store = {
  tables: ['individuals', 'projects', 'project_enrollments', 'demographics',
    'biological_measurements', 'psychiatric_disorders', 'medical_history', 'markers'],
  schema: null,

  setSchemaAction(newValue) {
    this.schema = newValue;
  },
};

Vue.mixin(
  {
    data: () => ({ store }),
  },
);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
