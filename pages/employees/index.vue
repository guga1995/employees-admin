<template>
  <v-container grid-list-xl fluid>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        :pagination.sync="paginationSync"
        :total-items="total"
        :loading="loading"
        class="elevation-1"
        :rows-per-page-items="rowsPerPageItems"
      >
        <template v-slot:items="props">
          <tr>
            <td>{{ props.item.id }}</td>
            <td>
              <div class="d-inline-flex">
                <v-btn small icon flat class="mx-0" color="grey" :to="`employees/${props.item.id}`" >
                  <v-icon small>visibility</v-icon>
                </v-btn>
                <v-btn small icon flat class="mx-0" color="grey" @click="showEditDialog(props.item.id)" >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn small icon flat class="mx-0" color="grey" @click="showDeleteDialog(props.item.id)" >
                  <v-icon small>delete</v-icon>
                </v-btn>
              </div>
            </td>
            <td>{{ props.item.first_name }}</td>
            <td>{{ props.item.last_name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.phone }}</td>
            <td>
              <nuxt-link :to="`companies/${props.item.company.id}`" >{{ props.item.company.name }}</nuxt-link>
            </td>
          </tr>
        </template>
        <template v-slot:actions-append>
            <v-btn color="primary" @click="showAddDialog">
              Add new Employee
            </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <add-item-dialog v-model="addDialog"/>
    <edit-item-dialog v-model="editDialog"/>
    <delete-item-dialog v-model="deleteDialog"/>
  </v-container>
</template>

<script>

  import AddItemDialog from '../../components/employees/AddItemDialog'
  import EditItemDialog from '../../components/employees/EditItemDialog'
  import DeleteItemDialog from '../../components/employees/DeleteItemDialog'

  import {mapState} from 'vuex'

  const MODULE = 'employees'
  const FETCH = `${MODULE}/${'fetch'}`
  const UPDATE_PAGINATION = `${MODULE}/${'updatePagination'}`
  const UPDATE_ID = `${MODULE}/${'updateId'}`

  export default {
    layout: "dashboard",
    middleware: async ({store}) => {
      await store.dispatch(FETCH)
    },
    data() {
      return {
        firstPaginationUpdate: true,
        addDialog: false,
        editDialog: false,
        deleteDialog: false,
      }
    },
    computed: {
      ...mapState(MODULE, [
        'headers',
        'items',
        'pagination',
        'total',
        'loading',
      ]),
      paginationSync: {
        get() {
          return this.pagination
        },
        async set(value) {
          this.$store.commit(UPDATE_PAGINATION, {
            value
          })

          if (!this.firstPaginationUpdate)
            this.$store.dispatch(FETCH)

          this.firstPaginationUpdate = false
        }
      },
      rowsPerPageItems() {
        return [
          {
            text: '10',
            value: 10
          },
          {
            text: '20',
            value: 20
          },
          {
            text: '50',
            value: 50
          },
          {
            text: '100',
            value: 100
          },
        ]
      }
    },
    methods: {
      showAddDialog() {
        this.addDialog = true
      },
      showEditDialog(id) {
        this.$store.commit(UPDATE_ID, {
          value: id
        })
        this.editDialog = true
      },
      showDeleteDialog(id) {
        this.$store.commit(UPDATE_ID, {
          value: id
        })
        this.deleteDialog = true
      }
    },
    components: {
      AddItemDialog,
      EditItemDialog,
      DeleteItemDialog
    }
  }
</script>

<style scoped>

</style>
