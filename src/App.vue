<template>
  <div id="app">
    <!--img src="./assets/logo.png"-->
    <mu-appbar style="width: 100%;" color="primary">
      {{ msg }}
      <mu-menu slot="right">
        <mu-button flat>Arch Linux CN</mu-button>
      </mu-menu>
    </mu-appbar>

    <br/>

    <mu-container>
      <mu-paper :z-depth="1">
        <mu-data-table stripe :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list.slice(0, 6)">
          <template slot-scope="scope">
            <td>{{scope.row.pkgname}}</td>
            <td class="is-right">{{scope.row.pkgver}}</td>
            <td class="is-right">{{scope.row.latest_build_time}}</td>
            <td class="is-right">{{scope.row.building_ok}}</td>
            <td class="is-right">{{ scope.row.building_time + ' s'}}</td>
            <td class="is-right">{{ scope.row.successful_counts }}</td>
            <td class="is-right">{{ scope.row.failed_counts }}</td>
          </template>
        </mu-data-table>
      </mu-paper>
    </mu-container>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Keep It Simple, Stupid To You UI',
      sort: {
        name: '',
        order: 'asc'
      },
      columns: [
        { title: 'PkgName', name: 'pkgname', align: 'center' },
        { title: 'PkgVer', name: 'pkgver', align: 'center', sortable: true },
        { title: 'Batest Build Time', name: 'latest_build_time', align: 'center', sortable: true },
        { title: 'building_ok', name: 'building_ok', align: 'center', sortable: true },
        { title: 'Building Time (s)', name: 'building_time', align: 'center', sortable: true },
        { title: 'Successful Counts', name: 'successful_counts', align: 'center', sortable: true },
        { title: 'Failed Counts', name: 'failed_counts', align: 'center', sortable: true }
      ],
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
      //let url = location.protocol + "//" + location.host + "/config.json"
      //let url = location.protocol + "//" + location.host + "/package"
      let url = "http://localhost:3000/packages"
      console.log(url)
      this.$http.get(url)
      .then((response) => {
        this.list = response.data
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

