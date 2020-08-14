<template>
  <div id="app">
    <headers :color="color"></headers>
    <br/>

    <router-view></router-view>

    <br/>
    <mu-flex justify-content="center" >
      <mu-badge color="transparent">
        Copyright: 2018 - 2020 Arch Linux CN
      </mu-badge>
    <br/>
    </mu-flex>
    <mu-flex justify-content="center" >
    <a style="color: #2196f3" href="https://github.com/a-wing/kiss2ugo">
      Github
    </a>
    </mu-flex>
  </div>
</template>

<script>
import Headers from './components/headers.vue'

export default {
  name: 'app',
  components: {
    'headers': Headers,
  },
  data () {
    return {
      color: 'is-success',
      msg: 'Keep It Simple, Stupid To You UI'
    }
  }
}
</script>

