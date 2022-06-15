import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [createPersistedState()],
  state () {
    return {
        session: null,
        token: null,
        id: null
    }
  },
  mutations: {
    login(state, payload) {
        state.session = payload.id
        state.token = payload.token
        state.id = payload.user.id
    },
    signout(state){
      state.session= null
      state.token= null
      state.id= null
    }
  }
})

const app = createApp(App);
app.use(router);
app.use(store)
app.config.globalProperties.axios=axios
app.mount('#app');
