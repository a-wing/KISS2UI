<template>
  <div id="app">
    <headers :color="this.$store.state.level"></headers>
    <br/>

    <router-view></router-view>

    <br/>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
        <strong>K.I.S.S 2 U</strong> Copyright: 2018 - 2020  <a href="archlinuxcn">Arch Linux CN</a>
        <a href="https://github.com/a-wing/kiss2ugo">Github</a>
        </p>
      </div>
    </footer>
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
      msg: 'Keep It Simple, Stupid To You UI'
    }
  }
}
</script>

