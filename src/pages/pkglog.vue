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

    <br/>

    <b-field label="Search..." :label-position="labelPosition" grouped>
      <b-input placeholder="Search..." type="search" v-model="search" @input="next" @keyup.enter.native="next" @keyup.up.native="prev" @keyup.down.native="next"></b-input>
      <p class="control">
      <b-button class="button is-info" @click="prev">P</b-button>
      <b-button class="button is-info" @click="next">N</b-button>
      </p>
    </b-field>
  </div>
</template>

<script>
import Loading from '../components/loading.vue'
import { getPkgLog } from '../api/kiss2ugo'
import { Terminal } from 'xterm';
import { SearchAddon } from 'xterm-addon-search';

import 'xterm/css/xterm.css'

export default {
  data: () => ({
    content: {},
    search: "",
    labelPosition: 'on-border',
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

      const searchAddon = new SearchAddon();
      this.content = searchAddon
      term.loadAddon(searchAddon);

      term.open(this.$refs.terminal);
      term.write(data)
    })
    .catch(err => {
      this.list = err
      this.ok = false
    })
  },
  methods: {
    prev() {
      this.content.findPrevious(this.search);
    },
    next() {
      this.content.findNext(this.search);
    },
  },
}
</script>

