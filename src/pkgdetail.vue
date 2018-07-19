<template>
  <mu-container>

    <mu-alert v-if="overview.successful_counts / (overview.successful_counts + overview.failed_counts) >= 0.8" color="success">
      {{ msg }}
    </mu-alert>
    <mu-alert v-else-if="overview.successful_counts / (overview.successful_counts + overview.failed_counts) >= 0.5" color="warning">
      {{ msg }}
    </mu-alert>
    <mu-alert v-else-if="overview.successful_counts / (overview.successful_counts + overview.failed_counts) >= 0.2" color="info" >
      {{ msg }}
    </mu-alert>
    <mu-alert v-else color="error" >
      {{ msg }}
    </mu-alert>

  <div>Package: {{ $route.params.pkgname }}</div>
    <mu-paper :z-depth="1">
      <mu-data-table stripe :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list.slice(0, 3000)">
        <template slot-scope="scope">
          <td class="is-right">{{ scope.row.pkgver }}</td>
          <td class="is-right">{{ scope.row.latest_build_time }}</td>
          <td class="is-right">
            <mu-chip v-if="scope.row.building_ok" color="green" chip>successful</mu-chip>
            <mu-chip v-else color="red" chip>failed</mu-chip>
          </td>
          <td class="is-right">{{ scope.row.building_time + 's'}}</td>
        </template>
      </mu-data-table>
    </mu-paper>
  </mu-container>
</template>

<script>
export default {
  data () {
    return {
      sort: {
        name: '',
        order: 'asc'
      },
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
  created() {
    this.getLatest()
  },
  methods: {
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
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

