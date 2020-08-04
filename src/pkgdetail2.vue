<template>
  <mu-container>
    <div v-if="!item">
      <loading/>
    </div>
    <div v-else>
      <pkg-card :pkg=item ></pkg-card>

      <mu-alert v-if="(item.overview.successful + item.overview.skipped) / item.overview.total >= 0.9" color="success"></mu-alert>
      <mu-alert v-else-if="(item.overview.successful + item.overview.skipped) / item.overview.total >= 0.8" color="info" ></mu-alert>
      <mu-alert v-else-if="(item.overview.successful + item.overview.skipped) / item.overview.total >= 0.6" color="warning"></mu-alert>
      <mu-alert v-else color="error" ></mu-alert>

      <br/>

      <mu-paper :z-depth="1">
        <mu-data-table stripe :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="showLog">
          <template v-slot="scope">
            <td class="is-right">{{ scope.row.version }}</td>
            <td class="is-right">{{ (new Date(scope.row.timestamp * 1000)).toLocaleString() }}</td>
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
import Base from './lib/BasePkg.vue'
import Pkgcard from './components/pkgcard.vue'
import Loading from './components/loading.vue'

export default {
  data: () => ({
    columns: [
      { title: 'Version', name: 'version', align: 'center', sortable: true },
      { title: 'Latest Build Time', name: 'timestamp', align: 'center', sortable: true },
      { title: 'Building Status', name: 'status', align: 'center', sortable: true },
      { title: 'Building Time (s)', name: 'duration', align: 'center', sortable: true }
    ],
  }),
  components: {
    'loading': Loading,
    'pkg-card': Pkgcard
  },
  extends: Base,
  computed: {
    item() {
      return this.$store.state.items.filter(i => i.name === this.$route.params.name).map(item => {
        item.overview = this.getOverview(Object.values(item.log))
        return item
      })[0]
    },
    logs() {
      const logs = this.item.log
      return Object.keys(logs).map(i => {
        return {
          "timestamp": i,
          "version": logs[i].version,
          "status": logs[i].status,
          "duration": logs[i].duration,
        }
      })
    },
    showLog() {
      const { name, order } = this.sort
      return this.logs.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name])
    },
  },
  methods: {
    getOverview(logs) {
      return {
        "successful": logs.filter(i => i.status == "successful").length,
        "failed": logs.filter(i => i.status == "failed").length,
        "skipped": logs.filter(i => i.status == "skipped").length,
        "total": logs.length,
      }
    },
  }
}
</script>

