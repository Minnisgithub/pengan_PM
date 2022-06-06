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
export function loginForSingleToken(data) {
  return request({
    url: '/auth/loginForSingleToken',
    method: 'post',
    data
  })
}