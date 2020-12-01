<script>
  export default {
    layout: "dashboard",
    middleware: ({redirect}) => {
      redirect('/companies')
    }
  }
</script>

<style scoped>

</style>
