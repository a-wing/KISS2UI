<template>
  <div class="container">
    <b-autocomplete
      ref="search"
      rounded
      v-model="search"
      placeholder="Input Name Or SubName Or User"
      :data="filteredDataArray"
      icon="search"
      clearable
      @select="option => selected = option">
      <template slot="empty">No results found</template>
    </b-autocomplete>

    <br/>

    <div v-if="!isShow">
      <loading/>
    </div>
    <div v-else>
      <div class="container">
      <b-table :data="showItems" :mobile-cards="true" @click="detail" paginated striped>

        <b-table-column field="name" label="Name" sortable #default="props">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="version" label="Version" numeric sortable #default="props">
          {{ props.row.version }}
          <b-tag v-if="list.map(i => i.name).includes(props.row.name)" type="is-danger" rounded>*</b-tag>
        </b-table-column>

        <b-table-column field="users" label="Users" centered sortable #default="props">
          {{ props.row.users ? props.row.users.join(" / ") : "" }}
        </b-table-column>

        <b-table-column field="timestamp" label="Date" centered sortable #default="props">
          <b-tag :type="mapStatus(props.row.status)">
            {{ (new Date(Number(props.row.timestamp) * 1000)).toLocaleString() }}
          </b-tag>
        </b-table-column>

        <b-table-column field="status" label="Status" centered sortable #default="props">
          <b-tag :type="mapStatus(props.row.status)" rounded>
            {{ props.row.status }}
          </b-tag>
        </b-table-column>

        <b-table-column field="duration" label="Duration" numeric sortable #default="props">
          <span>
            {{ humanFriendlyTime(props.row.duration) }}
          </span>
        </b-table-column>


        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large">
              </b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>

      </b-table>
    </div>
    </div>
  </div>
</template>

<script>
import Base from '../lib/BasePkg.vue'
import Loading from '../components/loading.vue'

import { getHotPkgs } from '../api/kiss2ugo'

export default {
  data: () => ({
    search: '',
    list: [],
  }),
  extends: Base,
  computed: {
    isShow() {
      return this.hasItem() ? true : (this.list.length == 0 ? false : true)
    },
    rawItem() {
      return this.hasItem() ? this.$store.state.items : this.list
    },
    listItems() {
      return this.rawItem.map(item => {
        item.timestamp = this.getLatest(item.log)
        const log = item.log[item.timestamp]
        item.duration = log.duration
        item.status = log.status
        return item
      })
    },
    // Search
    filteredItems() {
      const { search } = this
      const items = this.listItems
      if (!search) return items
        const lowerCaseSearch = search.toLowerCase()
      return items.filter(i => (
        i.name.toLowerCase().includes(lowerCaseSearch)
          || (
            i.subname
              ? i.subname.filter(n => n.toLowerCase().includes(lowerCaseSearch)).length != 0
              : false
          ) || (
            i.users
              ? i.users.filter(u => u.toLowerCase().includes(lowerCaseSearch)).length != 0
              : false
          )
        )
      )
    },
    filteredDataArray() {
      return this.filteredItems.map(i => i.name)
    },
    showItems() {
      const { name, order } = this.sort
      return this.filteredItems.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name])
    },
  },
  components: {
    'loading': Loading,
  },
  created() {
    getHotPkgs().then(data => this.list = data)
    this.$store.dispatch('getAll',this)
    this.$store.dispatch('level', 'is-light')
  },
  mounted() {
    this.$refs.search.focus()
  },
  methods: {
    detail(row) {
      this.$router.push(row.name)
    },
    getLatest(data) {
      return Object.keys(data).reduce((a, b) => {
        return a < b ? b : a
      })
    }
  }
}
</script>

