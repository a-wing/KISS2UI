<template>
  <div id="app">
    <!--img src="./assets/logo.png"-->
    <h1>{{ msg }}</h1>
    <h2>A</h2>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Keep It Simple, Stupid To You UI'
    }
  },
  created() {
    this.getLatest()
  },
  methods: {
    getLatest() {
      //let url = location.protocol + "//" + location.host + "/config.json"
      //let url = location.protocol + "//" + location.host + "/package"
      let url = "http://localhost:3000/packages"
      console.log(url)
      this.$http.get(url)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
