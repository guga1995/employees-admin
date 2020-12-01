<template>
  <v-container grid-list-md>
    <ValidationObserver v-slot="{ handleSubmit  }" ref="form">
      <v-form @submit.prevent="handleSubmit(submitForm)">
        <v-layout wrap>
          <v-flex xs6>
            <ValidationProvider vid="first_name" :rules="{required: requiredIfAdd}" v-slot="{ errors }">
              <v-text-field
                v-model="form.first_name"
                label="First name"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-flex>
          <v-flex xs6>
            <ValidationProvider vid="last_name" :rules="{required: requiredIfAdd}" v-slot="{ errors }">
              <v-text-field
                v-model="form.last_name"
                label="Last name"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-flex>
          <v-flex xs6>
            <ValidationProvider vid="email" :rules="{required: requiredIfAdd, email: true}" v-slot="{ errors }">
              <v-text-field
                v-model="form.email"
                label="Email"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-flex>
          <v-flex xs6>
            <ValidationProvider vid="phone" :rules="{required: requiredIfAdd}" v-slot="{ errors }">
              <v-text-field
                v-model="form.phone"
                label="Phone"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-flex>
          <v-flex xs6>
            <ValidationProvider vid="company_id" :rules="{required: requiredIfAdd}" v-slot="{ errors }">
              <v-text-field
                v-model="form.company_id"
                label="Company ID"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-flex>
        </v-layout>
        <input type="submit" class="d-none" ref="submitButton">
      </v-form>
    </ValidationObserver>
  </v-container>
</template>

<script>

  import {mapState} from 'vuex'

  const MODULE = 'employees'

  export default {
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {},
      }
    },
    watch: {
      item: {
        handler(value) {
          this.form = JSON.parse(JSON.stringify(value))
        },
        immediate: true
      }
    },
    computed: {
      ...mapState(MODULE, [
        'item'
      ]),
      requiredIfAdd() {
        return !this.isEdit
      }
    },
    methods: {
      submitForm() {
        this.$emit('submit', this.form)
      },
      setErrors(errors) {
        this.$refs.form.setErrors(errors)
      },
      reset() {
        this.$refs.form.reset()
      },
      submit() {
        this.$refs.submitButton.click()
      }
    }
  }
</script>
