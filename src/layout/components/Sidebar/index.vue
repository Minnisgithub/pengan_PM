<template>
  <div >
      <div class="flex">
        <div class="logo"><img :src="logo"/></div>
        <div class="dot"> · </div>
        <div class="system-name">项目管理系统</div>
         <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="horizontal"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        <!-- <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
      </el-menu>
      </div>
     
       <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          {{this.$store.state.user.name}}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span >退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import logo from '@/assets/logo.png'

export default {
  components: { SidebarItem},
  data() {
    return {
      logo: logo
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',"permission_routes"
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },

  },
  mounted () {
  },
  methods: {
     async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  },
}
</script>
<style lang="scss" scope>
  .logo{
    padding-left: 20px;
    img{
      height: 30px;
    }
  }
  .dot{
    font-size: 26px;
    font-weight: bold;
    margin:10px;
    padding-top: 10px;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    min-width: 80px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .system-name{
    font-size: 26px;
    min-width: 220px;
    font-weight: bold;
    margin-top: 9px;
    margin-right: 30px;
  }
  .el-menu{
    margin-top: 8px;
  }
  .flex{
    min-width: 480px;
    align-items: center;
  }
</style>
