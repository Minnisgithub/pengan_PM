import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
// ************** 脱敏管理 
// 脱敏字段新增
export function ruleAdd(data) {
  return request({
    url: '/rule/add',
    method: 'post',
    data
  })
}

// 查询脱敏类型列表
export function ruleQueryRuleType() {
  return request({
    url: '/rule/queryRuleType',
    method: 'get',
  })
}
// 查询脱敏规则列表
export function ruleQueryList(params) {
  return request({
    url: '/rule/queryList',
    method: 'get',
    params
  })
}
// 编辑脱敏规则列表
export function ruleUpdate(data) {
  return request({
    url: '/rule/update',
    method: 'post',
    data
  })
}
// 删除脱敏规则列表
export function ruleDelete(data) {
  return request({
    url: '/rule/delete',
    method: 'post',
    data
  })
}


// ************** 脱敏情景
// 查询脱敏情景列表
export function sceneQueryList(params) {
  return request({
    url: '/scene/queryUniList',
    method: 'get',
    params
  })
}
// 查询脱敏规则列表
export function queryUniOrRoleRuleList(params) {
  return request({
    url: '/scene/queryUniOrRoleRuleList',
    method: 'get',
    params
  })
}
// 更新脱敏情景
export function sceneUpdate(data) {
  return request({
    url: '/scene/update',
    method: 'post',
    data
  })
}
// 系统角色关联脱敏

// 启停脱敏规则列表
export function enable(data) {
  return request({
    url: '/scene/enable',
    method: 'post',
    data
  })
}
// 查询角色脱敏的系统列表
export function querySysListForRole(params) {
  return request({
    url: '/scene/querySysListForRole',
    method: 'get',
    params
  })
}
// 查询系统角色列表
export function queryRoleList(params) {
  return request({
    url: '/scene/queryRoleList',
    method: 'get',
    params
  })
}

// ************** 字典管理
// 查询系统
export function dictqueryList(params) {
  return request({
    url: '/dict/queryList',
    method: 'get',
    params
  })
}
// 新增系统列表
export function dictadd(data) {
  return request({
    url: '/dict/add',
    method: 'post',
    data
  })
}
// 更新系统列表
export function dictupdate(data) {
  return request({
    url: '/dict/update',
    method: 'post',
    data
  })
}
// 删除系统列表
export function dictdelete(data) {
  return request({
    url: '/dict/delete',
    method: 'post',
    data
  })
}
// 同步系统
export function dictonline(params) {
  return request({
    url: '/dict/online',
    method: 'get',
    params
  })
}


// ************** 操作日志 
// 查询操作日志列表
export function logQueryList(params) {
  return request({
    url: '/log/queryList',
    method: 'get',
    params
  })
}


// ************** 用户管理
export function userQueryList(params) {
  return request({
    url: '/user/queryList',
    method: 'get',
    params
  })
}
// 新增用户
export function userAdd(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
// 删除用户
export function userDelete(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
// 更新用户
export function userUpdate(data) {
  return request({
    url: '/user/update',
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
    url: '/user/role/queryList',
    method: 'get',
    params
  })
}
// 新增角色
export function roleAdd(data) {
  return request({
    url: '/user/role/add',
    method: 'post',
    data
  })
}
// 删除角色
export function roleDelete(data) {
  return request({
    url: '/user/role/delete',
    method: 'post',
    data
  })
}
// 更新角色
export function roleUpdate(data) {
  return request({
    url: '/user/role/update',
    method: 'post',
    data
  })
}
// 查询功能权限列表
export function queryPermissionList(params) {
  return request({
    url: '/user/role/queryPermissionList',
    method: 'get',
    params
  })
}
// 系统配置查询
export function queryConfigList() {
  return request({
    url: '/config/queryConfigList',
    method: 'get',
  })
}
// 系统配置更新
export function updateConfigList(data) {
  return request({
    url: '/config/updateConfigList',
    method: 'post',
    data
  })
}