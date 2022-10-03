<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title">我的频道</div>
      <van-button type="danger" plain round size="mini">编辑</van-button>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit'
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
}
</style>
