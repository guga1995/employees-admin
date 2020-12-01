<template>
  <v-container grid-list-md>
    <ValidationObserver v-slot="{ handleSubmit  }" ref="form">
      <v-form @submit.prevent="handleSubmit(submitForm)">
        <v-layout wrap>
          <v-flex xs6>
            <ValidationProvider vid="name" :rules="{required: requiredIfAdd}" v-slot="{ errors }">
              <v-text-field
                v-model="form.name"
                label="Name"
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
          <v-flex xs12>
            <ValidationProvider vid="logo" :rules="{required: requiredIfAdd}" v-slot="{ errors }">
              <app-file-input
                v-model="form.logo"
                label="Logo"
                :error-messages="errors"
              />
            </ValidationProvider>
          </v-flex>
          <v-flex xs12>
            <ValidationProvider vid="website" :rules="{required: requiredIfAdd}" v-slot="{ errors }">
              <v-text-field
                v-model="form.website"
                label="Website"
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

  const MODULE = 'companies'

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
