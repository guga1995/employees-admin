function getInitialItem() {
  return {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    company: null,
    company_id: null,
  }
}

function transformServerData(value) {
  let obj = {}

  Object.keys(getInitialItem()).forEach((key => {
    obj[key] = value[key]
  }))

  return {
    ...obj,
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
          value: 'first_name',
          text: 'First Name',
          sortable: false
        },
        {
          value: 'last_name',
          text: 'Last name',
          sortable: false
        },
        {
          value: 'email',
          text: 'Email',
          sortable: false
        },
        {
          value: 'phone',
          text: 'Phone',
          sortable: false
        },
        {
          value: 'company',
          text: 'Company',
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
        let resp = await this.$axios.get('employees', {
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

      let resp = await this.$axios.get(`employees/${id}`)
      commit('updateItem', {
        value: resp.data.data
      })
    },
    async create({commit, dispatch}, payload) {

      let formData = new FormData

      Object.keys(getInitialItem()).forEach(key => {
        formData.append(key, payload.form[key])
      })

      await this.$axios.post('employees', formData, {
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

      await this.$axios.post(`employees/${state.id}`, formData, {
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
      await this.$axios.delete(`employees/${state.id}`)

      commit('showSnackbar', {
        color: 'success',
        text: 'Company deleted successfully',
      }, {root: true})

      dispatch('fetch')
    }
  }
}
