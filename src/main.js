import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
        session: null,
        token: null
    }
  },
  mutations: {
    login(state,payload) {
        state.session = payload.id
        state.token = payload.token
    }
  }
})



const app = createApp(App);
app.use(router);
app.use(store)
app.config.globalProperties.axios=axios
app.mount('#app');
