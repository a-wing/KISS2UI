<template>
  <div class="box">

    <div class="item">
      <h3>
        {{ pkg.name }}
      </h3>

      <div v-if="pkg.subname">
        <b-taglist>
          <div v-for="item in pkg.subname">
            <b-tag type="is-info">
              {{ item }}
            </b-tag>
            <div> </div>
          </div>
        </b-taglist>
      </div>

    </div>
    <br/>

    <div class="item">
      <h3>
        Version
      </h3>
      <span class="tag is-dark">
        {{ pkg.version }}
      </span>
    </div>
    <br/>

    <div class="item">
      <h3>
        Successful
      </h3>
      <span class="tag is-success">
        {{ pkg.overview.successful }}
      </span>
    </div>
    <br/>

    <div class="item">
      <h3>
        Failed
      </h3>
      <span class="tag is-danger">
        {{ pkg.overview.failed }}
      </span>
    </div>
    <br/>

    <div class="item">
      <h3>
        Skipped
      </h3>
      <span class="tag is-warning">
        {{ pkg.overview.skipped }}
      </span>
    </div>

  </div>
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

<style scope>
.box {
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

