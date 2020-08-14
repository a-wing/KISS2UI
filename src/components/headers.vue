<template>
  <b-navbar :class=color>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://wiki.archlinuxcn.org/favicon.ico"
          alt="Lilac Web UI"
          >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="div">
        {{ msg }}
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item href="#">
        Arch Linux CN
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "is-light"
    }
  },
  data: () => ({
    msg: 'Keep It Simple, Stupid To You UI'
  }),
}
</script>

