import { createStore } from "vuex";
import { auth }  from "@/common/auth.module";
import { util }  from "@/common/util.module";
import createPersistedState from 'vuex-persistedstate'
export default createStore({
    modules: {
        auth,
        util
    },
    plugins: [
        createPersistedState({
          paths: ['auth']
        })
      ]
    
});
