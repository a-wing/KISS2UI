<template>
  <mu-container>
    <div v-if="!isShow">
      <loading/>
    </div>
    <div v-else>
      <pkg-card :pkg=item ></pkg-card>

      <mu-alert v-if="(item.overview.successful + item.overview.skipped) / item.overview.total >= 0.9" color="success"></mu-alert>
      <mu-alert v-else-if="(item.overview.successful + item.overview.skipped) / item.overview.total >= 0.8" color="info" ></mu-alert>
      <mu-alert v-else-if="(item.overview.successful + item.overview.skipped) / item.overview.total >= 0.6" color="warning"></mu-alert>
      <mu-alert v-else color="error" ></mu-alert>

      <br/>
      <b-table :data="showLog" :mobile-cards="true" @click="detail" paginated striped>

        <template v-slot="props">
          <b-table-column field="version" label="Version" numeric sortable>
            {{ props.row.version }}
          </b-table-column>

          <b-table-column field="timestamp" label="Date" centered sortable>
            <b-tag :type="mapStatus(props.row.status)">
              {{ (new Date(Number(props.row.timestamp) * 1000)).toLocaleString() }}
            </b-tag>
          </b-table-column>

          <b-table-column field="status" label="Status" centered sortable>
            <b-tag :type="mapStatus(props.row.status)" rounded>
              {{ props.row.status }}
            </b-tag>
          </b-table-column>

          <b-table-column field="duration" label="Duration" numeric sortable>
            <span>
              {{ humanFriendlyTime(props.row.duration) }}
            </span>
          </b-table-column>

        </template>

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
  </mu-container>
</template>

<script>
import Base from '../lib/BasePkg.vue'
import Pkgcard from '../components/pkgcard.vue'
import Loading from '../components/loading.vue'

import * as v2 from '../api/kiss2ugo'

export default {
  data: () => ({
    columns: [
      { title: 'Version', name: 'version', align: 'center', sortable: true },
      { title: 'Latest Build Time', name: 'timestamp', align: 'center', sortable: true },
      { title: 'Building Status', name: 'status', align: 'center', sortable: true },
      { title: 'Building Time (s)', name: 'duration', align: 'center', sortable: true }
    ],
    list: {},
  }),
  components: {
    'loading': Loading,
    'pkg-card': Pkgcard
  },
  extends: Base,
  created() {
    if (!this.hasItem()) {
      v2.getPkg(this.$route.params.name).then(data => this.list = data)
    }

    try {
      this.setLevel(this.getLevel())
    } catch(err) {
      //console.log(err)
    }
  },
  updated() {
    this.setLevel(this.getLevel())
  },
  computed: {
    isShow() {
      return this.hasItem() ? true : (this.list.name === this.$route.params.name ? true : false)
    },
    rawItem() {
      return this.hasItem() ? this.$store.state.items.filter(i => i.name === this.$route.params.name)[0] : this.list
    },
    item() {
      const item = this.rawItem
      item.overview = this.getOverview(Object.values(item.log))
      return item
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
    detail(row) {
      this.$router.push(`${this.$route.params.name}/logs/${row.timestamp}`)
    },
    getLevel() {
      let mapLevel = {
        9: 'is-success',
        8: 'is-info',
        6: 'is-warning',
        1: 'is-danger',
      }

      let l = (this.item.overview.successful + this.item.overview.skipped) / this.item.overview.total
      for ( let key of Object.keys(mapLevel).sort((a, b) => b - a ) ) {
        if (l * 10 >= key) { return mapLevel[key] }
      }
      return 'is-black'
    },
    setLevel(level) {
      this.$store.dispatch('level', level)
    },
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

