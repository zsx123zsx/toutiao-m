<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="2000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(item, i) in list"
          :key="i"
          :article="item"
        ></article-item>
        <!-- <van-cell v-for="(item, i) in list" :key="i" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false, //
      isLoading: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  methods: {
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // },
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,

          timestamp: this.timestamp || Date.now()
          // with_top: 0,
        })
        // console.log(this.channel.id)
        console.log(data)
        // 2. 把请求结果数据当到list数组中
        const { results } = data.data
        // 数组展开操作，把数据合并
        this.list.push(...results)

        // 3. 本次数据加载结束后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新数据是否全部加载完成
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了
          this.finished = true
        }
      } catch (error) {
        // console.log(this.channel.id)
        // console.log('请求失败', error)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        // 下拉刷新函数
        // 请求数据放顶部
        // 关闭下拉刷新
        const { data } = await getArticles({
          channel_id: this.channel.id,

          timestamp: Date.now() // 下拉刷新获取最新时间戳
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.refreshSuccessText = '刷新失败'
        console.log('请求失败', error)
      }
    }
  }
}
</script>

<style scoped lang="less">
// 记住列表的滚动位置
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
