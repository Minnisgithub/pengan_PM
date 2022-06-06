import request from '@/utils/request'

/***************************厂商订阅 */
/** 提供方 系统List*/
export function providerSysList(data) {
  return request({
    url: '/provider/sysList',
    method: 'post',
    data
  })
}

// 系统接口未订阅
export function providerNotSubscribeInterfaceList(data) {
  return request({
    url: '/provider/notSubscribeInterfaceList',
    method: 'post',
    data
  })
}
// 系统接口已订阅
export function providerSubscribeInterfaceList(data) {
  return request({
    url: '/provider/subscribeInterfaceList',
    method: 'post',
    data
  })
}
// 订阅及取消订阅 button 接口
export function providerUpdateSubscribeInterfaceList(data) {
  return request({
    url: '/provider/updateSubscribeInterfaceList',
    method: 'post',
    data
  })
}

/** 消费方 系统List*/
export function consumerSysList(data) {
  return request({
    url: '/consumer/sysList',
    method: 'post',
    data
  })
}
// 系统接口未订阅
export function consumerNotSubscribeInterfaceList(data) {
  return request({
    url: '/consumer/notSubscribeInterfaceList',
    method: 'post',
    data
  })
}
// 系统接口已订阅
export function consumerSubscribeInterfaceList(data) {
  return request({
    url: '/consumer/subscribeInterfaceList',
    method: 'post',
    data
  })
}
// 订阅及取消订阅 button 接口
export function consumerUpdateSubscribeInterfaceList(data) {
  return request({
    url: '/consumer/updateSubscribeInterfaceList',
    method: 'post',
    data
  })
}

/***************************接口订阅 */
/** 提供方 -------------------------------------- 查询分组列表*/
export function providerGroupList() {
  return request({
    url: '/provider/groupList',
    method: 'get',
  })
}
// 根据分组查询项目列表
export function providerProjectListByGroup(data) {
  return request({
    url: '/provider/projectListByGroup',
    method: 'post',
    data
  })
}
// 根据项目查询未订阅系统列表
export function providerNotInSysListByProject(data) {
  return request({
    url: '/provider/notInSysListByProject',
    method: 'post',
    data
  })
}
// 根据项目查询已订阅系统列表
export function providersysListByProject(data) {
  return request({
    url: '/provider/sysListByProject',
    method: 'post',
    data
  })
}
// 根据项目修改订阅厂商 button 接口
export function providerUpdateSysByProject(data) {
  return request({
    url: '/provider/updateSysByProject',
    method: 'post',
    data
  })
}

/** 消费方 -------------------------------------- 查询分组列表*/
// export function consumerGroupList() {
//   return request({
//     url: '/consumer/groupList',
//     method: 'get',
//   })
// }
// 根据分组查询项目列表
export function consumerProjectListByGroup(data) {
  return request({
    url: '/consumer/projectListByGroup',
    method: 'post',
    data
  })
}
// 根据项目查询未订阅系统列表
export function consumerNotInSysListByProject(data) {
  return request({
    url: '/consumer/notInSysListByProject',
    method: 'post',
    data
  })
}
// 根据项目查询已订阅系统列表
export function consumersysListByProject(data) {
  return request({
    url: '/consumer/sysListByProject',
    method: 'post',
    data
  })
}
// 根据项目修改订阅厂商 button 接口
export function consumerUpdateSysByProject(data) {
  return request({
    url: '/consumer/updateSysByProject',
    method: 'post',
    data
  })
}


/***************************消息日志 */
//  tableData
export function serviceLogList(data) {
    return request({
      url: '/serviceLog/list',
      method: 'post',
      data
    })
  }

/***************************订阅查询 */
// 接口分组List
export function consumerGroupList() {
  return request({
    url: '/consumer/groupList',
    method: 'get',
  })
}
//  tableData
export function subscriptionList(data) {
  return request({
    url: '/subscription/list',
    method: 'post',
    data
  })
}

// ************** 用户管理
export function userQueryList(data) {
  return request({
    url: '/sysUser/queryList',
    method: 'post',
    data
  })
}
// 新增用户
export function userAdd(data) {
  return request({
    url: '/sysUser/add',
    method: 'post',
    data
  })
}
// 删除用户
export function userDelete(data) {
  return request({
    url: '/sysUser/deleteUser',
    method: 'delete',
    data
  })
}
// 更新用户
export function userUpdate(data) {
  return request({
    url: '/sysUser/updateUser',
    method: 'post',
    data
  })
}
// 重置密码
export function resetPwd(data) {
  return request({
    url: '/user/resetPwd',
    method: 'post',
    data
  })
}

// ************** 角色

// 查询角色列表
export function roleQueryList(params) {
  return request({
    url: '/sysRole/list',
    method: 'get',
    params
  })
}
// 新增角色
export function roleAdd(data) {
  return request({
    url: '/sysRole/add',
    method: 'post',
    data
  })
}
// 删除角色
export function roleDelete(roleId) {
  return request({
    url: '/sysRole/deleteById/'+roleId,
    method: 'delete',
  })
}
// 更新角色
export function roleUpdate(data) {
  return request({
    url: '/sysRole/updateRole',
    method: 'post',
    data
  })
}
// 查询功能权限列表
export function queryPermissionList() {
  return request({
    url: '/sysPermission/list',
    method: 'get',
  })
}