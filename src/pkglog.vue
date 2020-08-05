<template>
  <mu-container>
    <div v-if="list == ''">
      <loading/>
    </div>
    <mu-paper :z-depth="1">
      <div ref="terminal"></div>
    </mu-paper>
  </mu-container>
</template>

<script>
import Loading from './components/loading.vue'
import { getPkgLog } from './api/kiss2ugo'
import { Terminal } from 'xterm';

import 'xterm/css/xterm.css'

export default {
  data: () => ({
    list: "",
  }),
  components: {
    'loading': Loading,
  },
  created() {
    getPkgLog(this.$route.params.name, this.$route.params.timestamp).then(data => {
      this.list = data

      const term = new Terminal({
        convertEol: true,
        cols: 120,
        rows: 40,
      });
      term.open(this.$refs.terminal);
      term.write(data)
    })
  },
}
</script>

