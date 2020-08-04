<template>
  <mu-container>

    <h1>{{ pkg.name }}</h1>

    <h3>{{ pkg.subname ? pkg.subname.join(" / ") : "" }}</h3>
    <mu-list>

      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>Version</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="pkg.version" color="teal"></mu-badge>
        </mu-list-item-action>
      </mu-list-item>

      <!--
      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>Latest build time</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="(new Date(pkg.latest_build_time)).toLocaleString()" color="brown"></mu-badge>
        </mu-list-item-action>
      </mu-list-item>
      -->

      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>Successful Counts</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="String(pkg.overview.successful)" color="success"></mu-badge>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>Failed Counts</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="String(pkg.overview.failed)" color="error"></mu-badge>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item>
        <mu-list-item-content>
          <mu-list-item-title>Skiped Counts</mu-list-item-title>
        </mu-list-item-content>
        </mu-list-item-action>
        <mu-badge :content="String(pkg.overview.skipped)" color="warning"></mu-badge>
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

