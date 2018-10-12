<template>
  <div v-track-view="{pageId:"id1"}">
    <div data-track="id1">

    </div>
    <button v-track.click="'id1'">点击</button>
    <button v-track.click="{trackId:"id1"}">点击</button>
    <button v-track="{trackId:"id1",type:'click'}">点击</button>
    <input v-track.foucs="{trackId:"id1"}" type="text">

    <div v-if="show" v-track-view="{trackId:"id1"}">foo</div>
    <div v-show="show" v-track-view="{trackId:"id1"}">foo</div>



  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
</style>
