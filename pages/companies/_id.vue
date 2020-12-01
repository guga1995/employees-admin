<template>
  <v-container grid-list-xl fluid>
    <v-card>
      <v-card-text>
        <p>Id: {{ data.id }}</p>
        <p>Name: {{ data.name }}</p>
        <p>Email: {{ data.email }}</p>
        <p class="d-flex">Logo: <img style="max-width: 100px" class="ml-2" :src="data.logo_url"></p>
        <p>Website: {{ data.website }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

  import {mapState} from 'vuex'

  const MODULE = 'companies'

  const FETCH_SINGLE = `${MODULE}/${'fetchSingle'}`

  export default {
    layout: 'dashboard',
    middleware: async ({route, store}) => {
      await store.dispatch(FETCH_SINGLE, {
        id: parseInt(route.params.id)
      })
    },
    computed: {
      ...mapState(MODULE, {
        data: state => state.item
      })
    }
  }
</script>
