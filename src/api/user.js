// 用户相关请求模块
import request from '@/utils/request'
// import store from '@/store'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // // 发送请求头数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
    // // 发送请求头数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}
