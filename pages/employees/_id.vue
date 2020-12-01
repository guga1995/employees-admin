<template>
  <v-container grid-list-xl fluid>
    <v-card>
      <v-card-text>
        <p>Id: {{ data.id }}</p>
        <p>First name: {{ data.first_name }}</p>
        <p>Last name: {{ data.last_name }}</p>
        <p>Email: {{ data.email }}</p>
        <p>Phone: {{ data.phone }}</p>
        <p>Company: <nuxt-link :to="`/companies/${data.company.id}`" >{{ data.company.name }}</nuxt-link></p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

  import {mapState} from 'vuex'

  const MODULE = 'employees'

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
