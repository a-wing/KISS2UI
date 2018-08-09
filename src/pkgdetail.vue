<template>
  <mu-container>
    <pkg-card :pkg=overview ></pkg-card>

    <mu-alert v-if="overview.successful_counts / (overview.successful_counts + overview.failed_counts) >= 0.8" color="success"></mu-alert>
    <mu-alert v-else-if="overview.successful_counts / (overview.successful_counts + overview.failed_counts) >= 0.5" color="warning"></mu-alert>
    <mu-alert v-else-if="overview.successful_counts / (overview.successful_counts + overview.failed_counts) >= 0.2" color="info" ></mu-alert>
    <mu-alert v-else color="error" ></mu-alert>
    <br/>

    <mu-paper :z-depth="1">
      <mu-data-table stripe :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list.slice(0, 3000)">
        <template slot-scope="scope">
          <td class="is-right">{{ scope.row.pkgver }}</td>
          <td class="is-right">{{ (new Date(scope.row.latest_build_time)).toLocaleString() }}</td>
          <td class="is-right">
            <mu-chip v-if="scope.row.building_ok" color="green" chip>successful</mu-chip>
            <mu-chip v-else color="red" chip>failed</mu-chip>
          </td>
          <td class="is-right">{{ humanFriendlyTime(scope.row.building_time) }}</td>
        </template>
      </mu-data-table>
    </mu-paper>
  </mu-container>
</template>

<script>
import Base from './BasePkg.vue'
import Pkgcard from './pkgcard.vue'

export default {
  data () {
    return {
      columns: [
        { title: 'PkgVer', name: 'pkgver', align: 'center', sortable: true },
        { title: 'Latest Build Time', name: 'latest_build_time', align: 'center', sortable: true },
        { title: 'Building Status', name: 'building_ok', align: 'center', sortable: true },
        { title: 'Building Time (s)', name: 'building_time', align: 'center', sortable: true }
      ],
      msg: '',
      overview: {},
      list: []
    }
  },
  components: {
    'pkg-card': Pkgcard
  },
  extends: Base,
  methods: {
    getLatest() {
      //let url = "http://localhost:3000/packages/" + this.$route.params.pkgname
      let url = global.pre + "/packages/" + this.$route.params.pkgname
      console.log(url)
      this.$http.get(url)
      .then((response) => {
        this.list = response.data.log
        this.overview = response.data.latest
        this.msg = "PkgName: " + this.overview.pkgname + " LatestVer: " + this.overview.pkgver + " Successful Counts: " +  this.overview.successful_counts + " Failed Counts: " + this.overview.failed_counts
        //console.log(response.data)
        //console.log(this.overview)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

