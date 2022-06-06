<template>
  <div class="login-container">
    <div class="login-top">
      <img :src="loginTopImg" alt="" />
      <span>· 集成平台管理系统</span>
    </div>
    <div class="bg-center">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <div class="title"></div>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
      <div class="remark">
        <span>技术支持：佳缘科技股份有限公司</span>
        <span>联系电话：02863372332</span>
        <span>版本号：V 1.0</span>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { setToken } from "@/utils/auth";
import { loginForSingleToken as _loginForSingleToken } from "@/api/user";
import loginTopImg from "@/assets/loginContainerTop.png";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码必须长于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "Jykj1994",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: "",
      loginTopImg: loginTopImg,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    const token = this.$route.query.singleToken;
    if (token) {
      _loginForSingleToken({ singleToken: this.$route.query.singleToken }).then(
        (res) => {
          if (res.code == 200) {
            this.$store.commit("user/SET_TOKEN", res.data.token);
            setToken(res.data.token);
            this.$router.push({ path: this.redirect || "/" });
          }
        }
      );
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
            this.$router.push({ path: "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg: rgba(0, 0, 0, 0.1);
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #f4f7f9;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-image: url(../../assets/loginContainer.png);
  height: 100vh;
  background-color: #f4f6fb;
  position: relative;
  .login-form {
    position: relative;
    width: 410px;
    max-width: 100%;
    padding: 60px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      width: 130px;
      height: 40px;
      background-image: url(../../assets/userLogin.png);
      margin-bottom: 50px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.bg-center {
  width: 700px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.remark {
  margin-top: 20px;
  width: 480px;
  display: flex;
  justify-content: space-around;
  top: 430px;
  left: 100px;
  font-size: 12px;
  color: #b3b9c2;
}
.login-form {
  background-color: #fff;
  padding: 50px !important;
}
.login-top {
  position: absolute;
  top: 30px;
  left: 30px;
  height: 26px;
  // width: 300px;
  display: flex;
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  span {
    margin-left: 10px;
  }
  // background-image: url(../../assets/loginContainerTop.png);
}
.el-form {
  width: 410px;
  height: 512px;
  .el-form-item{
    margin-bottom: 36px;
  }
}
</style>
