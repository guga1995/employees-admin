function getInitialItem() {
  return {
    id: null,
    name: null,
    email: null,
    logo: null,
    logo_url: null,
    website: null
  }
}

function transformServerData(value) {
  let obj = {}

  Object.keys(getInitialItem()).forEach((key => {
    obj[key] = value[key]
  }))

  return {
    ...obj,
    logo: null
  }
}

export default {
  state: () => {
    return {
      items: [],
      headers: [
        {
          value: 'id',
          text: 'ID',
          sortable: false
        },
        {
          value: 'id',
          text: 'Actions',
          sortable: false
        },
        {
          value: 'name',
          text: 'Name',
          sortable: false
        },
        {
          value: 'email',
          text: 'Email',
          sortable: false
        },
        {
          value: 'logo',
          text: 'Logo',
          sortable: false
        },
        {
          value: 'website',
          text: 'Website',
          sortable: false
        }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      total: 0,
      loading: false,
      item: getInitialItem(),
      id: null
    }
  },
  mutations: {
    startLoading(state) {
      state.loading = true
    },
    finishLoading(state) {
      state.loading = false
    },
    updateItems(state, payload) {
      state.items = payload.items
      state.total = payload.total
    },
    updatePagination(state, payload) {
      state.pagination = payload.value
    },
    updateItem(state, payload) {
      state.item = transformServerData(payload.value)
    },
    resetItem(state) {
      state.item = getInitialItem()
    },
    updateId(state, payload) {
      state.id = payload.value
    }
  },
  actions: {
    async fetch({commit, state}) {
      try {
        commit('startLoading')
        let resp = await this.$axios.get('companies', {
          params: {
            page: state.pagination.page,
            per_page: state.pagination.rowsPerPage
          }
        })
        commit('updateItems', {
          items: resp.data.data,
          total: resp.data.meta.total
        })
      } finally {
        commit('finishLoading')
      }
    },
    async fetchSingle({commit, state}, payload = {id: null}) {

      let id = payload.id || state.id

      let resp = await this.$axios.get(`companies/${id}`)
      commit('updateItem', {
        value: resp.data.data
      })
    },
    async create({commit, dispatch}, payload) {

      let formData = new FormData

      Object.keys(getInitialItem()).forEach(key => {
        formData.append(key, payload.form[key])
      })

      await this.$axios.post('companies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      commit('showSnackbar', {
        color: 'success',
        text: 'Company added successfully',
      }, {root: true})

      dispatch('fetch')
    },
    async update({state, commit, dispatch}, payload) {

      let formData = new FormData

      Object.keys(getInitialItem()).forEach(key => {

        let value = payload.form[key]

        //exclude empty values
        if (!(value === null || value === ''))
          formData.append(key, value)

      })

      formData.append('_method', 'PUT')

      await this.$axios.post(`companies/${state.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      commit('showSnackbar', {
        color: 'success',
        text: 'Company updated successfully',
      }, {root: true})

      dispatch('fetch')
    },
    async delete({state, commit, dispatch}) {
      await this.$axios.delete(`companies/${state.id}`)

      commit('showSnackbar', {
        color: 'success',
        text: 'Company deleted successfully',
      }, {root: true})

      dispatch('fetch')
    }
  }
}
