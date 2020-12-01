<template>
  <v-dialog v-on="$listeners" v-bind="$attrs" scrollable max-width="300">
    <v-card>
      <v-card-title primary-title>
        <h3>Delete employee</h3>
      </v-card-title>
      <v-card-text>
        Are you sure you want to delete this employee?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('input', false)"
        >
          No
        </v-btn>

        <v-btn
          type="submit"
          color="primary"
          :loading="loading"
          @click="submit"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  const MODULE = 'employees'
  const DELETE = `${MODULE}/${'delete'}`

  export default {
    inheritAttrs: false,
    data() {
      return {
        loading: false
      }
    },
    methods: {
      async submit() {
        try {
          this.loading = true
          await this.$store.dispatch(DELETE)
          this.$emit('input', false)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
