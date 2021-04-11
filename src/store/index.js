import { createStore } from "vuex";
import song from "./modules/song";

import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    song
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
