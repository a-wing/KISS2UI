<template>
  <mu-container>

    <h1>{{ pkg.pkgname }}</h1>

    <mu-list>

      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>PkgVer</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="pkg.pkgver" color="teal"></mu-badge>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>Latest build time</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="(new Date(pkg.latest_build_time)).toLocaleString()" color="brown"></mu-badge>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>Successful Counts</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="pkg.successful_counts" color="success"></mu-badge>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>Failed Counts</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="pkg.failed_counts" color="error"></mu-badge>
        </mu-list-item-action>
      </mu-list-item>

    </mu-list>
  </mu-container>
</template>

<script>
export default {
  props: {
    pkg: {
      type: Object,
      default: Object
    }
  }
}
</script>

