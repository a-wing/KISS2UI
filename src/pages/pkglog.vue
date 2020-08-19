<template>
  <div class="container">
    <div v-if="list == ''">
      <loading/>
    </div>

    <div v-show="ok">
      <div ref="terminal"></div>
    </div>
    <div v-show="!ok">
      {{ list }}
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading.vue'
import { getPkgLog } from '../api/kiss2ugo'
import { Terminal } from 'xterm';

import 'xterm/css/xterm.css'

export default {
  data: () => ({
    list: "",
    ok: true,
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
    .catch(err => {
      this.list = err
      this.ok = false
    })
  },
}
</script>

