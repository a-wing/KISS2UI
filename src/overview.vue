<template>
  <mu-container>
    <div v-if="!list[0]">
      <loading/>
    </div>
    <div v-else>

      <mu-text-field full-width label="Input Pkgname (Support RegExp)" v-model="keywords"></mu-text-field>

    <mu-paper :z-depth="1">
      <mu-data-table stripe :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list.filter(item => item.pkgname.match(this.keywords)).slice(0, 3000)" @row-click=detail >
        <template slot-scope="scope">
          <td>{{ scope.row.pkgname }}</td>
          <td class="is-right">{{ scope.row.pkgver }}
            <!--mark the latest build wave differently in the last eight hours, Maybe 8 hours -->
            <mu-chip v-if="(Date.now() - new Date(scope.row.latest_build_time)) < 19200000" color="deepOrange500" chip>new</mu-chip>
          </td>
          <td class="is-right">{{ (new Date(scope.row.latest_build_time)).toLocaleString() }}</td>
          <td class="is-right">
            <mu-chip v-if="scope.row.building_ok" color="green" chip>successful</mu-chip>
            <mu-chip v-else color="red" chip>failed</mu-chip>
          </td>
          <td class="is-right">{{ scope.row.successful_counts }}</td>
          <td class="is-right">{{ scope.row.failed_counts }}</td>
          <td class="is-right">{{ humanFriendlyTime(scope.row.building_time) }}</td>
        </template>
      </mu-data-table>
    </mu-paper>
    </div>
  </mu-container>
</template>

<script>
import Base from './BasePkg.vue'
import Loading from './components/loading.vue'

export default {
  data () {
    return {
      keywords: '',
      columns: [
        { title: 'PkgName', name: 'pkgname', align: 'center' },
        { title: 'PkgVer', name: 'pkgver', align: 'center', sortable: true },
        { title: 'Latest Build Time', width: 200, name: 'latest_build_time', align: 'center', sortable: true },
        { title: 'Building Status', width: 120, name: 'building_ok', align: 'center', sortable: true },
        { title: 'Successful', width: 80, name: 'successful_counts', align: 'center', sortable: true },
        { title: 'Failed', width: 80, name: 'failed_counts', align: 'center', sortable: true },
        { title: 'Time', width: 100, name: 'building_time', align: 'center', sortable: true }
      ],
      list: []
    }
  },
  extends: Base,
  components: {
    'loading': Loading
  },
  methods: {
    detail (index, row, event) {
       this.$router.push(row.pkgname)
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

