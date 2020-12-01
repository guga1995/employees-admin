<template>
  <div>
    <v-text-field
      :label="label"
      prepend-icon="attach_file"
      readonly
      @click="fileTextFieldClick"
      :value="fileName"
      :error-messages="errorMessages"
    ></v-text-field>
    <input type="file" ref="fileInput" class="d-none" @change="fileInputChange">
  </div>
</template>

<script>
  export default {
    name: 'AppFileInput',
    props: {
      value: {},
      errorMessages: [String, Array],
      label: {
        type: String,
        default: 'File'
      }
    },
    computed: {
      fileName() {
        return this.model ? this.model.name : ''
      },
      model: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    },
    methods: {
      fileTextFieldClick() {
        this.$refs.fileInput.click()
      },
      fileInputChange(e) {
        let files = e.target.files
        if (files.length > 0) {
          this.model = files[0]
        } else {
          this.model = null
        }
      }
    }
  }
</script>
