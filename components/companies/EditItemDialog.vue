<template>
  <v-dialog v-on="$listeners" v-bind="$attrs" scrollable max-width="500">
    <v-card>
      <v-card-title primary-title>
        <h3>Edit company</h3>
      </v-card-title>
      <v-card-text>
        <add-edit-form ref="form" :is-edit="true" @submit="submit"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('input', false)"
        >
          Cancel
        </v-btn>

        <v-btn
          type="submit"
          color="primary"
          :loading="loading"
          @click="$refs.form.submit()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

  import AddEditForm from './AddEditForm'

  const MODULE = 'companies'
  const UPDATE = `${MODULE}/${'update'}`
  const FETCH_SINGLE = `${MODULE}/${'fetchSingle'}`
  const RESET_ITEM = `${MODULE}/${'resetItem'}`

  export default {
    inheritAttrs: false,
    data() {
      return {
        loading: false
      }
    },
    watch: {
      '$attrs.value'(value) {
        if (value) {
          this.$store.commit(RESET_ITEM)
          this.$store.dispatch(FETCH_SINGLE)
          this.$refs.form.reset()
        }
      }
    },
    methods: {
      async submit(form) {
        try {

          this.loading = true

          await this.$store.dispatch(UPDATE, {
            form
          })

          this.$emit('input', false)

        } catch (e) {
          if (e.response) {
            switch (e.response.status) {
              case 422:
                let errors = e.response.data.errors
                this.$refs.form.setErrors(errors); break
              default:
                throw e
            }
          } else {
            throw e
          }
        } finally {
          this.loading = false
        }
      }
    },
    components: {
      AddEditForm
    }
  }
</script>
