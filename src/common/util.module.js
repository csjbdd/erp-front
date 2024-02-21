export const util = {
    namespaced: true,
    state: {
        isLoading: false,
      },
      getters: {
        isLoading: state => state.isLoading,
      },
      mutations: {
        setIsLoading(state, payload) {
          state.isLoading = payload
        },
      },
      actions: {
        updateIsLoading({ commit }, payload) {
          commit('setIsLoading', payload)
        },
      }
};