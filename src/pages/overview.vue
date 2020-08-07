<template>
  <mu-container>
    <mu-text-field full-width label-float label="Input Pkgname (Support RegExp)" v-model="search"></mu-text-field>

    <div v-if="!this.$store.state.items[0]">
      <loading/>
    </div>
    <div v-else>

      <mu-paper :z-depth="1">
        <mu-data-table stripe :columns="columns" :data="showItems" :sort.sync="sort" @sort-change="handleSortChange" @row-click=detail>
          <template v-slot="scope">
            <td>{{ scope.row.name }}</td>
            <!--<td class="is-right">{{ scope.row.subname ? scope.row.subname.join(" / ") : "" }}</td>-->
            <td class="is-right">{{ scope.row.version }}
              <!--mark the latest build wave differently in the last eight hours, Maybe 8 hours -->
              <mu-chip v-if="(Date.now() - new Date(Number(scope.row.timestamp) * 1000)) < 19200000" color="deepOrange500" chip>new</mu-chip>
            </td>

            <td class="is-right">{{ scope.row.users ? scope.row.users.join(" / ") : "" }}</td>
            <!-- new Date(Unix timestamp * 1000) -->
            <td class="is-right">{{ (new Date(Number(scope.row.timestamp) * 1000)).toLocaleString()  }}</td>
            <td class="is-right">
              <mu-chip v-if="scope.row.status == 'successful'" color="green" chip>successful</mu-chip>
              <mu-chip v-else-if="scope.row.status == 'failed'" color="red" chip>failed</mu-chip>
              <mu-chip v-else color="orange" chip>skiped</mu-chip>
            </td>
            <td class="is-right">{{ humanFriendlyTime(scope.row.duration) }}</td>
          </template>
        </mu-data-table>
      </mu-paper>

    </div>
  </mu-container>
</template>

<script>
import Base from '../lib/BasePkg.vue'
import Loading from '../components/loading.vue'

export default {
  data: () => ({
    search: '',
    columns: [
      { title: 'Name', name: 'name', align: 'center' },
      { title: 'Version', name: 'version', align: 'center', sortable: true },
      { title: 'User', name: 'user', align: 'center', sortable: true },
      { title: 'Latest Build Time', name: 'timestamp', align: 'center', sortable: true },
      { title: 'Status', name: 'status', align: 'center', sortable: true },
      { title: 'Duration', name: 'duration', align: 'center', sortable: true },
    ],
  }),
  extends: Base,
  computed: {
    listItems() {
      return this.$store.state.items.map(item => {
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
          )
        )
      )
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
    this.$store.dispatch('getAll',this)
  },
  methods: {
    detail(index, row, event) {
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

