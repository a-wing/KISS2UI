<script>
export default {
  data: () => ({
    sort: {
      name: 'timestamp',
      order: 'desc'
    },
  }),
  methods: {
    mapStatus(status) {
      let map = {
        "successful": "is-success",
        "failed": "is-danger",
        "skipped": "is-warn"
      }
      return map[status] || "is-black"
    },
    handleSortChange ({name, order}) {
      this.sort = { name, order }
    },
    hasItem() {
      return this.$store.state.items.length == 0 ? false : true
    },
    humanFriendlyTime(time = 0) {
      return (time > 3600 ? Math.floor(time/3600) + 'h' : '')
      + (time > 60 ? Math.floor((time%3600)/60) + 'm' : '')
      + (time%3600)%60 + 's'
    }
  }
}
</script>
