<script>
export default {
  data () {
    return {
      sort: {
        name: '',
        order: 'asc'
      },
      columns: [],
      list: []
    }
  },
  created() {
    this.getLatest()
  },
  methods: {
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
    humanFriendlyTime(time = 0) {
      return (time > 3600 ? Math.floor(time/3600) + 'h' : '')
      + (time > 60 ? Math.floor((time%3600)/60) + 'm' : '')
      + (time%3600)%60 + 's'
    },
    getLatest() {
      //let url = location.protocol + "//" + location.host + "/package"
      let url = global.pre + "/packages/"
      console.log(url)
      this.$http.get(url)
      .then((response) => {
        this.list = response.data
       // console.log(response.data)
        //console.log(response.data.filter(item => item.pkgname.match(this.keywords)))
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

