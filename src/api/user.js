import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sysUser/login',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/sysUser/getUserInfo',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/sysUser/loginOut',
    method: 'post',
  })
}
export function loginForSingleToken(token) {
  return request({
    url: '/sysUser/checkToken',
    method: 'post',
    headers: {
      token
    }
  })
}
// 获取odin接口token
export function getOdinToken(params) {
  return request({
    url: '/firstPage/getOdinToken',
    method: 'get',
    params
  })
}