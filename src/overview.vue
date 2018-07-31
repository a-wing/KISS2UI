<template>
  <mu-container>
    <div v-if="!list[0]">
      <mu-flex justify-content="center">
        <mu-circular-progress color="DodgerBlue" :stroke-width="12" :size="100"></mu-circular-progress>
        <mu-circular-progress color="Black" :stroke-width="12" :size="100"></mu-circular-progress>
        <mu-circular-progress color="Red" :stroke-width="12" :size="100"></mu-circular-progress>
      </mu-flex>
      <mu-flex justify-content="center">
        <mu-circular-progress color="Coral" :stroke-width="12" :size="100"></mu-circular-progress>
        <mu-circular-progress color="Green" :stroke-width="12" :size="100"></mu-circular-progress>
      </mu-flex>
    </div>
    <div v-else>
        <mu-text-field full-width label="Input Pkgname (Support RegExp)" v-model="keywords"></mu-text-field>
    <mu-paper :z-depth="1">
      <mu-data-table stripe :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list.filter(item => item.pkgname.match(this.keywords)).slice(0, 3000)" @row-click=detail >
        <template slot-scope="scope">
          <td>{{ scope.row.pkgname }}</td>
          <td class="is-right">{{ scope.row.pkgver }}</td>
          <td class="is-right">{{ (new Date(scope.row.latest_build_time)).toLocaleString() }}</td>
          <td class="is-right">
            <mu-chip v-if="scope.row.building_ok" color="green" chip>successful</mu-chip>
            <mu-chip v-else color="red" chip>failed</mu-chip>
          </td>
          <td class="is-right">{{ scope.row.successful_counts }}</td>
          <td class="is-right">{{ scope.row.failed_counts }}</td>
          <td class="is-right">{{ scope.row.building_time + 's'}}</td>
        </template>
      </mu-data-table>
    </mu-paper>
    </div>
  </mu-container>
</template>

<script>
export default {
  data () {
    return {
      keywords: '',
      sort: {
        name: '',
        order: 'asc'
      },
      columns: [
        { title: 'PkgName', name: 'pkgname', align: 'center' },
        { title: 'PkgVer', name: 'pkgver', align: 'center', sortable: true },
        { title: 'Latest Build Time', name: 'latest_build_time', align: 'center', sortable: true },
        { title: 'Building Status', name: 'building_ok', align: 'center', sortable: true },
        { title: 'Successful Counts', name: 'successful_counts', align: 'center', sortable: true },
        { title: 'Failed Counts', name: 'failed_counts', align: 'center', sortable: true },
        { title: 'Building Time (s)', name: 'building_time', align: 'center', sortable: true }
      ],
      list: []
    }
  },
  created() {
    this.getLatest()
  },
  methods: {
    detail (index, row, event) {
       this.$router.push(row.pkgname)
    },
    handleSortChange ({name, order}) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
    getLatest() {
      //let url = location.protocol + "//" + location.host + "/package"
      let url = global.pre + "/packages/"
      console.log(url)
      this.$http.get(url)
      .then((response) => {
        this.list = response.data
       // console.log(response.data)
        //console.log(response.data.filter(item => item.pkgname.match(this.keywords)))
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

