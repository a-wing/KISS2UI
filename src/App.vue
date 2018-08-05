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

    <br/>
    <mu-flex justify-content="center" >
      <mu-badge color="transparent">
        Copyright: 2018 Arch Linux CN
      </mu-badge>
    <br/>
    </mu-flex>
    <mu-flex justify-content="center" >
    <a style="color: #2196f3" href="https://github.com/a-wing/KISS2U">
      Github
    </a>
    </mu-flex>
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

