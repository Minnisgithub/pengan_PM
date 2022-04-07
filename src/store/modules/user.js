import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

//深度优先遍历，获取所有节点
function DFS(arr) {
  let nodes = [];
  let noop = (tArray) => {
    if (tArray && Array.isArray(tArray)) {
      tArray.forEach(ele => {
        nodes.push(ele);
        if ('child' in ele) {
          noop(ele.child)
        }
      })
    }
  }
  noop(arr);
  return nodes;
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PAGE_PERMISSION: (state, pgPermissionKeys) => {
    state.pgPermissionKeys = pgPermissionKeys;
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(state);
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('用户信息获取失败，请稍后重试！')
        }
        const { permissionList, userName } = data
        let flatRepeatedPermissionIds = DFS(permissionList)
        let pgPermissionKeys = flatRepeatedPermissionIds.map(v => v.description)
        commit('SET_PAGE_PERMISSION', pgPermissionKeys)
        commit('SET_NAME', userName);
        resolve({ pgPermissionKeys })
      })
    })
  },



  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

