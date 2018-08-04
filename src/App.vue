<template>
  <div id="app">
    <!--img src="./assets/logo.png"-->
    <mu-appbar style="width: 100%;" color="primary">
      {{ msg }}
      <mu-menu slot="right">
        <mu-button flat to="/" >Arch Linux CN</mu-button>
      </mu-menu>
    </mu-appbar>

    <br/>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Keep It Simple, Stupid To You UI'
    }
  }
}
</script>

