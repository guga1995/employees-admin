export const state = () => ({
  drawer: true,
  snackbar: {
    show: false,
    text: '',
    color: '',
  }
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  },
  showSnackbar(state, payload) {
    state.snackbar = {
      show: true,
      text: payload.text,
      color: payload.color,
    }
  }
}
